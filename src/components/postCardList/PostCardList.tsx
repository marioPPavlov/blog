import React from "react"
import PostCard, { Post } from "../postCard/PostCard"

type Props = {
  posts: Post[]
}

function PostCardList({ posts }: Props) {
  return (
    <div>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => (
          <PostCard
            key={post.fields.slug}
            frontmatter={post.frontmatter}
            excerpt={post.excerpt}
            fields={post.fields}
          />
        ))}
      </ol>
    </div>
  )
}

export default PostCardList
