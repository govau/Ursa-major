import React, { useState, useLayoutEffect } from "react";
import { Link } from "gatsby";
import SEO from "../components/seo";
import DefaultLayout from "../components/layouts/default-layout";
import { useStaticQuery, graphql } from "gatsby";
import Section from "../components/layouts/section";

interface Browser {
  browser: Array<{ agency: String }>;
}

const IndexPage = () => {
  const [state, setstate] = useState<Browser | undefined>(undefined);

  useLayoutEffect(() => {
    fetch(`${process.env.GATSBY_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `{browser {agency}}`,
      }),
    })
      .then((r) => r.json())
      .then(({ errors, data }) => {
        if (errors) {
        } else {
          setstate(data);
        }
      });
  }, []);

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

  return (
    <DefaultLayout>
      <>
        <SEO title="Home" />
        <Section alt={true}>
          <>
            <div
              className="container-fluid"
              dangerouslySetInnerHTML={{ __html: hero.html! }}
            />
            <p>{state && state.browser[0].agency}</p>
          </>
        </Section>
        <Section>
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
