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

  const barGraphData = useFetch({
    initialState: "",
    query: "{total_unique {total_unique_users_scale visit_date}}",
  });

  const isTabletOrMobile: Boolean = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const initialState: any = {};
  const [state, setstate] = useState(initialState);

  useLayoutEffect((): any => {
    let count: number = 0;
    let datePoint: string = "";
    let mobileData: Array<Object> = [];
    let xTicks: Array<Object> = [];
    var i: number = 0;

    if (!barGraphData.loading) {
      for (i = 0; i < barGraphData.data.total_unique.length; i++) {
        count =
          +barGraphData.data.total_unique[i].total_unique_users_scale + +count;
        if (i % 13 === 0) {
          datePoint = barGraphData.data.total_unique[i].visit_date;
          i % 2 && xTicks.push(datePoint);
          mobileData.push({
            total_unique_users_scale: count,
            visit_date: datePoint,
          });
          count = 0;
        }
      }
    }
    setstate({ data: mobileData, xTicks });
    console.log(state);
  }, [barGraphData.loading]);

  const yDomain: [AxisDomain, AxisDomain] = isTabletOrMobile
    ? [0, 350]
    : [10, 30];
  const props = {
    data: isTabletOrMobile ? state.data : barGraphData.data.total_unique,
    yKey: "total_unique_users_scale",
    dataKey: "visit_date",
    yDomain,
    type: number,
    yTicks: isTabletOrMobile ? [100, 200, 300] : [10, 20, 30, 40],
    xTicks: isTabletOrMobile
      ? state.xTicks
      : ["2020-02-01", "2020-03-01", "2020-04-01"],
    xTickSize: 10,
    xTickMargin: 10,
    Heading: {
      text: "Total unique users, last 90 days",
      className: "au-display-md bar-chart-title",
      level: "h3",
    },
    fill: "#726fb8",
    dot: isTabletOrMobile ? true : false,
  };

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
            <div className="container-fluid">
              {!barGraphData.loading && <LineGraph {...props} />}
            </div>
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
