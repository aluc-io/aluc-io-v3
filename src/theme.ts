import { Theme } from '@theme/styled';

export interface DefaultTheme extends Theme {
  showLayout: boolean
  customColor: {
    hover: string
  }
}

const theme: DefaultTheme = {
  showLayout: false,
  customColor: {
    hover: 'rgba(0, 0, 0, 0.04)',
  },
  color: {
    primary: '#008489',
    secondary: '#00e676',
    tertiary: '#f39b84',
    gray: {
      lightest: '#faf8f5',
      light: '#e2dedc',
      medium: '#aaa5a3',
      dark: '#75706b',
      darkest: '#463b36',
    },
    status: {
      error: {
        light: '#ffeeea',
        medium: '#ed6c4a',
        dark: '#ba3816',
      },
    },
    text: {
      heading: '#463b36',
      body: '#75706b',
    },
    disabled: '#aaa5a3',
  },
  spacing: {
    unit: 8,
  },
  shape: {
    borderRadius: {
      small: 4,
      medium: 6,
      large: 32,
    },
  },
};

export default theme;
