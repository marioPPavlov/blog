import { Link } from "gatsby"
import React from "react"
import "./PostCard.css"
import LocalOfferIcon from "@material-ui/icons/LocalOffer"

export type Post = {
  frontmatter: {
    title: string
    subtitle?: string
    date: string
    tags: string[]
  }
  fields: {
    slug: string
  }
  excerpt?: string
}

export default function PostCard({ frontmatter, fields }: Post) {
  const title = frontmatter.title || fields.slug
  const subTitle = frontmatter.subtitle || ""

  return (
    <Link to={fields.slug} itemProp="url">   
      <article
        className="postCard"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className={"postCard__header"}>
          <div className="postCard__title">
            <h4 itemProp="headline">{title}</h4>
            <span itemProp="headline">{subTitle}</span>
          </div>
        </header>

        <footer className="postCard__footer">
          <div className="postCard__tagsWrapper">
            {frontmatter.tags?.length > 0 && (
              <>
                <LocalOfferIcon
                  fontSize="small"
                  className="postCard__tag-icon"
                />
                <ul className="postCard__tags">
                  {frontmatter.tags.map(tag => (
                    <li key={tag}>
                      <Link className="link" to={`/tags/${tag}`}>
                        <span>{tag}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </footer>
      </article>
    </Link>
  )
}
