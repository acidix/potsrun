// Lightweight stand-in for `next-sanity` used by Jest.
// The real package ships ESM, which the CommonJS Jest runtime cannot require.
// Only the symbols imported by code under test need to be provided.

function defineQuery(query) {
  return query;
}

function createClient() {
  return {
    fetch: async () => [],
  };
}

function PortableText() {
  return null;
}

module.exports = { defineQuery, createClient, PortableText };
