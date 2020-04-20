import React from "react"

interface Props {
  children: React.ReactElement
  alt?: Boolean
}

const Section: React.FC<Props> = ({ children, alt }) => {
  return (
    <>
      <section className={`au-body ${alt ? "au-body--alt" : ""}`}>
        {children}
      </section>
    </>
  )
}

export default Section
