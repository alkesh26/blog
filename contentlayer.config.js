import { defineDocumentType, makeSource, defineNestedType } from "contentlayer/source-files";
const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.md`,
  contentType: 'markdown',
  fields: {
    title: {
      type: 'string', required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    author: {
      type: 'string',
    },
    description: {
      type: 'string',
      required: true,
    },
    hashtags: {
      type: 'list', of: { type: 'string' },
    },
    categories: {
      type: 'string',
    },
    body: {
      type: 'string',
    }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.md/, ""),
    },
  }
}))
export default makeSource({
  contentDirPath: 'content/posts',
  documentTypes: [Post],
})