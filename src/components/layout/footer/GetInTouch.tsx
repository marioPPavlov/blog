import React, { useState } from "react"
import "./GetInTouch.css"
import DefaultLoader from "../../defaultLoader/DefaultLoader"
import { addSubscription, getValidationErrors, Status } from "./footerUtils"

type ComponentFunc = (options: {
  setStatus: (value: Status) => void
}) => JSX.Element

const statusComponentMap: Record<Status, ComponentFunc> = {
  unsent({ setStatus }) {
    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [errors, setErrors] = useState<string[]>([])

    return (
      <>
        <label htmlFor="message">Your Name</label>
        <input
          className="get-in-touch__input"
          role="textbox"
          name="message"
          id="message"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <label htmlFor="email">Your Email Address</label>
        <input
          className="get-in-touch__input"
          id="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <button
          className="get-in-touch__button"
          onClick={() => {
            const errors = getValidationErrors({ name, email })

            if (errors.length) {
              setErrors(errors)
              return
            }

            addSubscription({ email, name, setStatus })
          }}
        >
          Submit
        </button>
        {!!errors.length && <p className="get-in-touch__error">{errors[0]}</p>}
      </>
    )
  },
  sent: () => <h1> Thank you for subscribing :) </h1>,
  failed() {
    return (
      <>
        <h2> Something didn't work as expected... </h2>
        <h2>The shame... :(</h2>
      </>
    )
  },
  loading: () => <DefaultLoader />,
}

function GetInTouch() {
  const [status, setStatus] = useState<Status>("unsent")
  const Component = statusComponentMap[status]

  return (
    <div className="get-in-touch">
      <h1 className="get-in-touch__caption">More from me?</h1>
      <div className="get-in-touch__content">
        <div className="get-in-touch__left-col">
          <span>
            If you'd like to see more of my thoughts about Typescript,
            Javascript, React or software engineering in general, please
            subscribe to my newsletter.
          </span>
          <hr />
          <span>You can unsubscribe at any time.</span>
        </div>
        <div className="get-in-touch__right-col">
          <Component setStatus={setStatus} />
        </div>
      </div>
    </div>
  )
}

export default GetInTouch
