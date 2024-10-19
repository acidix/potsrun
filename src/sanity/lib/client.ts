import {createClient, type QueryParams} from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

const builder = imageUrlBuilder(client);

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 60, // default revalidation time in seconds
  tags = [],
}: {
  query: QueryString
  params?: QueryParams
  revalidate?: number | false
  tags?: string[]
}) {
  return client.fetch(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate, // for simple, time-based revalidation
      tags, // for tag-based revalidation
    },
  })
}

export function urlFor(source) {
  return builder.image(source)
}

export function blocksToText(blocks, preview_length) {
  const resp = blocks
    .map(block => block.children.map(child => child.text).join(''))

  if (preview_length) {
    return resp.join('').substring(0, preview_length)
  } else {
    return resp.join('')
  }
}

