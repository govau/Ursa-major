import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import AUheader, { AUheaderBrand } from "../../auds/react/header";

interface Props {
  siteTitle: string;
}

const AUHeader: any = AUheader;
const Brand: any = AUheaderBrand;

const Header: React.FC<Props> = ({ siteTitle }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "header-logo-agov.png" }) {
        childImageSharp {
          fluid {
            src
          }
        }
      }
    }
  `);

  return (
    <>
      <AUHeader dark>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-9">
              <Brand
                title={
                  <>
                    {siteTitle} <span className="header__badge"> alpha</span>
                  </>
                }
                subline="The analytics dashboard for gov.au services"
                link="/"
                brandImage={data.placeholderImage.childImageSharp.fluid.src}
                brandImageAlt="Insert alternate text here"
              />
            </div>
          </div>
        </div>
      </AUHeader>
    </>
  );
};

export default Header;
