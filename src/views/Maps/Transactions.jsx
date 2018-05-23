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
    }
  }

  async componentDidMount() {
    this.interval = setInterval(async () => {
      this.getTransactions();
    }, 200);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getTransactions() {
    const API_KEY_TOKEN = 'F64HG3A3WTVCV7W5BD77FPZ6ETRH29X3WG';
    const url_first = 'http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=';
    const url_second = '&startblock=0&endblock=99999999&sort=desc&apikey=';

    let address = '0x8745BE2c582BCFC50ACF9d2C61CadEd65a4E3825'; //TODO lucas: integrate this.props.account.ethAddress;

    let url = url_first + address + url_second + API_KEY_TOKEN;


    let request = new XMLHttpRequest();

    let self = this;
    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        let transactions = response.result;
        self.updateTransactions(transactions);
      }
    };

    request.open("GET", url, true);
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
                </div>

{/*                <CardBody>
                  <Label for={'amount'}>Amount (in ETH)</Label>
                  <Input
                    id="amount"
                    placeholder={'Insert your amount'}
                    onChange={this.handleAmountChange.bind(this)}
                  />
                  <Label for={'address'}>To:</Label>
                  <Select
                    name="form-field-name"
                    value={
                      this.state.selectedAccount
                        ? this.state.selectedAccount
                        : null
                    }
                    onChange={this.handleAccountChange.bind(this)}
                    options={AddressBook.map(obj => ({
                      label: obj.name,
                      value: obj
                    }))}
                  />
                  <Button
                    onClick={() => {
                      this.transferMoney();
                    }}
                  >
                    Send money
                  </Button>
                </CardBody>
                */}
              </Card>
    );
  }
}

export default Transactions;
