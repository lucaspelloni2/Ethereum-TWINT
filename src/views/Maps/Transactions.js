import React from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
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

  }

  getTransactions() {
    let request = new XMLHttpRequest();
    const API_KEY_TOKEN = 'F64HG3A3WTVCV7W5BD77FPZ6ETRH29X3WG';
    const url_first = 'http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=';
    const url_second = '&startblock=0&endblock=99999999&sort=asc&apikey=';
    let address = this.props.account.ethAddress;
    let url = url_first + address + url_second + API_KEY_TOKEN;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        console.log(response);
      }
    };

    request.open("GET", url, true);
    request.send();

  }

  render() {
    return (
              <Card>
                <CardHeader>My Transactions</CardHeader>

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
