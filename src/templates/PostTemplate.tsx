import React, { FC } from "react"
import { graphql } from "gatsby"

interface Post {
  id: string
  html: string
  tableOfContents: string
  headings: string[]
  fields: {
    slug: string
    prefix: string[]
  }
  frontmatter: {
    title: string
    subTitle: string
    category: string
  }
}

interface PropsPost {
  data: {
    post: Post
    author: string | null
    footnote: string | null
  }
}

const PostTemplate: FC<PropsPost> = (props) => {
  const { post } = props.data
  const { html } = post
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: html }}/>
    </div>
  )
}

export default PostTemplate

export const postQuery = graphql`
  query PostBySlug($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      tableOfContents
      headings {
        value
        depth
      }
      fields {
        slug
        prefix
      }
      frontmatter {
        title
        subTitle
        category
      }
    }
    author: markdownRemark(fields: { fileRelativePath: { eq: "parts/author.md" }}) {
      id
      html
    }
    footnote: markdownRemark(fields: { fileRelativePath: { eq: "parts/footnote.md" }}) {
      id
      html
    }
  }
`
