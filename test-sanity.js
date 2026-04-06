require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-09-04',
  useCdn: false,
});

async function main() {
  const result = await client.fetch('*[_type == "clubEvent"] | order(date asc){ "place": place->name }');
  console.log('clubEvents:', result);
}
main().catch(console.error);
