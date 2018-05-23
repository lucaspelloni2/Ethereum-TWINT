import React from 'react';
import {
  Card, CardBody, CardFooter, CardHeader, CardTitle, Col, DropdownItem, DropdownMenu, DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";
import CardCategory from "../CardElements/CardCategory";
import Stats from "../Stats/Stats";
import { Line } from 'react-chartjs-2';
import {dashboardShippedProductsChart, dashboardAllProductsChart} from 'variables/charts.jsx';;
class YearChart extends React.Component{

  render() {

    return (
      <Col xs={12} md={4}>
        <Card className="card-chart">
          <CardHeader>
            <CardCategory>Current Year </CardCategory>
            <CardTitle>Performance YTD </CardTitle>
            <UncontrolledDropdown>
              <DropdownToggle className="btn-round btn-simple btn-icon" color="default">
                <i className="now-ui-icons loader_gear"></i>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem>Something else here</DropdownItem>
                <DropdownItem className="text-danger">Remove data</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </CardHeader>
          <CardBody>
            <div className="chart-area">
              <Line data={dashboardAllProductsChart.data} options={dashboardAllProductsChart.options} />
            </div>
          </CardBody>
          <CardFooter>
            <Stats>
              {[
                { i: "now-ui-icons arrows-1_refresh-69", t: "Just Updated"}
              ]}
            </Stats>
          </CardFooter>
        </Card>
      </Col>
    )
  }
}

export default YearChart;

