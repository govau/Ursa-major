import React from "react"
import Header from "../header"
import Footer from "../footer"
import "../../sass/main.scss"
import { useStaticQuery, graphql } from "gatsby"

interface Props {
  children: React.ReactElement
}

const DefaultLayout: React.FC<Props> = (props: any) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>{props.children}</main>
      <Footer />
    </>
  )
}

export default DefaultLayout
