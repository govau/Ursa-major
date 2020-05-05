import React from "react";
import UniqueUsersLineGraph from "./total-unique-users";
import DeviceCategoryVisualisation from "./device-category";
import BrowserMonthly from "./browser-monthly";
import ScreenResVisualisation from "./screen-res";
import DeviceBrandVisualisation from "./device-brand";
import OperatingSysVersionVisualisation from "./operating-system-version";
import OperatingSystemVisualisation from "./operating-system";

interface Props {
  isTabletOrMobile: Boolean;
}

const DashboardHomePage: React.FC<Props> = ({ isTabletOrMobile }) => {
  return (
    <>
      <div className="container-fluid au-body" id="dashboard">
        <div className="row">
          <div className="col-md-6">
            <UniqueUsersLineGraph isTabletOrMobile={isTabletOrMobile} />
          </div>
          <div className="col-md-6">
            <BrowserMonthly isTabletOrMobile={isTabletOrMobile} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <DeviceCategoryVisualisation isTabletOrMobile={isTabletOrMobile} />
          </div>
          <div className="col-md-6">
            <ScreenResVisualisation isTabletOrMobile={isTabletOrMobile} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <OperatingSystemVisualisation isTabletOrMobile={isTabletOrMobile} />
          </div>
          <div className="col-md-6">
            <OperatingSysVersionVisualisation
              isTabletOrMobile={isTabletOrMobile}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <DeviceBrandVisualisation isTabletOrMobile={isTabletOrMobile} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHomePage;
