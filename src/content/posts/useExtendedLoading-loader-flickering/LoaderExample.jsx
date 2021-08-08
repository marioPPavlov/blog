import React from "react"
import Loader from "react-loader-spinner"
import "./LoaderExample.css"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { useEffect, useState, useReducer } from "react"
import placeholder from "./placeholder.png"
import cat1 from "./cat1.png"
import cat2 from "./cat2.png"
import cat3 from "./cat3.png"

const images = [placeholder, cat1, cat2, cat3]

const getDelay = async time => {
  await new Promise(resolve => setTimeout(resolve, time))
}

export const useExtendedLoading = (isLoading, minTime) => {
  const [isExtendedLoading, setIsExtendedLoading] = useState(false)

  useEffect(() => {
    if (isLoading) {
      setIsExtendedLoading(true)

      setTimeout(() => {
        setIsExtendedLoading(false)
      }, minTime)
    }
    // eslint-disable-next-line
  }, [isLoading])

  return isLoading || isExtendedLoading
}

const LoaderExample = ({ shouldExtendloading }) => {
  const [isFetching, setIsFetching] = useState(false)
  const [imgIdx, incrementImgIdx] = useReducer(idx => (idx % 3) + 1, 0)
  const isExtendedLoading = useExtendedLoading(isFetching, 500)
  const isLoading = shouldExtendloading ? isExtendedLoading : isFetching

  const fetchCats = async () => {
    setIsFetching(true)
    incrementImgIdx()
    await getDelay(80)
    setIsFetching(false)
  }

  return (
    <div className="loaderExample loaderExample__cats">
      {isLoading ? (
        <Loader height={175} width={175} />
      ) : (
        <>
          <img src={images[imgIdx]} alt="cat" className="loaderExample__img" />
          <button onClick={fetchCats}>fetch a cat</button>
        </>
      )}
    </div>
  )
}

export const SimpleLoaderExample = () => {
  const [isLoading, setIsLoading] = useState(false)

  const startLoading = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 100) //makes the function execution stall for 100ms
  }

  return (
    <div className="loaderExample loaderExample__simple">
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <h3>press the button to load</h3>
          <button onClick={startLoading}>click me</button>
        </>
      )}
    </div>
  )
}

export const SimpleLoaderExampleWithExtendedLoader = () => {
  const [isLoading, setIsLoading] = useState(false)
  const isExtendedLoading = useExtendedLoading(isLoading, 400)

  const startLoading = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 100)
  }

  return (
    <div className="loaderExample loaderExample__simple">
      {isExtendedLoading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <h3>press the button to load</h3>
          <button onClick={startLoading}>click me</button>
        </>
      )}
    </div>
  )
}

export default LoaderExample
