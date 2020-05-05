import React from "react";
import SEO from "../components/seo";
import DefaultLayout from "../components/layouts/default-layout";
import { useStaticQuery, graphql } from "gatsby";
import Section from "../components/layouts/section";
import UniqueUsersLineGraph from "../components/blocks/total-unique-users";
import DeviceCategoryVisualisation from "../components/blocks/device-category";
import { useMediaQuery } from "react-responsive";
import Hero from "../components/layouts/hero";
import BrowserMonthly from "../components/blocks/browser-monthly";

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

  let tech = allMarkdownRemark.nodes.find(
    (page: any) => page.frontmatter.id === "tech"
  );

  let hero = allMarkdownRemark.nodes.find(
    (page: any) => page.frontmatter.id === "hero"
  );

  const isTabletOrMobile: Boolean = useMediaQuery({
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
        <div className="container-fluid au-body">
          <div className="row">
            <div className="col-md-6">
              <UniqueUsersLineGraph isTabletOrMobile={isTabletOrMobile} />
            </div>
            <div className="col-md-6">
              <DeviceCategoryVisualisation
                isTabletOrMobile={isTabletOrMobile}
              />
            </div>
            <div className="col-md-12">
              <BrowserMonthly isTabletOrMobile={isTabletOrMobile} />
            </div>
          </div>
        </div>
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
