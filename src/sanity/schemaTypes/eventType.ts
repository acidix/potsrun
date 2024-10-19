import {PinIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'date',
      type: 'date',
    }),
    defineField({
      name: 'distance',
      title: 'Distance (km)',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Event Date',
      name: 'eventDateDesc',
      by: [
        {field: 'date', direction: 'desc'}
      ]
    },
    {
      title: 'Event Date (reverse)',
      name: 'eventDateAsc',
      by: [
        {field: 'date', direction: 'asc'}
      ]
    }
  ]
})
