import React from "react";
import AUheader, { AUheaderBrand } from "../../auds/react/header";
import AUpageAlert from "../../auds/react/page-alerts"

interface Props {
  siteTitle: string;
}

const AUHeader: any = AUheader;
const PageAlert: any = AUpageAlert;
const Brand: any = AUheaderBrand;

const Header: React.FC<Props> = ({ siteTitle }) => {
  return (
    <>
      <AUHeader dark>
        <div className="container-fluid">
          <div className="row">
            <PageAlert as="warning" className={`decommission-banner`}>
              <p>analytics.service.gov.au has been decommissioned and will be taken down from 19 June 2022. For further information please contact <a href="mailto:info@dta.gov.au">info@dta.gov.au</a>.</p>
            </PageAlert>
          </div>
          <div className="row">
            <div className="col-md-9">
              <Brand
                title={siteTitle}
                subline="The analytics dashboard for gov.au services"
                link="/"
                brandImage={"../../header-logo-agov.png"}
                brandImageAlt="The Australian Government Coat of Arms"
              />
            </div>
          </div>
        </div>
      </AUHeader>
    </>
  );
};

export default Header;
