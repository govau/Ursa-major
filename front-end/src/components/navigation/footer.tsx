import React from "react";

import AUfooter, { AUfooterNav, AUfooterEnd } from "../../auds/react/footer";
import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby";

interface Props {}
interface FooterLinks {
  map(arg0: (item: any, i: number) => JSX.Element): React.ReactNode;
  items: Array<Object>;
}

const AuFooter: any = AUfooter;
const FooterNav: any = AUfooterNav;
const FooterEnd: any = AUfooterEnd;

const Footer: React.FC<Props> = () => {
  const data = useStaticQuery(graphql`
    query footerLinks {
      site {
        siteMetadata {
          title
          footerLinks {
            text
            link
          }
        }
      }
    }
  `);

  const Links: FooterLinks = data.site.siteMetadata.footerLinks;

  return (
    <>
      <div className="au-body au-body--dark">
        <AuFooter dark>
          <div className="container">
            <FooterNav>
              <div className="row">
                <div className="col-md-3 col-sm-6">
                  <h3 className="au-display-lg">Section</h3>
                  <ul className="au-link-list au-link-list--inline">
                    {Links.map((item: any, i: number) => (
                      <li key={i}>
                        <Link to={item.link}>{item.text}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FooterNav>
            <div className="row">
              <div className="col-sm-12">
                <FooterEnd>
                  <p>Footer text</p>
                  <p>
                    <small>
                      &copy; Commonwealth of Australia,{" "}
                      <a
                        href="https://github.com/govau/ursa-major/blob/master/LICENSE"
                        rel="external license"
                      >
                        MIT licensed
                      </a>
                    </small>
                  </p>
                </FooterEnd>
              </div>
            </div>
          </div>
        </AuFooter>
      </div>
    </>
  );
};

export default Footer;
