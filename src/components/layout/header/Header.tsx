import { Link } from "gatsby"
import React from "react"
import "./Header.css"

type Props = {
  title: string
  job: string
}

export default function Header({ title, job }: Props) {
  return (
    <header className="header">
      <Link className="header-link-home logo" to="/">
        <span className={"title"}>{title}</span>
        <span className={"description"}>{job}</span>
      </Link>
      <div className={"tabs"}>
        <Link className="header-link-home middle link" to="/">
          <span>Home</span>
        </Link>
        <Link className="header-link-home link" to="/tags">
          <span>Tags</span>
        </Link>
        <Link className="header-link-home link" to="/about">
          <span>About</span>
        </Link>
      </div>
    </header>
  )
}
