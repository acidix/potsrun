import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

// export { config } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string
      slug?: string | undefined
    }>(req, process.env.SANITY_REVALIDATE_SECRET)
    if (!isValidSignature) {
      const message = 'Invalid signature'
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      })
    }

    if (!body?._type) {
      const message = 'Bad Request'
      return new Response(JSON.stringify({ message, body }), { status: 400 })
    }

    // If the `slug` field is found in the body, join it with the `_type`
    // to form the revalidation tag. Otherwise, just use the `_type`.
    // This allows for revalidating individual documents, as well as collections
    // of documents, all at once.
    const revalidationTag = body.slug
      ? `${body._type}:${body.slug}`
      : body._type
    await revalidateTag(revalidationTag)
    const message = `revalidated tag: ${revalidationTag}`
    return NextResponse.json({ body, message })
  } catch (err) {
    console.error(err)
    return new Response(err.message, { status: 500 })
  }
}

export {};
