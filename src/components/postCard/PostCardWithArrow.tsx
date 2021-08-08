import ArrowBackIos from "@material-ui/icons/ArrowBackIos"
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos"
import { Link } from "gatsby"
import React from "react"
import PostCard, { Post } from "./PostCard"
import "./PostCardWithArrow.css"

type Props = {
  arrow: "forward" | "back"
  post: Post
}

const PostCardWithArrow: React.FC<Props> = ({ arrow, post }) => {
  return (
    <div className="post-card-with-arrow d-flex space-around">
      {arrow === "forward" && <div className="placeholder"></div>}
      <div className={`d-flex align-center post-card-wtih-arrow__${arrow}`}>
        {arrow === "back" && (
          <>
            <Link to={post.fields.slug}>
              <ArrowBackIos
                className="arrow-back"
                fontSize="large"
                style={{ color: "var(--color-primary)" }}
              />
            </Link>
          </>
        )}

        <PostCard {...post} />

        {arrow === "forward" && (
          <>
            <Link to={post.fields.slug}>
              <ArrowForwardIos
                fontSize="large"
                style={{ color: "var(--color-primary)" }}
              />
            </Link>
          </>
        )}
      </div>
      {arrow === "back" && <div className="placeholder"></div>}
    </div>
  )
}

export default PostCardWithArrow
