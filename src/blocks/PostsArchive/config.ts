import type { Block } from 'payload'

export const PostsArchiveBlock: Block = {
  slug: 'postsArchive',
  interfaceName: 'PostsArchiveBlock',
  fields: [
    {
      name: 'tagline',
      type: 'text',
      defaultValue: '// 02 — CO NOWEGO',
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'FUZZ[[NEWS]]',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 10,
    },
    {
      name: 'categories',
      type: 'relationship',
      hasMany: true,
      relationTo: 'categories',
      label: 'Filter by Categories (leave empty for all)',
    },
    {
      name: 'anchor',
      type: 'text',
      label: 'Anchor (ID for scroll)',
    },
  ],
}
