import {PinIcon} from '@sanity/icons'
import moment from 'moment'
import {defineField, defineType} from 'sanity'

export const clubEventType = defineType({
  name: 'clubEvent',
  title: 'Club Event',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'date',
      type: 'datetime',
    }),
    defineField({
        name: 'place',
        type: 'reference',
        to: [{type: 'location'}]
    }),
    defineField({
      name: 'remarks',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'date',
      location: 'place.name'
    },
    prepare(selection) {
      const {title, location} = selection
      return {
        title: (moment(title)).format('DD.MM.YYYY HH:mm:ss'),
        subtitle: location ? location : 'unknown'
      }
    }
  },
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
