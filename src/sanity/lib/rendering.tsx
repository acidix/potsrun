import { PortableText, PortableTextReactComponents } from "next-sanity";
import Image from "next/image";
import { urlFor } from "./client";

export function renderPortableText(blocks) {
  const components = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <Image
            alt={value.alt || " "}
            loading="lazy"
            width={800}
            height={600}
            src={urlFor(value)
              .width(800)
              .height(600)
              .fit("max")
              .auto("format")
              .url()}
          />
        );
      },
    },
    marks: {
      link: ({ children, value }) => {
        const href = typeof value?.href === "string" ? value.href : "";
        if (!href) {
          return <>{children}</>;
        }

        const isInternalLink = href.startsWith("/") || href.startsWith("#");
        const hasProtocol = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(href);
        const allowedProtocols = ["http:", "https:", "mailto:", "tel:"];
        if (
          hasProtocol &&
          !allowedProtocols.some((protocol) =>
            href.toLowerCase().startsWith(protocol),
          )
        ) {
          return <>{children}</>;
        }

        const rel = isInternalLink ? undefined : "noopener noreferrer";
        const target = isInternalLink ? undefined : "_blank";

        return (
          <a href={href} rel={rel} target={target}>
            {children}
          </a>
        );
      },
    },
  };

  return (
    <PortableText
      value={blocks}
      components={components as unknown as PortableTextReactComponents}
    />
  );
}
