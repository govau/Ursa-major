import React, { useState } from "react";
import UniqueUsersLineGraph from "./total-unique-users";
import DeviceCategoryVisualisation from "./device-category";
import BrowserMonthly from "./browser-monthly";
import ScreenResVisualisation from "./screen-res";
import DeviceBrandVisualisation from "./device-brand";
import OperatingSysVersionVisualisation from "./operating-system-version";
import OperatingSystemVisualisation from "./operating-system";
import HourlyViewsVisualisation from "./hourly-views";
import { AUradio } from "../../auds/react/control-input";
import { AUfieldset, AUlegend } from "../../auds/react/form";

const AuFieldset: any = AUfieldset;

interface Props {
  isTabletOrMobile: boolean;
  chartView: boolean;
}

const AuRadio: any = AUradio;

const DashboardHomePage: React.FC<Props> = ({ isTabletOrMobile }) => {
  const initialState: { chartView: boolean } = { chartView: true };

  const [state, setstate] = useState(initialState);

  const headingStyle: React.CSSProperties | undefined = { fontWeight: 400 };
  return (
    <>
      <div className="container-fluid au-body">
        <div className="row">
          <div className="col-md-12">
            <AuFieldset>
              <AUlegend>
                <h3 className="au-display-md" style={headingStyle}>
                  View as:
                </h3>
              </AUlegend>
              <AuRadio
                label="Chart"
                name="radio-ex"
                id="radio-chart"
                checked={state.chartView}
                onChange={() => setstate(() => ({ chartView: true }))}
                defaultChecked
              />
              <AuRadio
                label="Table"
                name="radio-ex"
                id="radio-table"
                checked={!state.chartView}
                onChange={() => setstate(() => ({ chartView: false }))}
              />
            </AuFieldset>
          </div>
        </div>
      </div>
      <div className="container-fluid au-body" id="dashboard">
        <div className="row">
          <div className="col-md-6">
            <UniqueUsersLineGraph
              isTabletOrMobile={isTabletOrMobile}
              chartView={state.chartView}
            />
          </div>
          <div className="col-md-6">
            <HourlyViewsVisualisation
              isTabletOrMobile={isTabletOrMobile}
              chartView={state.chartView}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <DeviceCategoryVisualisation
              isTabletOrMobile={isTabletOrMobile}
              chartView={state.chartView}
            />
          </div>
          <div className="col-md-6">
            <ScreenResVisualisation
              isTabletOrMobile={isTabletOrMobile}
              chartView={state.chartView}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <OperatingSystemVisualisation
              isTabletOrMobile={isTabletOrMobile}
              chartView={state.chartView}
            />
          </div>
          <div className="col-md-6">
            <OperatingSysVersionVisualisation
              isTabletOrMobile={isTabletOrMobile}
              chartView={state.chartView}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <DeviceBrandVisualisation
              isTabletOrMobile={isTabletOrMobile}
              chartView={state.chartView}
            />
          </div>
          <div className="col-md-6">
            <BrowserMonthly
              isTabletOrMobile={isTabletOrMobile}
              chartView={state.chartView}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHomePage;
