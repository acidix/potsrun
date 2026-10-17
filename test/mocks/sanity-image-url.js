// Lightweight stand-in for `@sanity/image-url` used by Jest (the real package
// ships ESM). Provides a chainable image builder.

function makeChain() {
  const chain = {
    width: () => chain,
    height: () => chain,
    url: () => "https://example.com/image.jpg",
  };
  return chain;
}

function createImageUrlBuilder() {
  return { image: () => makeChain() };
}

module.exports = createImageUrlBuilder;
module.exports.default = createImageUrlBuilder;
module.exports.createImageUrlBuilder = createImageUrlBuilder;
