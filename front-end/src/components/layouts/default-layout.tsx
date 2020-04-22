import React from "react";
import Header from "../navigation/header";
import Footer from "../navigation/footer";
import "../../sass/main.scss";
import { useStaticQuery, graphql } from "gatsby";
import MainNav from "../navigation/main-nav";
import SEO from "../seo";

interface Props {
  children: React.ReactElement;
}

const DefaultLayout: React.FC<Props> = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <SEO title={data.site.siteMetadata.title} />
      <MainNav />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
