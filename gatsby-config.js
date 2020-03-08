require('dotenv').config({
  path: '.env',
});

const siteMetadata = {
  title: 'aluc.io',
  description: "alfreduc's Blog",
}

const supportedLanguages = require('./src/utils/i18n/supportedLanguages');

const languages = supportedLanguages.map(language => language.languageTag);

const plugins = [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/static/`,
      name: 'staticImage',
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/contents/pages`,
      name: 'pages',
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/contents/posts/`,
      name: 'posts',
    },
  },
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 590,
          },
        },
        {
          resolve: `gatsby-remark-responsive-iframe`,
          options: {
            wrapperStyle: `margin-bottom: 1.0725rem`,
          },
        },
        `gatsby-remark-prismjs`,
        `gatsby-remark-copy-linked-files`,
        `gatsby-remark-smartypants`,
      ],
    },
  },

  'gatsby-plugin-react-helmet',
  'gatsby-transformer-sharp',
  'gatsby-plugin-sharp',
  'gatsby-plugin-typescript',
  'gatsby-plugin-emotion',
  'gatsby-plugin-remove-serviceworker',
  'gatsby-plugin-svgr',
  {
    resolve: 'gatsby-plugin-intl',
    options: {
      path: `${__dirname}/src/locales`,
      languages,
      defaultLanguage: 'en-us',
      redirect: false,
    },
  },
  {
    resolve: 'gatsby-plugin-prefetch-google-fonts',
    options: {
      fonts: [
        {
          family: 'Lora',
          subsets: ['latin'],
          variants: ['400', '700'],
        },
        {
          family: 'Nanum Gothic Coding',
          variants: ['400', '700'],
        },
      ],
    },
  },
];

// Bundle analyzer, dev only
if (process.env.ENABLE_BUNDLE_ANALYZER === '1') {
  plugins.push('gatsby-plugin-webpack-bundle-analyser-v2');
}

module.exports = {
  siteMetadata,
  plugins,
};
