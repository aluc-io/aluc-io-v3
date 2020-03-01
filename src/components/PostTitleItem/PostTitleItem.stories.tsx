import React from 'react';

import { FormattedMessage } from 'gatsby-plugin-intl';

import PostTitleItem, { PostTitleItemProps } from './PostTitleItem';

export default {
  title: 'PostTitleItem',
};

const props: PostTitleItemProps = {
  excerpt: 'excerpt',
  fields: {
    prefix: ['2019','2','20'],
    slug: '/slug',
  },
  frontmatter: {
    category: 'category',
    published: true,
    subTitle: 'subtitle',
    title: 'ls 명령어 컬러 셋팅 정리',
  },
}
const props2: PostTitleItemProps = {
  excerpt: 'excerpt',
  fields: {
    prefix: ['2011','1','1'],
    slug: '/slug',
  },
  frontmatter: {
    category: 'category',
    published: true,
    subTitle: 'subtitle',
    title: 'ls 명령어 컬러 셋팅 정리',
  },
}
const props3: PostTitleItemProps = {
  excerpt: 'excerpt',
  fields: {
    prefix: ['2020','12','20'],
    slug: '/slug',
  },
  frontmatter: {
    category: 'category',
    published: true,
    subTitle: 'subtitle',
    title: 'ls 명령어 컬러 셋팅 정리',
  },
}

export const Normal = () => {
  return <PostTitleItem {...props}/>
}

export const Normalx3 = () => {
  return (
    <>
      <PostTitleItem {...props}/>
      <PostTitleItem {...props2}/>
      <PostTitleItem {...props3}/>
    </>
  )
}
