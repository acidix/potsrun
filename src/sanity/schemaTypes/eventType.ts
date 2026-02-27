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
    defineField({
      name: 'participants',
      title: 'PotsRun Participants',
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
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      distance: 'distance',
      participants: 'participants',
    },
    prepare(select) {
      return {
        title: select.title,
        subtitle: `${select.date} - ${select.distance} km - ${select.participants} Participants`,
      }
    }
  }
})
