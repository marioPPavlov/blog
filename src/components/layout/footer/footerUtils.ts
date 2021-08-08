import emailjs from "emailjs-com"

export type Status = "unsent" | "sent" | "failed" | "loading"

export async function addSubscription({
  email,
  name,
  setStatus,
}: {
  email: string
  name: string
  setStatus: (status: Status) => void
}) {
  const config = process.env.GATSBY_EMAIL_CONFIG?.split(",")
  if (!config) {
    alert("No configuration for email set")
    return
  }

  try {
    setStatus("loading")
    const [service, template, user] = config
    const response = await emailjs.send(
      service,
      template,
      {
        email,
        message: name,
      },
      user
    )
    if (response.status === 200) {
      setStatus("sent")
      return
    }
    setStatus("failed")
  } catch {
    setStatus("failed")
  }
}

const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export function getValidationErrors({
  name,
  email,
}: {
  name: string
  email: string
}): string[] {
  email = email.trim()
  name = name.trim()

  const errors: string[] = []
  if (email.length < 6) {
    errors.push("Email length must be atleast 6 characters long")
  }

  if (!emailPattern.test(email)) {
    errors.push("The email address is not valid")
  }

  if (name.length < 3) {
    errors.push("Your name must be atleast 3 characters long")
  }

  return errors
}
