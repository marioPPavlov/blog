import React from "react"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner"
import "./DefaultLoader.css"

export default function DefaultLoader() {
  return (
    <div className="defaultLoader">
      <Loader
        type="Audio"
        color="white" //TODO decide on color
        secondaryColor="black"
        height={80}
        width={80}
      />
    </div>
  )
}
