import React from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Label,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
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
      amount: '0.00',
      modal: false,
      addedAccount: {
        name: null,
        address: null
      }
    };

    this.toggle = this.toggle.bind(this);
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
      to: this.state.selectedAccount.value.address,
      value: this.state.web3.utils.toWei(this.state.amount, 'ether')
    });
    console.log('this address ', this.state.selectedAccount.address);
    console.log(this.state.account);
  }

  handleAccountChange(e) {
    this.setState({selectedAccount: e});
    console.log(this.state.selectedAccount);
  }

  handleAmountChange(e) {
    this.setState({amount: e.target.value});
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleAddName(e) {
    let addedAccount = Object.assign({}, this.state.addedAccount);
    addedAccount.name = e.target.value;
    this.setState({addedAccount: addedAccount});
  }

  handleAddAddress(e) {
    let addedAccount = Object.assign({}, this.state.addedAccount);
    addedAccount.address = e.target.value;
    this.setState({addedAccount: addedAccount});

    console.log(this.state.addedAccount);
  }

  render() {
    return (
      <div>
        <PanelHeader size="sm" />
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
                    options={AddressBook.getAccounts().map(obj => ({
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
                <CardHeader>Address Book</CardHeader>
                <CardBody>
                  <Label>
                    Your Address Book{' '}
                    <i className="now-ui-icons business_badge" />
                  </Label>
                  <div style={{overflow: 'scroll', maxHeight: 220}}>
                    <Table responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Name</th>
                          <th>Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {AddressBook.getAccounts().map(account => {
                          return (
                            <tr key={account.address}>
                              {<td>{account.name}</td>}
                              {<td>{account.address}</td>}
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                  <div style={{marginTop: 20}}>
                    <Button
                      color={'primary'}
                      onClick={() => {
                        this.toggle();
                      }}
                    >
                      Add a new address
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          // className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Add new account</ModalHeader>
          <ModalBody>
            <div>
              <Label for="addName">Name</Label>
              <Input
                placeholder="name"
                id="addName"
                type="text"
                onChange={this.handleAddName.bind(this)}
              />
            </div>
            <div>
              <Label for="addAddress">Address</Label>
              <Input
                placeholder="address"
                id="addAddress"
                type="text"
                onChange={this.handleAddAddress.bind(this)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={() => {
                AddressBook.addAccount(this.state.addedAccount);
                this.toggle();
              }}
            >
              Save account
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default FullScreenMap;
