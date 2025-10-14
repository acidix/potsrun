import { PortableText, PortableTextReactComponents } from "next-sanity"
import Image from "next/image"
import { urlFor } from "./client"

export function renderPortableText(blocks) {
    const components = {
      types: {
        image: ({value}) => {
          if (!value?.asset?._ref) {
            return null
          }
          return (
            <Image
              alt={value.alt || ' '}
              loading="lazy"
              width={800}
              height={600}
              src={urlFor(value).width(800).height(600).fit('max').auto('format').url()}
            />
          )
        }
      },
      marks: {
        link: ({children, value}) => {
          const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
          return (
            <a href={value.href} rel={rel} target="_blank">
              {children}
            </a>
          )
        }
      }
    }

    return (
      <PortableText
        value={blocks}
        components={components as unknown as PortableTextReactComponents}
      />
    )
  }
