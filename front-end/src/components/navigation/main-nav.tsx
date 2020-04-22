import React from "react";
import AUmainNav, { AUmainNavContent } from "./auds/main-nav";
import { useStaticQuery, graphql } from "gatsby";

interface Props {}

interface MenuItems {
  map(
    arg0: (menuItem: any) => { text: any; link: any; active: boolean }
  ): MenuItems;
  items: Array<Object>;
}

const Nav: any = AUmainNav;
const NavContent: any = AUmainNavContent;

const MainNav = () => {
  const data = useStaticQuery(graphql`
    query SiteQuery {
      site {
        siteMetadata {
          title
          menuLinks {
            text
            link
          }
        }
      }
    }
  `);
  const Links: MenuItems = data.site.siteMetadata.menuLinks;
  const mainNavItems: MenuItems = Links.map((menuItem: any) => ({
    text: menuItem.text,
    link: menuItem.link,
    active: window.location.pathname === menuItem.link,
  }));

  return (
    <Nav dark>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <NavContent items={mainNavItems} />
          </div>
        </div>
      </div>
    </Nav>
  );
};

export default MainNav;
