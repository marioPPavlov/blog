import * as React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import PostCardList from "../components/postCardList/PostCardList"
import { graphql, useStaticQuery } from "gatsby"
import { Post } from "../components/postCard/PostCard"

const BlogIndex = ({ location }) => {
  const { allMdx } = useStaticQuery(graphql`
    query {
      allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
        nodes {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            subtitle
            tags
          }
        }
      }
    }
  `)

  const posts: Post[] = allMdx.nodes

  return (
    <Layout location={location}>
      <SEO title="All posts" />
      {/* <Bio /> */}
      <PostCardList posts={posts} />
    </Layout>
  )
}

export default BlogIndex
