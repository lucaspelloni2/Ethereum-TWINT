import React from 'react';
import {
  Card, CardBody, CardFooter, CardHeader, CardTitle, Col, DropdownItem, DropdownMenu, DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";
import CardCategory from "../CardElements/CardCategory";
import Stats from "../Stats/Stats";
import { Bar} from 'react-chartjs-2';
import {dashboard24HoursPerformanceChart} from 'variables/charts.jsx';;
class DayChart extends React.Component{

  render() {

    return (
      <Col xs={12} md={4}>
        <Card className="card-chart">
          <CardHeader>
            <CardCategory>Last 24h</CardCategory>
            <CardTitle>Performance 24 Hours</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="chart-area">
              <Bar data={dashboard24HoursPerformanceChart.data} options={dashboard24HoursPerformanceChart.options} />
            </div>
          </CardBody>
          <CardFooter>
            <Stats>
              {[
                { i: "now-ui-icons ui-2_time-alarm", t: "Last 7 days"}
              ]}
            </Stats>
          </CardFooter>
        </Card>
      </Col>
    )
  }
}

export default DayChart;

