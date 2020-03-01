const path = require('path');

const { createFilePath } = require(`gatsby-source-filesystem`);

require('dotenv').config({
  path: '.env',
});

exports.onCreateWebpackConfig = function addPathMapping({
  stage,
  actions,
  getConfig,
}) {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
      },
    },
  });

  // Attempt to improve webpack vender code splitting
  if (stage === 'build-javascript') {
    const config = getConfig();

    config.optimization.splitChunks.cacheGroups = {
      ...config.optimization.splitChunks.cacheGroups,
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        enforce: true,
        chunks: 'all',
        priority: 1,
      },
    };

    // Ensure Gatsby does not do any css code splitting
    config.optimization.splitChunks.cacheGroups.styles.priority = 10;

    actions.replaceWebpackConfig(config);
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogPost = path.resolve('./src/templates/PostTemplate.tsx');
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { fields: [fields___prefix], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            id
            fileAbsolutePath
            fields {
              slug
              prefix
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.error('error occur: ');
    console.error(result.errors);
    return;
  }

  // Create blog posts pages.
  let posts = result.data.allMarkdownRemark.edges;
  posts = posts.filter(post => {
    // 아래 "if( isPost && ! isIndexMd ) return" 문에서 fileds 생성이 안된 노드들
    if (!post.node.fields) return false;
    if ((!post.node.frontmatter || {}).published) return false;

    const isPost = /^\/posts\//.test(post.node.fields.slug);
    if (!isPost) return true;

    const isIndexMd = /index\.md$/.test(post.node.fileAbsolutePath);
    return isIndexMd;
  });

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;
    const { slug } = post.node.fields;
    createPage({
      path: slug,
      component: blogPost,
      context: { slug, previous, next },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  if (node.internal.type !== `MarkdownRemark`) return;

  const { createNodeField } = actions;
  const contentsPath = path.resolve('./contents');
  const fileRelativePath = path.relative(contentsPath, node.fileAbsolutePath);
  const slug = `/` + path.dirname(fileRelativePath);

  const isPost = /^posts\//.test(fileRelativePath);
  const isIndexMd = /index\.md$/.test(fileRelativePath);
  if (isPost && !isIndexMd) return;

  createNodeField({ node, name: `fileRelativePath`, value: fileRelativePath });

  const relativeFilePath = createFilePath({
    node,
    getNode,
    trailingSlash: false,
  });
  createNodeField({ node, name: `slug`, value: relativeFilePath });

  const prefix = path.basename(slug).split('-').slice(0, 3);
  createNodeField({ node, name: `prefix`, value: prefix });
  console.log('-------------oncreatenode----------------');
};
