import React, { useState, useLayoutEffect, useEffect } from "react";
import SEO from "../components/seo";
import DefaultLayout from "../components/layouts/default-layout";
import { useStaticQuery, graphql } from "gatsby";
import Section from "../components/layouts/section";
import { useFetch } from "../components/hooks/use-fetch";
import { useMediaQuery } from "react-responsive";
import { AxisDomain } from "recharts";
import { number } from "prop-types";
import LineGraph from "../components/visualisations/line-chart";
import UniqueUsersLineGraph from "../components/blocks/total-unique-users";

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
        <Section>
          <>
            <UniqueUsersLineGraph />
          </>
        </Section>
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
