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

class FullScreenMap extends React.Component {
  constructor() {
    super();

    let web3 = new Web3(Web3.givenProvider);

    this.state = {
      account: {
        ethAddress: '',
        ethBalance: 0
      },
      web3: web3,
      addresses: [],

      selectedAccount: 'default',
      amount: '0.00'
    };
  }

  async componentDidMount() {
    let addresses = await this.getUserAddresses();
    let address = addresses[0];
    let balance = await this.state.web3.eth.getBalance(address);

    let account = Object.assign({}, this.state.account);
    account.ethAddress = address;
    account.ethBalance = balance;
    this.setState({
      account: account,
      addresses: addresses
    });
    console.log(this.state);
  }

  getUserAddresses() {
    return this.state.web3.eth
      .getAccounts()
      .then(addresses => {
        return addresses;
      })
      .catch(err => {
        console.log('error getting address ' + err);
      });
  }

  transferMoney() {
    this.state.web3.eth.sendTransaction({
      from: this.state.account.ethAddress,
      to: this.state.selectedAccount.address,
      value: this.state.web3.utils.toWei(this.state.amount, 'ether')
    });
    console.log('this address ', this.state.selectedAccount.address);
    console.log(this.state.account);
  }

  handleAccountChange(obj) {
    this.setState({selectedAccount: obj});
    console.log(this.state.selectedAccount);
  }

  handleAmountChange(e) {
    this.setState({amount: e.target.value});
  }

  render() {
    return (
      <div>
        <PanelHeader size="sm"/>
        <div className="content">
          <Row>
            <Col xs={6}>
              <Card>
                <CardHeader>Send your money</CardHeader>
                <CardBody>
                  <Label for={'address'}>Address</Label>
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
                  <Label for={'amount'}>Amount (in ETH)</Label>
                  <Input
                    id="amount"
                    placeholder={'Insert your amount'}
                    onChange={this.handleAmountChange.bind(this)}
                  />
                  <Button
                    onClick={() => {
                      this.transferMoney();
                    }}
                  >
                    Send money
                  </Button>
                </CardBody>
              </Card>
            </Col>

            <Col xs={6}>
              <Card>
                <CardHeader>
                  Search an address{' '}
                  <i className="now-ui-icons business_badge"/>
                </CardHeader>
                <CardBody>
                  <Label>Select an address from your book </Label>
                  <Input type="select" name="select" id="exampleSelect">
                    {AddressBook.map(obj => {
                      return (
                        <option id={obj.address} value={obj}>
                          {obj.name} ({obj.address})
                        </option>
                      );
                    })}
                  </Input>
                  <Button>Add a new address</Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default FullScreenMap;
