import React from "react";
import SEO from "../components/seo";
import DefaultLayout from "../components/layouts/default-layout";
import { useStaticQuery, graphql } from "gatsby";
import Section from "../components/layouts/section";
import UniqueUsersLineGraph from "../components/blocks/total-unique-users";
import DeviceCategoryVisualisation from "../components/blocks/device-category";
import { useMediaQuery } from "react-responsive";

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
        <Section alt={hero.frontmatter.alt}>
          <>
            <div
              className="container-fluid"
              dangerouslySetInnerHTML={{ __html: hero.html! }}
            />
          </>
        </Section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <Section>
                <>
                  <UniqueUsersLineGraph isTabletOrMobile={isTabletOrMobile} />
                </>
              </Section>
            </div>
            <div className="col-md-6">
              <Section>
                <>
                  <DeviceCategoryVisualisation
                    isTabletOrMobile={isTabletOrMobile}
                  />
                </>
              </Section>
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
