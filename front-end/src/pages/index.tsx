import React, { useState, useEffect } from "react";
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

  let initialState: any = { token: "invalid" };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let resStatus: number | string = "";
    const data = { username: process.env.GATSBY_API_CREDS };

    fetch(`${process.env.GATSBY_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .catch((error: any) => console.error("Error:: " + error))
      .then((res: any) => {
        resStatus = res.status;
        return res.json();
      })
      .then((response) => {
        if (resStatus === 200) {
          const token = response.token;
          localStorage.setItem("token", "bearer " + token);
          setState({ token });
        } else {
          setState({ token: "invalid" });
        }
      });
  }, state.token);

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
        {state.token !== "invalid" && (
          <>
            <Section>
              <>
                <UniqueUsersLineGraph
                  isTabletOrMobile={isTabletOrMobile}
                  token={state.token}
                />
              </>
            </Section>
            <Section>
              <>
                <DeviceCategoryVisualisation
                  isTabletOrMobile={isTabletOrMobile}
                  token={state.token}
                />
              </>
            </Section>
          </>
        )}
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
