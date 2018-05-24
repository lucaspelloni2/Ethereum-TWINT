import React from 'react';
import {Card, CardBody, CardFooter, CardHeader, CardTitle, Col} from "reactstrap";
import CardCategory from "../CardElements/CardCategory";
import Stats from "../Stats/Stats";
import {getPrices} from '../../services/cryptoCompareAPIService.js'
import { Bar} from 'react-chartjs-2';
import {dashboard24HoursPerformanceChart} from 'variables/charts.jsx';
import DayChartArea from "./DayChartArea";

class DayChart extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      chartPrices: [],
      crypto: ''
    };
  }

  async componentDidMount() {
    let data = await getPrices(this.props.crypto, 24, 'hour');
    this.pushIntoChart(data);
  }

  async componentWillReceiveProps(nextProps) {
    if(nextProps.crypto !== this.state.crypto) {
      let data = await getPrices(nextProps.crypto, 30, 'day');
      this.pushIntoChart(data, nextProps.crypto);
    }
  }

  pushIntoChart(data, crypto) {
    let prices = [];
    let labels = [];
    let differences = [];

    data.Data.map(data => prices.push(data.close));
    data.Data.map(data => labels.push(new Date(data.time*1000).toLocaleTimeString()));

    for(let i = 1; i < prices.length; i++) {
      differences[i] = (prices[i-1] - prices[i]).toFixed(2);
    }
    labels = labels.slice(1,labels.length);

    this.setState({
      crypto : crypto,
      chartPrices: differences,
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
            <CardCategory>Last 24h</CardCategory>
            <CardTitle>Performance 24 Hours</CardTitle>
          </CardHeader>
          <CardBody>
            <DayChartArea chartPrices={this.state.chartPrices} labels={this.state.labels}/>
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

