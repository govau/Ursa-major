import React from "react"

import AUfooter, { AUfooterNav, AUfooterEnd } from "../auds/react/footer"

interface Props {}

const AuFooter: any = AUfooter
const FooterNav: any = AUfooterNav
const FooterEnd: any = AUfooterEnd

const Footer: React.FC<Props> = () => {
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
                    <li>
                      <a href="#">Link 1</a>
                    </li>
                    <li>
                      <a href="#">Link 2</a>
                    </li>
                    <li>
                      <a href="#">Link 3</a>
                    </li>
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
                        href="https://github.com/govau/design-system-components/blob/master/LICENSE.md"
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
  )
}

export default Footer
