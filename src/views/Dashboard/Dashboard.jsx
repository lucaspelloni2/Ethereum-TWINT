import React from 'react';
import {
  Card, CardHeader, CardBody, CardFooter, CardTitle, Row, Col,
  Table, ButtonGroup, Button,
} from 'reactstrap';
import { Line } from 'react-chartjs-2';
import {
    PanelHeader, Stats, CardCategory, Tasks
} from 'components';

import {
    dashboardPanelChart,
    dashboardShippedProductsChart,
    dashboardAllProductsChart,
    dashboard24HoursPerformanceChart
} from 'variables/charts.jsx';

import { tasks } from 'variables/general.jsx';
import MonthChart from "../../components/MonthChart/MonthChart";
import YearChart from "../../components/YearChart/YearChart";
import DayChart from "../../components/DayChart/DayChart";

class Dashboard extends React.Component{

    constructor(props) {
      super(props);
      this.state = {
        crypto: 'ETH'
      };
    }



      changeCrypto(crypto) {
      let currency;
      switch (crypto) {
        case 'ETH':
          currency = 'ETH';
          break;
        case 'BTC':
          currency = 'BTC';
          break;
        default:
          currency = 'ETH';
      }
      this.setState({
        crypto: currency
      });
      }

    render(){

        return (
            <div>
                <PanelHeader
                    size="lg"
                    content={
                        <Line data={dashboardPanelChart.data} options={dashboardPanelChart.options}/>
                    }
                />
                <div className="content">
                  <Row>
                    <Col xs={12} md={6}>
                    <ButtonGroup>
                      <Button onClick={() => this.changeCrypto('ETH')}>Ethereum</Button>
                      <Button onClick={() => this.changeCrypto('BTC')}>Bitcoin</Button>
                    </ButtonGroup>
                    </Col>
                  </Row>
                    <Row>
                       <MonthChart crypto={this.state.crypto}/>
                        <YearChart crypto={this.state.crypto}/>
                        <DayChart crypto={this.state.crypto}/>
                    </Row>
                    <Row>
                      <Col xs={12} md={6}>
                        <Card className="card-tasks">
                          <CardHeader>
                            <CardTitle>Tasks</CardTitle>
                            <p className="category">Crypto News</p>
                          </CardHeader>
                          <CardBody>
                            <Tasks tasks={tasks}/>
                          </CardBody>
                          <CardFooter>
                            <hr />
                            <Stats>
                                {[
                                    { i: "now-ui-icons loader_refresh spin", t: "Updated 3 minutes ago"}
                                ]}
                            </Stats>
                          </CardFooter>
                        </Card>
                      </Col>
                      <Col xs={12} md={6}>
                        <Card>
                          <CardHeader>
                            <CardTitle>Crypto Prices</CardTitle>
                            <p className="category">From Coinmarketcap</p>
                          </CardHeader>
                          <CardBody>
                            <Table responsive>
                              <thead className=" text-primary">
                                <tr>
                                  <th>Currency</th>
                                <th>Price</th>
                                <th>Last 24h</th>
                                <th className="text-right">Market Cap</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>todo</td>
                                  <td>todo</td>
                                  <td>todo</td>
                                  <td className="text-right">todo</td>
                                </tr>
                              </tbody>
                            </Table>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Dashboard;
