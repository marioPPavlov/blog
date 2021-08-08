import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { MDXRenderer } from "gatsby-plugin-mdx"
import "./blog-post.css"
import { Post } from "../components/postCard/PostCard"
import PostCardWithArrow from "../components/postCard/PostCardWithArrow"

type Props = {
  data: {
    mdx: Post & { body: string }
    previousPost: Post
    nextPost: Post
  }
  location: any
}

const BlogPostTemplate = ({ data, location }: Props) => {
  const post = data.mdx
  const { previousPost, nextPost } = data
  return (
    <Layout location={location}>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className="blog-post__header">
          <div className="blog-post__dare-wrapper">
            <span>{post.frontmatter.date}</span>
          </div>
          <h1 itemProp="headline" className="blog-post__headline">
            {post.frontmatter.title}
          </h1>
          <p itemProp="headline">{post.frontmatter.subtitle}</p>
        </header>
        <MDXRenderer>{post.body}</MDXRenderer>
      </article>
      <hr />

      <nav className="blog-post-nav">
        <div className="blog-post__read-more">
          <h3>Hey, looks like you reached the end of the post!</h3>
          <h3>Care to read one more?:</h3>
        </div>
        {nextPost && <PostCardWithArrow arrow="forward" post={nextPost} />}
        {previousPost && <PostCardWithArrow arrow="back" post={previousPost} />}
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
        job
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        subtitle
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previousPost: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        subtitle
        date(formatString: "MMMM DD, YYYY")
        tags
      }
    }
    nextPost: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        subtitle
        date(formatString: "MMMM DD, YYYY")
        tags
      }
    }
  }
`
