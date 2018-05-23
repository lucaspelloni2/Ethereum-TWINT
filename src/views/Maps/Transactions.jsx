import React from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  Table,
  CardBody,
  Button,
  Input,
  Label
} from 'reactstrap';
import {PanelHeader} from 'components';
import Web3 from 'web3';
import AddressBook from './AddressBook';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Transactions extends React.Component {
  constructor() {
    super();

    this.state = {
      transactions: []
    };
  }

  async componentDidMount() {
    this.interval = setInterval(async () => {
      this.getTransactions();
    }, 1500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getTransactions() {
    const API_KEY_TOKEN = 'F64HG3A3WTVCV7W5BD77FPZ6ETRH29X3WG';
    const url_first =
      'http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=';
    const url_second = '&sort=desc&apikey=';    //&startblock=0&endblock=99999999

    console.log(this.props.account.ethAddress);
    let address = this.props.account.ethAddress; // WOOOOW LOOK AT THAT

    let url = url_first + address + url_second + API_KEY_TOKEN;

    let request = new XMLHttpRequest();

    let self = this;
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        let transactions = response.result;
        self.updateTransactions(transactions);
      }
    };

    request.open('GET', url, true);
    request.send();
  }

  updateTransactions(transactions) {
    this.setState({
      transactions: transactions
    });
  }

  getDateTime(unix_timestamp) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(unix_timestamp*1000);

    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();

    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    // let seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    return day + "." + month + "." + year + " " + hours + ':' + minutes.substr(-2); // + ':' + seconds.substr(-2);
  }

  render() {
    return (
      <Card>
        <CardHeader>My Transactions</CardHeader>
        <CardBody>
          <div style={{overflow: 'scroll', maxHeight: 220}}>
            <Table responsive>
              <thead className="text-primary">
                <tr>
                  <th>TxHash</th>
                  <th>Age</th>
                  <th>Status</th>
                  <th>Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {this.state.transactions.map(transaction => {
                  return (
                    <tr key={transaction.hash}>
                      {<td>{transaction.hash.substring(0, 10)}</td>}
                      {<td>{this.getDateTime(transaction.timeStamp)}</td>}
                      {<td>{transaction.txreceipt_status}</td>}
                      {<td>{transaction.from.substring(0, 10)}</td>}
                      {<td>{transaction.to.substring(0, 10)}</td>}
                      {<td>{this.props.web3.utils.fromWei(transaction.value, 'ether')}</td>}
                      {console.log(transaction)}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>{' '}
        </CardBody>
      </Card>
    );
  }
}

export default Transactions;
