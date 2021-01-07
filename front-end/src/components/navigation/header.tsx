import React from "react";
import AUheader, { AUheaderBrand } from "../../auds/react/header";

interface Props {
  siteTitle: string;
}

const AUHeader: any = AUheader;
const Brand: any = AUheaderBrand;

const Header: React.FC<Props> = ({ siteTitle }) => {
  return (
    <>
      <AUHeader dark>
        <div className="container-fluid">
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
