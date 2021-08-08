import * as React from "react"
import { AboutContent } from "../components/aboutContent/AboutContent"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

const About = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="About" />
      <AboutContent />
    </Layout>
  )
}

export default About
