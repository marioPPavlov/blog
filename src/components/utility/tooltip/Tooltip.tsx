import React from "react"
import "./Tooltip.css"

type Props = {
  text: string
}

export const Tooltip: React.FC<Props> = ({ children, text }) => {
  const [show, setShow] = React.useState(false)

  return (
    <div className="tooltip-container">
      <div className={show ? "tooltip-box visible" : "tooltip-box"}>
        {text}
        <span className="tooltip-arrow" />
      </div>
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
    </div>
  )
}
