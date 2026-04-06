import { defineQuery } from "next-sanity";

export const nextClubEventQuery = defineQuery(
  `*[_type == "clubEvent" && date >= now()] | order(date asc) [0] {
 "place": place->name,
  date,
  'image': place->image.asset,
  'lng': place->location.lng,
  'lat': place->location.lat,
}`,
);

export const nextEventsQuery = defineQuery(
  `*[
    _type == "event" &&
    string::split(string(date), "T")[0] >= string::split(string(now()), "T")[0]
  ]
  | order(date asc, _id asc)[0..5] {
    title,
    date,
    distance,
    participants
  }`,
);

export const blogQuery = defineQuery(
  `*[_type == "post"]| order(publishedAt desc) [0..2] {
 title,
 "slug": slug.current,
 "author": author->name,
 "image": mainImage.asset,
 publishedAt,
 body
}`,
);

export const allEventsQuery = defineQuery(
  `*[_type == "event"] | order(date desc) {
 title,
 date,
 distance,
 participants
}`,
);

export const allBlogPostsQuery = defineQuery(
  `*[_type == "post"]| order(publishedAt desc) {
 title,
 "slug": slug.current,
 "author": author->name,
 "image": mainImage.asset,
 publishedAt,
 body
}`,
);

export const allClubEventLocationsQuery = defineQuery(
  `*[_type == "location"] {
 "place": name,
  'image': image.asset,
  'lng': location.lng,
  'lat': location.lat,
}`
);
