import React from "react"
import "./Footer.css"
import GetInTouch from "./GetInTouch"
import GitHubIcon from "@material-ui/icons/GitHub"

function Footer() {
  return (
    <footer className="footer">
      <div className={"global-wrapper global-padding footer__content"}>
        <GetInTouch />
        <div className="footer__copyright">
          <div className="footer__external-links">
            <a
              className="link"
              href="https://github.com/marioPPavlov"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon fontSize="large" className="postCard__tag-icon" />
            </a>
          </div>
          <h5>
            © {new Date().getFullYear()} Mario Pavlov, All Rights Reserved,
            Built with
            {` `}
            <a
              className="link link--primary"
              href="https://www.gatsbyjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gatsby
            </a>
          </h5>
        </div>
      </div>
    </footer>
  )
}

export default Footer
