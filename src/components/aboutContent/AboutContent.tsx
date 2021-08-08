import { StaticImage } from "gatsby-plugin-image"
import React from "react"
import { Tooltip } from "../utility/tooltip/Tooltip"
import "./AboutContent.css"

export const AboutContent = () => {
  return (
    <div className="about-content">
      <div className="about-content__header">
        <Tooltip text="Okay, I know this refernce is a bit cheesy, but I couldn't help myself :)">
          <h3 className="about-content__greeting">
            Hello, it's a me, <b>Mario!</b>
          </h3>
        </Tooltip>
      </div>
      <div className="container">
        <StaticImage
          className="about-content__profile-pic"
          layout="fixed"
          backgroundColor="white"
          placeholder="none"
          formats={["AUTO", "WEBP", "AVIF"] as any}
          src="../../images/profile-pic.png"
          quality={95}
          width={300}
          height={400}
          alt="Profile picture"
        />
      </div>
      <p className="about-content__welcome">
        First of all, how nice of you to visit my blog. Thank you and welcome :)
      </p>
      <p>
        I'm a Bulgarian software engineer from Sofia/Bulgaria and have been
        programming professionally for more than half a decade, back in 2016 I
        started as a freelance developer writing online trading scripts on MQL4
        (a C++ subset language). For the last 3 years I've been working on a
        sports betting platform with technologies like .NET and React.
      </p>

      <p>
        As of late my fouces has shifted heavily towards React and this is what
        blog is currently going to be about. A place where a share my ideas for
        custom hooks, ways to structuring React components and I also won't shy
        away from writing about accompanying tools like Typescript and Redux.
      </p>
    </div>
  )
}
