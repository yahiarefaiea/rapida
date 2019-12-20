export default {
  type: 'object',
  properties: {
    book: {
      type: 'array',
      minItems: 5,
      maxItems: 10,
      items: {
        type: 'object',
        properties: {
          _id: {
            type: 'integer',
            unique: true,
            minimum: 1
          },
          title: {
            type: 'string',
            faker: 'lorem.words'
          },
          author: {
            type: 'string',
            faker: 'name.findName'
          },
          read: {
            type: 'boolean',
            faker: 'random.boolean'
          }
        },
        required: ['_id', 'title', 'author', 'read']
      }
    }
  },
  required: ['book']
}
