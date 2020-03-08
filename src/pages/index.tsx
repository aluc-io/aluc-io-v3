import React from 'react';
import styled from '@emotion/styled';
import { useIntl } from 'gatsby-plugin-intl';
import { graphql } from 'gatsby';
import { SEO } from '~/components/SEO';
import { Layout } from '~/components/Layout';
import { PostTitleItem } from '~/components/PostTitleItem';
import { PostTitleItemProps } from '~/components/PostTitleItem/PostTitleItem';
import { Avatar } from '~/components/Avatar';

const Card = styled.div`
    min-width: 570px;
    padding: 1.5rem;
    text-align: center;
    background-color: #f7fafc;
    border-radius: 0.5rem;
    box-shadow: 2px 4px 12px 3px rgba(249,249,249,0.25);
}`;

const Index: React.FC<Props> = ({ data }) => {
  const intl = useIntl()
  const PostTitleItemPropsArr = data.allMarkdownRemark.edges.map(o => o.node)
  const { title, description } = data.site.siteMetadata
  return (
    <Layout>
      <Avatar />
      <SEO title={title} description={description} />
      {PostTitleItemPropsArr.map( props => <PostTitleItem key={props.fields.slug} {...props}/>)}
    </Layout>
  );
};

export default Index;

interface Props {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
      }
    }
    allMarkdownRemark: {
      edges: {
        node: PostTitleItemProps
      }[]
    }
  }
}

export const pageQuery = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      filter: {
        fields: { fileRelativePath: { regex: "/posts/.+?/index\\.md/" }}
        frontmatter: { published: { eq: true }}
      }
      sort: { fields: [fields___prefix], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            subTitle
            category
            published
          }
        }
      }
    }
  }
`
