import React from 'react';
import {
  Card, CardBody, CardFooter, CardHeader, CardTitle, Col, DropdownItem, DropdownMenu, DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";
import CardCategory from "../CardElements/CardCategory";
import Stats from "../Stats/Stats";
import {Line} from 'react-chartjs-2';
import {dashboardShippedProductsChart} from 'variables/charts.jsx';
import {getPrices} from '../../services/cryptoCompareAPIService.js'
import MonthChartArea from "./MonthChartArea";

class MonthChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      lastMonthUnix: 0,
      chartPrices: []
    }
    ;
  }

  async componentDidMount() {
    let data = await getPrices(this.props.crypto, 30, 'day');
    this.pushIntoChart(data);
  }

  async componentDidUpdate() {
    let data = await getPrices(this.props.crypto, 30, 'day');
    this.pushIntoChart(data);
  }

  pushIntoChart(data) {
    let prices = [];
    let labels = [];
    data.Data.map(data => prices.push(data.close));
    data.Data.map(data => labels.push(new Date(data.time*1000).toLocaleDateString()));

    this.setState({
      chartPrices: prices,
      labels: labels,
      dateFrom: new Date(data.TimeFrom*1000).toLocaleDateString(),
      dateTo: new Date(data.TimeTo*1000).toLocaleDateString()
    });
  }

  render() {
    return (
      <Col xs={12} md={4}>
        <Card className="card-chart">
          <CardHeader>
            <CardCategory>Period: {this.state.dateFrom} - {this.state.dateTo}</CardCategory>
            <CardTitle>{this.props.crypto}</CardTitle>
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
            {this.state.chartPrices.length > 0 ? (
              <MonthChartArea chartPrices={this.state.chartPrices} labels={this.state.labels}/>) : null}
          </CardBody>
          <CardFooter>
            <Stats>
              {[
                {i: "now-ui-icons arrows-1_refresh-69", t: "Just Updated"}
              ]}
            </Stats>
          </CardFooter>
        </Card>
      </Col>
    )
  }
}

export default MonthChart;

