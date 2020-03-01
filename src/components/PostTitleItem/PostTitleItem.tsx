/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Theme } from '@theme/styled';
import { rem } from 'polished';
import { GatsbyLinkProps } from 'gatsby';
import { Link } from 'gatsby-plugin-intl';

import { above, spacer } from '~/utils/styles';
import { DefaultTheme } from '~/theme';

type Color = 'primary' | 'secondary';
type Variant = 'default' | 'outline';
export type Size = 'large' | 'medium' | 'small';

// These colors are not part of the design system color palette (defined in the Theme)
const interactionColors = {
  hover: {
    primary: { default: '#ffD840', outline: '#ffcc00' },
    secondary: { default: '#40a2a6', outline: '#008489' },
  },
  active: {
    primary: { default: '#e6b800', outline: '#ffcc00' },
    secondary: { default: '#00696d', outline: '#00696D' },
  },
};

// For buttons that should look like links
const stripStyles = css`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const styleLi = (theme: DefaultTheme) => `
  margin: 0px 0px .7em 0px;
  transition: height 1s;
  list-style: none;
  background-color: ${theme.showLayout ? 'rgba(255, 0, 0, 0.15)' : 'initial'};
  &:hover {
    background-color: ${theme.showLayout ? 'rgba(255, 0, 0, 0.5)' : theme.customColor.hover};
  }
`

const styleLink = (theme: DefaultTheme) => `
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  padding: .5em 0em .5em 0em;
  color: ${theme.color.primary};
  &:hover {
    color: ${theme.customColor.hover};
  }
  &:hover .pointer {
    border-radius: 65% 75%;
  }
`

const styleLiInner = (theme: DefaultTheme) => `
  margin: 0 0 0 0;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
  font-family: 'Nanum Gothic Coding';
  font-weight: 100;

  & .title {
    color: ${theme.color.primary};
  }
  & .date {
    color: ${theme.color.secondary};
    margin-right: 16px;
  }
  & span {
    font-weight: 100;
    line-height: 1.15;
    letter-spacing: -0.03em;
    margin: 0;
    font-size: 1.1em;
  }
`

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

const PostTitleItem: React.FC<PostTitleItemProps> = (props) => {
  const { excerpt, fields, frontmatter } = props
  const { slug, prefix } = fields
  const { title, category } = frontmatter
  const dateStr = new Date(prefix.join('-')).toDateString()
  return (
    <li css={styleLi}>
      <Link
        css={styleLink}
        activeClassName="active"
        to={fields.slug}
      >
        <div css={styleLiInner}>
          <span className="date">{dateStr}</span>
          <span className="title">{title}</span>
        </div>
      </Link>
    </li>
  )
}

/*
      <style jsx>{`
        @media ${theme.mediaQuery.m} {

        }

        @media ${theme.mediaQuery.s} {
          .listItem {
            background-color: ${showLayout ? 'rgba(255, 0, 0, 0.15)' : 'initial'};
            margin-bottom: 0px;
            margin-top: 0.8rem;
          }
          .listItem:hover {
            background-color: ${showLayout ? 'rgba(255, 0, 0, 0.5)' : 'rgba(255, 0, 0, 0.15)'};
          }
          .listLink {
            display: inline-block;
            padding: .5em 0em .5em 0em;
            color: ${theme.navigator.colors.postsListItemLink};
          }
          .listLink:hover {
            color: ${theme.navigator.colors.postsListItemLinkHover};
          }
          .listLink:hover .pointer {
            border-radius: 65% 75%;
          }
          .listItemText .date {
            margin-right: 0px;
            font-size: 0.6rem;
            position: absolute;
            margin-top: -8px;
            background-color: ${showLayout ? 'rgba(255, 0, 0, 0.15)' : 'initial'};
          }
          .listItemText {
            font-family: 'Nanum Gothic Coding';
          }
          .listItemText .title {
            font-size: 1rem;
            color: ${theme.navigator.colors.postsListItemLinkHover};
          }
          .listItemText span {
            letter-spacing: -0.03em;
            margin: 0;
          }
        }

    `}</style>
  )
};
*/

export default PostTitleItem;
