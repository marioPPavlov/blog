const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

async function createPostPages({ graphql, actions, reporter }) {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMdx.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }
}

async function createBlogPostByTagPages({ graphql, actions, reporter }) {
  const { createPage } = actions

  // Define a template for blog post
  const tagsTemplate = path.resolve(`./src/templates/blog-posts-by-tag.tsx`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            frontmatter {
              tags
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your tags`, result.errors)
    return
  }

  const tags = result.data.allMdx.nodes
    .map(n => n.frontmatter.tags)
    .flat()
    .filter(t => t)
    .filter((t, i, arr) => arr.indexOf(t) === i) //get unique tags

  if (tags.length > 0) {
    tags.forEach(tag => {
      createPage({
        path: `/tags/${tag}`,
        component: tagsTemplate,
        context: {
          tag,
        },
      })
    })
  }
}

exports.createPages = async (args) => {
  await createPostPages(args);
  await createBlogPostByTagPages(args);
}


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "Mdx" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(
    `
    type Fields {
      slug: String
    }

    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type Mdx implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      subtitle: String
      description: String
      date: Date @dateformat
      tags: [String]
    }
  `
  )
}
