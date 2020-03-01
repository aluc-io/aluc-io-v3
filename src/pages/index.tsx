import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { injectIntl, FormattedMessage, InjectedIntlProps } from 'gatsby-plugin-intl';
import { graphql } from 'gatsby';
import { SEO } from '~/components/SEO';
import { Layout } from '~/components/Layout';

const Card = styled.div`
    min-width: 570px;
    padding: 1.5rem;
    text-align: center;
    background-color: #f7fafc;
    border-radius: 0.5rem;
    box-shadow: 2px 4px 12px 3px rgba(249,249,249,0.25);
}`;

const Index: React.FC<InjectedIntlProps & Props> = ({ intl, data }) => {
  return (
    <Layout>
      <SEO title={intl.formatMessage({ id: 'homepage.title' })} />
      <pre>{JSON.stringify(data,null,2)}</pre>
    </Layout>
  );
};

export default injectIntl(Index);

interface SimplePost {
  excerpt: string
  fields: {
    slug: string
    prefix: string[]
  }
  frontmatter: {
    title: string
    subTitle: string
    category: string
    published: boolean
  }
}
interface Props {
  data: {
    allMarkdownRemark: {
      edges: {
        node: SimplePost
      }
    }
  }
}

export const pageQuery = graphql`
  query LayoutQuery {
    allMarkdownRemark(
      filter: { fields: { fileRelativePath: { regex: "/posts/.+?/index\\.md/" }}}
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
