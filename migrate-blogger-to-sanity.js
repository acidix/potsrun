const fs = require("fs");
const { parse } = require("node-html-parser");
const { createClient } = require("@sanity/client");
const { from, of } = require("rxjs");
const { concatMap, tap, delay } = require("rxjs/operators");
const https = require("https");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const migratedImagesDir = "migrated-images";
if (!fs.existsSync(migratedImagesDir)) {
  fs.mkdirSync(migratedImagesDir);
}

rl.question("Please enter your Sanity API token: ", (token) => {
  const client = createClient({
    projectId: "p0p80jzp",
    dataset: "production",
    token: token,
    useCdn: false,
    apiVersion: "2021-10-21",
  });

  const feed = fs.readFileSync(
    "takeout/Blogger/Blogs/_center_PotsRun_-center_/feed.atom",
    "utf8",
  );

  const root = parse(feed);
  const entries = root.querySelectorAll("entry");

  const posts = entries
    .map((entry) => {
      const type = entry.querySelector("blogger\\:type")?.text;
      if (type !== "POST") {
        return null;
      }
      const title = entry.querySelector("title").text;
      const content = entry.querySelector("content").text;
      const published = entry.querySelector("published").text;

      return {
        title,
        content,
        published,
      };
    })
    .filter(Boolean);

  console.log(`Found ${posts.length} posts to migrate.`);

  // Function to download image
  function download(url, dest) {
    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(dest);
      https
        .get(url, (response) => {
          response.pipe(file);
          file.on("finish", () => {
            file.close(resolve);
          });
        })
        .on("error", (err) => {
          fs.unlink(dest);
          reject(err.message);
        });
    });
  }

  from(posts)
    .pipe(
      concatMap((post) => {
        console.log(`Migrating post: ${post.title}`);
        const postRoot = parse(post.content);
        const images = postRoot.querySelectorAll("img");
        const imageDownloads = from(images).pipe(
          concatMap((image) => {
            const imageUrl = image.getAttribute("src");
            const imageName = `${uuidv4()}-${path.basename(imageUrl)}`;
            const imagePath = `${migratedImagesDir}/${imageName}`;
            console.log(`Downloading image from ${imageUrl} to ${imagePath}`);
            return from(download(imageUrl, imagePath)).pipe(
              concatMap(() => {
                console.log(`Uploading image ${imagePath} to Sanity`);
                return from(
                  client.assets.upload("image", fs.createReadStream(imagePath)),
                ).pipe(
                  tap((imageAsset) => {
                    console.log(`Image uploaded to Sanity: ${imageAsset.url}`);
                    const newImageUrl = imageAsset.url;
                    image.setAttribute("src", newImageUrl);
                  }),
                );
              }),
            );
          }),
        );
        return imageDownloads.pipe(
          concatMap(() => {
            const newContent = postRoot.toString();
            const newPost = {
              _type: "post",
              title: post.title,
              slug: {
                _type: "slug",
                current: post.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .slice(0, 200),
              },
              body: [
                {
                  _type: "block",
                  children: [
                    {
                      _type: "span",
                      text: newContent,
                    },
                  ],
                  markDefs: [],
                },
              ],
              publishedAt: post.published,
            };
            console.log(`Creating post in Sanity: ${post.title}`);
            return from(client.create(newPost));
          }),
        );
      }),
    )
    .subscribe({
      next: (result) => console.log("Post created:", result._id),
      error: (err) => console.error("Migration failed:", err),
      complete: () => {
        console.log("Migration complete!");
        rl.close();
      },
    });
});
