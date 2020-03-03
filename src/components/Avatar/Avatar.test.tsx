import React from 'react';
import { render } from 'test-utils';

import Avatar, { PostTitleItemProps } from './Avatar';

describe('<Avatar />', () => {
  describe('default', () => {
    test('should render default button styles', () => {
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
      const { container } = render(<Avatar />);
      expect(container.children.length).toBe(1)
      expect(container.children[0].tagName).toBe('LI')
      expect(container.children[0].children[0].tagName).toBe('A')
      expect(container.getElementsByClassName('title')[0].tagName).toBe('SPAN')
      expect(container.getElementsByClassName('title')[0].textContent).toBe(props.frontmatter.title)
    });
  });
});
