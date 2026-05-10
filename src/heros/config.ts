import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Home Hero',
          value: 'home',
        },
      ],
      required: true,
    },
    {
      name: 'eyebrow',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'home',
      },
    },
    {
      name: 'titleType',
      type: 'select',
      defaultValue: 'text',
      options: [
        { label: 'Text', value: 'text' },
        { label: 'Media', value: 'media' },
      ],
      admin: {
        condition: (_, { type } = {}) => type === 'home',
      },
    },
    {
      name: 'homeTitle',
      type: 'text',
      admin: {
        condition: (_, { type, titleType } = {}) => type === 'home' && titleType === 'text',
      },
    },
    {
      name: 'titleMedia',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { type, titleType } = {}) => type === 'home' && titleType === 'media',
      },
    },
    {
      name: 'titleResolution',
      type: 'number',
      defaultValue: 400,
      admin: {
        condition: (_, { type, titleType } = {}) => type === 'home' && titleType === 'media',
        description: 'Set the width of the title media in pixels',
      },
    },
    {
      name: 'meta',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        condition: (_, { type } = {}) => type === 'home',
      },
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'suffix',
          type: 'text',
        },
      ],
      admin: {
        condition: (_, { type } = {}) => type === 'home',
      },
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'homeArt',
      type: 'group',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'imageResolution',
          type: 'number',
          defaultValue: 600,
          admin: {
            description: 'Set the width of the art image in pixels',
          },
        },
        {
          name: 'tags',
          type: 'array',
          maxRows: 3,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'color',
              type: 'select',
              options: [
                { label: 'Green', value: 'green' },
                { label: 'Orange', value: 'orange' },
                { label: 'White', value: 'white' },
              ],
            },
            {
              name: 'rotation',
              type: 'number',
            },
          ],
        },
      ],
      admin: {
        condition: (_, { type } = {}) => type === 'home',
      },
    },
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'mediaResolution',
      type: 'number',
      defaultValue: 1200,
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
        description: 'Set the width of the hero media in pixels',
      },
    },
  ],
  label: false,
}
