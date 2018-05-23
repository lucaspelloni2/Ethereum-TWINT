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
import Transactions from './Transactions';
import NotificationAlert from 'react-notification-alert';

class FullScreenMap extends React.Component {
  constructor() {
    super();

    let web3 = new Web3(Web3.givenProvider);
    const contract = new web3.eth.Contract(
      [
        {
          "constant": false,
          "inputs": [
            {
              "name": "reqId",
              "type": "uint256"
            }
          ],
          "name": "fulfillRequest",
          "outputs": [],
          "payable": true,
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "value",
              "type": "uint256"
            },
            {
              "name": "debitor",
              "type": "address"
            },
            {
              "name": "reason",
              "type": "bytes32"
            }
          ],
          "name": "requestMoneyFrom",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "reqId",
              "type": "uint256"
            }
          ],
          "name": "withdrawRequest",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "address"
            },
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "creditorReq",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "address"
            },
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "debitorReq",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "creditor",
              "type": "address"
            }
          ],
          "name": "getRequestsByCreditor",
          "outputs": [
            {
              "name": "reqIds",
              "type": "uint256[]"
            },
            {
              "name": "values",
              "type": "uint256[]"
            },
            {
              "name": "creditors",
              "type": "address[]"
            },
            {
              "name": "debitors",
              "type": "address[]"
            },
            {
              "name": "states",
              "type": "uint8[]"
            },
            {
              "name": "reasons",
              "type": "bytes32[]"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "debitor",
              "type": "address"
            }
          ],
          "name": "getRequestsByDebitor",
          "outputs": [
            {
              "name": "reqIds",
              "type": "uint256[]"
            },
            {
              "name": "values",
              "type": "uint256[]"
            },
            {
              "name": "creditors",
              "type": "address[]"
            },
            {
              "name": "debitors",
              "type": "address[]"
            },
            {
              "name": "states",
              "type": "uint8[]"
            },
            {
              "name": "reasons",
              "type": "bytes32[]"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "requests",
          "outputs": [
            {
              "name": "id",
              "type": "uint256"
            },
            {
              "name": "value",
              "type": "uint256"
            },
            {
              "name": "creditor",
              "type": "address"
            },
            {
              "name": "debitor",
              "type": "address"
            },
            {
              "name": "state",
              "type": "uint8"
            },
            {
              "name": "reason",
              "type": "bytes32"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        }
      ],
      '0x3e75d99dc7b3857caabc9f98ca3bd715f758c4ff'
    );

    this.state = {
      account: {
        ethAddress: null,
        ethBalance: 0
      },
      web3: web3,
      addresses: [],

      selectedAccount: null,
      amount: '0.00',

      modal: false,
      addedAccount: {
        name: null,
        address: null
      },

      accounts: AddressBook.getAccounts(),
      contract: contract
    };

    this.toggle = this.toggle.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.notify = this.notify.bind(this);
  }

  onDismiss() {}

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
  }

  handleAccountChange(obj) {
    this.setState({selectedAccount: obj});
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
  }

  fetchAccounts() {
    this.setState({accounts: AddressBook.getAccounts()});
  }

  notify(color, place, message) {
    let type;
    switch (color) {
      case 1:
        type = 'primary';
        break;
      case 2:
        type = 'success';
        break;
      case 3:
        type = 'danger';
        break;
      case 4:
        type = 'warning';
        break;
      case 5:
        type = 'info';
        break;
      default:
        break;
    }
    let options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>{message}</div>
        </div>
      ),
      type: type,
      icon: 'now-ui-icons ui-1_bell-53',
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
  }

  render() {
    return (
      <div>
        <NotificationAlert ref="notificationAlert" />
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={6}>
              <Card>
                <CardHeader>Send your money</CardHeader>
                <CardBody>
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
                    options={this.state.accounts.map(obj => ({
                      label: obj.name,
                      value: obj
                    }))}
                  />
                  <Button
                    color={'primary'}
                    disabled={
                      this.state.amount === '0.00' ||
                      this.state.selectedAccount === 'default'
                    }
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
                  Your Address Book{' '}
                  <i className="now-ui-icons business_badge" /></CardHeader>
                <CardBody>
                  <div style={{overflow: 'scroll', maxHeight: 220}}>
                    <Table responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Name</th>
                          <th>Address</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.accounts.map(account => {
                          return (
                            <tr key={account.address}>
                              {<td>{account.name}</td>}
                              {<td>{account.address}</td>}
                              {
                                <td>
                                  <i
                                    style={{cursor: 'pointer'}}
                                    className="now-ui-icons ui-1_simple-remove"
                                    onClick={() => {
                                      AddressBook.removeAccount(account);
                                      this.fetchAccounts();
                                    }}
                                  />{' '}
                                </td>
                              }
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
          <Row>
            <Col xs={12}>
              {this.state.account.ethAddress !== null ? (
                <Transactions
                  web3={this.state.web3}
                  account={this.state.account}
                />
              ) : null}
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
                this.fetchAccounts();
                this.toggle();
                this.notify(
                  2,
                  'tr',
                  <div>
                    A new user called {this.state.addedAccount.name} has been
                    successfully added
                  </div>
                );
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
