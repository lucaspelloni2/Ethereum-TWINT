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
    const url_second = '&startblock=0&endblock=99999999&sort=desc&apikey=';

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
                  <th>Status</th>
                  <th>To</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {this.state.transactions.map(transaction => {
                  return (
                    <tr key={transaction.hash}>
                      {<td>{transaction.hash.substring(0, 10)}</td>}
                      {<td>{transaction.txreceipt_status}</td>}
                      {<td>{transaction.to.substring(0, 10)}</td>}
                      {<td>{this.props.web3.utils.fromWei(transaction.value, 'ether')}</td>}
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
