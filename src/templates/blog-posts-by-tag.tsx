import { graphql } from "gatsby"
import * as React from "react"
import Layout from "../components/Layout"
import { Post } from "../components/postCard/PostCard"
import PostCardList from "../components/postCardList/PostCardList"
import SEO from "../components/SEO"

const BlogPostsByTag = ({ location, data, pageContext }) => {
  const { tag } = pageContext
  const posts: Post[] = data.allMdx.nodes

  return (
    <Layout location={location}>
      <h2 className="ta-c">{tag}:</h2>
      <SEO title="Tags" />
      <PostCardList posts={posts} />
    </Layout>
  )
}

export default BlogPostsByTag

export const pageQuery = graphql`
  query tags($tag: String) {
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { tags: { eq: $tag } } }
    ) {
      nodes {
        fields {
          slug
        }
        excerpt
        frontmatter {
          title
          subtitle
          description
          date
          tags
        }
      }
    }
  }
`
