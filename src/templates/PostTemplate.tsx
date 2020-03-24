import React, { FC } from "react"
import { graphql } from "gatsby"
import { useIntl } from 'gatsby-plugin-intl'
import { css } from '@emotion/core'
import ReactMarkdown from 'react-markdown'
import { Layout } from '~/components/Layout'
import { SEO } from '~/components/SEO'

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

const cssBox = css`
  max-width: 800px;
  padding: 10px;
  margin: auto;
  word-break: keep-all;
`

const cssTitle = css`
  color: black;
  font-size: 40px;
  font-weight: 700;
`

const PostTemplate: FC<PropsPost> = (props) => {
  const { post } = props.data
  const { html } = post
  const { title } = props.data.post.frontmatter

  const intl = useIntl()
  return (
    <Layout>
      <SEO title={intl.formatMessage({ id: 'homepage.title' })} />
      <div css={cssBox}>
        <h1 css={cssTitle}>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }}/>
      </div>
    </Layout>
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
