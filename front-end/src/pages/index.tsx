/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import SEO from "../components/seo";
import DefaultLayout from "../components/layouts/default-layout";
import { useStaticQuery, graphql } from "gatsby";
import Section from "../components/layouts/section";
import { useMediaQuery } from "react-responsive";
import Hero from "../components/layouts/hero";
import DashboardHomePage from "../components/blocks/dashboard";

const IndexPage = () => {
  //get MD content
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query MyQuery {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/.*/content/index/*.*.md/" } }
        ) {
          nodes {
            html
            frontmatter {
              id
              alt
              imgUrl
              imgAlt
              imgCaption
            }
          }
        }
      }
    `
  );

  const tech = allMarkdownRemark.nodes.find(
    (page: any) => page.frontmatter.id === "tech"
  );

  const hero = allMarkdownRemark.nodes.find(
    (page: any) => page.frontmatter.id === "hero"
  );

  const isTabletOrMobile: boolean = useMediaQuery({
    query: "(max-width: 768px)",
  });

  return (
    <DefaultLayout>
      <>
        <SEO title="Home" />
        <Hero
          alt={hero.frontmatter.alt}
          imgAlt={hero.frontmatter.imgAlt}
          imgUrl={hero.frontmatter.imgUrl}
          imgCaption={hero.frontmatter.imgCaption}
        >
          <>
            <div dangerouslySetInnerHTML={{ __html: hero.html! }} />
          </>
        </Hero>
        <DashboardHomePage isTabletOrMobile={isTabletOrMobile} />
        <Section alt={tech.frontmatter.alt}>
          <div
            className="container-fluid"
            dangerouslySetInnerHTML={{ __html: tech.html }}
          />
        </Section>
      </>
    </DefaultLayout>
  );
};

export default IndexPage;
