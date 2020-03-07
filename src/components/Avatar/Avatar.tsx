/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Theme } from '@theme/styled';
import Img from 'gatsby-image'
import { rem } from 'polished';
import { useStaticQuery, graphql } from 'gatsby';
import { Link } from 'gatsby-plugin-intl';

export type Size = 'large' | 'medium' | 'small';

export type PostTitleItemProps = {
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

const styleMain = () => `
  width: 160px;
  height: 170px;
  border-radius: 50%;
  background-color: #A6C1B0;
  overflow: hidden;
`
const styleImg = () => `
  width: 320px;
`

const Avatar: React.FC<{}> = (props) => {
  const data = useStaticQuery(graphql`
query {
  image: file(sourceInstanceName: {eq: "staticImage"}, relativePath: {eq: "new-avatar.png"}) {
    id
    childImageSharp {
      fluid(maxWidth: 320) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`)

  return (
    <div css={styleMain}>
      <Link to='/about-me'>
        <Img fluid={data.image.childImageSharp.fluid}/>
      </Link>
    </div>
  )
}

export default Avatar;
