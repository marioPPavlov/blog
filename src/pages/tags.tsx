import * as React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { graphql, Link, useStaticQuery } from "gatsby"
import { MarkdownNodes } from "../types"

type MarkdownNodesWithTags = MarkdownNodes<{
  frontmatter: {
    tags: string[]
  }
}>

function getSortedTagsByCount({ allMdx }: MarkdownNodesWithTags) {
  const tags = allMdx.nodes
    .map(node => node.frontmatter.tags)
    .filter(tag => tag)
    .reduce<Record<string, number>>((a, b) => {
      b.forEach(tag => {
        if (!a[tag]) {
          a[tag] = 1
        } else {
          a[tag]++
        }
      })
      return a
    }, {})

  return Object.entries(tags).sort((a, b) => b[1] - a[1]) //sort tuples by count
}

const BlogIndex = ({ location }) => {
  const markdownNodesWithTags = useStaticQuery<MarkdownNodesWithTags>(graphql`
    query {
      allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
        nodes {
          frontmatter {
            tags
          }
        }
      }
    }
  `)

  const tagTuples = getSortedTagsByCount(markdownNodesWithTags)

  return (
    <Layout location={location}>
      <SEO title="All posts" />
      {tagTuples.map(([tagName, count]) => (
        <Link className="link" to={`/tags/${tagName}`}>
          <h3 key={tagName}>{`${tagName} ${count > 1 ? `(${count})` : ""}`}</h3>
        </Link>
      ))}
    </Layout>
  )
}

export default BlogIndex
