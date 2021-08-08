import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import Footer from "./layout/footer/footer"
import Header from "./layout/header/Header"

const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            job
          }
        }
      }
    `
  )

  return (
    <>
      <div
        className="global-wrapper global-padding"
        data-is-root-path={isRootPath}
      >
        <Header job={site.siteMetadata.job} title={site.siteMetadata.title} />
        <main className="main">{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
