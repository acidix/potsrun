import {defineQuery} from 'next-sanity'

export const nextClubEventQuery = defineQuery(
    `*[_type == "clubEvent" && date > now()] | order(date asc) [0] {
 "place": place->name,
 date,
 'image': place->image.asset,
}`
  );

export const nextEventsQuery = defineQuery(
    `*[_type == "event" && date > now()] | order(date asc) [0..4] {
 title,
 date,
 distance
}`
  );

export const blogQuery = defineQuery(
    `*[_type == "post"]| order(publishedAt desc) [0..2] {
 title,
 "slug": slug.current,
 "author": author->name,
 "image": mainImage.asset,
 publishedAt,
 body
}`
  );

