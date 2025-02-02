import { CollectionConfig } from 'payload'

export const Todos: CollectionConfig = {
  slug: 'todos',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'completed',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'createdAt',
      type: 'date',
      defaultValue: new Date(),
    },
    {
      name: 'updatedAt',
      type: 'date',
      defaultValue: new Date(),
    },
  ],
}
