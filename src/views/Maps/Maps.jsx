import React from 'react';
import {
  Alert,
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
import ContractProps from './ContractProps'
import OpenRequests from "./OpenRequests";
import {ClipLoader} from "react-spinners";

let web3 = window.web3;

class FullScreenMap extends React.Component {
  constructor() {
    super();
    let web3Instance = null;
    if (typeof web3 !== 'undefined') {
      this.web3Provider = web3.currentProvider;
      web3Instance = new Web3(web3.currentProvider);
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3Instance = new Web3(this.web3Provider);
    }

    const contract = new web3Instance.eth.Contract(
      ContractProps.CONTRACT_ABI,
      ContractProps.CONTRACT_ADDRESS
    );

    this.state = {
      account: {
        ethAddress: null,
        ethBalance: 0
      },
      web3: web3Instance,
      addresses: [],

      selectedAccount: null,
      amount: '0.00',

      modal: false,
      addedAccount: {
        name: null,
        address: null
      },

      accounts: AddressBook.getAccounts(),
      contract: contract,
      selectedRequestAccount: null,
      requestAmount: '0.00',
      reason: '',

      requests: [],
      requestMoneyPending: false,
    };

    this.toggle = this.toggle.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.notify = this.notify.bind(this);
  }

  onDismiss() {
  }

  async componentDidMount() {
    let addresses = await this.getUserAddresses();
    this.setState({
      addresses: addresses
    });

    if (addresses.length > 0) {
      let address = addresses[0];
      let balance = await this.state.web3.eth.getBalance(address);


      let account = Object.assign({}, this.state.account);
      account.ethAddress = address;
      account.ethBalance = balance;

      let requests = await this.getAllRequests(address);
      let filteredRequests = this.filterRequests(requests);

      console.log(requests);
      this.setState({
        account: account,
        requests: filteredRequests
      });

      this.interval = setInterval(async () => {
        balance = await this.state.web3.eth.getBalance(address);
        account.ethBalance = balance;

        requests = await this.getAllRequests(address);
        filteredRequests = this.filterRequests(requests);

        this.setState({
          account: account,
          requests: filteredRequests
        });
      }, 800);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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

  requestMoney() {
    this.setState({
      requestMoneyPending: true
    });
    this.state.contract.methods.requestMoneyFrom(
      this.state.web3.utils.toWei(this.state.requestAmount, 'ether'),
      this.state.selectedRequestAccount.value.address,
      this.state.web3.utils.asciiToHex('0x0')
    ).send({
      from: this.state.account.ethAddress
    })
      .on('transactionHash', tx => {

      })
      .on('receipt', res => {
        if (res.status) {
          this.setState({
            requestMoneyPending: false
          })
        } else {
          console.log('fail');
        }
      })
      .on('confirmation', function (confirmationNr) {

      });
  }

  /** filters the request by the reqId -> only one request per each reqId **/
  filterRequests(requests) {
    let filteredRequests = [];

    let reqIdSet = new Set([]);
    requests.map(request => {
      if (!reqIdSet.has(request.reqId)) {
        filteredRequests.push(request);
        reqIdSet.add(request.reqId);
      }
    });

    return filteredRequests;
  }

  /*
    call with this.fulfillRequest(this.state.requests[1].reqId, this.state.requests[1].value);
   */
  fulfillRequest(reqId, valueInEth) {
    this.state.contract.methods.fulfillRequest(reqId)
      .send({
        from: this.state.account.ethAddress,
        value: this.state.web3.utils.toWei(valueInEth, 'ether')
      })
      .on('transactionHash', tx => {

      })
      .on('receipt', res => {
        if (res.status) {
          console.log('success');
        } else {
          console.log('fail');
        }
      })
      .on('confirmation', function (confirmationNr) {

      });
  }

  /*
    call with this.withdrawRequest(this.state.requests[1].reqId);
   */
  withdrawRequest(reqId) {
    this.state.contract.methods.withdrawRequest(reqId)
      .send({
        from: this.state.account.ethAddress
      })
      .on('transactionHash', tx => {

      })
      .on('receipt', res => {
        if (res.status) {
          console.log('success');
        } else {
          console.log('fail');
        }
      })
      .on('confirmation', function (confirmationNr) {

      });
  }

  getRequestFrom(address) {
    let requests = [];
    return this.state.contract.methods
      .getRequestsByCreditor(address)
      .call({from: this.state.account.ethAddress})
      .then(res => {
        for (let i = 0; i < res.reqIds.length; i++) {
          let request = {
            reqId: res.reqIds[i],
            value: this.state.web3.utils.fromWei(res.values[i], 'ether'),
            creditor: res.creditors[i],
            debitor: res.debitors[i],
            state: res.states[i],
            reason: this.state.web3.utils.hexToAscii(res.reasons[i])
          };
          requests.push(request);
        }
        return requests;
      })
      .catch(err => {
        console.log('error getting requests' + err);
      });
  }

  getRequestFor(address) {
    let requests = [];
    return this.state.contract.methods
      .getRequestsByDebitor(address)
      .call({from: this.state.account.ethAddress})
      .then(res => {
        for (let i = 0; i < res.reqIds.length; i++) {
          let request = {
            reqId: res.reqIds[i],
            value: this.state.web3.utils.fromWei(res.values[i], 'ether'),
            creditor: res.creditors[i],
            debitor: res.debitors[i],
            state: res.states[i],
            reason: this.state.web3.utils.hexToAscii(res.reasons[i])
          };
          requests.push(request);
        }
        return requests;
      })
      .catch(err => {
        console.log('error getting requests' + err);
      });
  }

  async getMyRequests() {
    this.getAllRequests(this.state.account.ethAddress);
  }

  async getAllRequests(address) {
    let req1 = await
      this.getRequestFrom(address);
    let req2 = await
      this.getRequestFor(address);

    return req1.concat(req2);
  }

  handleAccountChange(obj) {
    this.setState({selectedAccount: obj});
  }

  handleReqAccountChange(obj) {
    this.setState({selectedRequestAccount: obj});
  }

  handleAmountChange(e) {
    this.setState({amount: e.target.value});
  }

  handleReasonChange(e) {
    this.setState({reason: e.target.value});
  }

  handleReqAmountChange(e) {
    this.setState({requestAmount: e.target.value});
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
        <NotificationAlert ref="notificationAlert"/>
        <PanelHeader size="sm"/>
        <div className="content">
          <Row>{this.state.addresses > 0
            ? (
              <Col xs={6}>
                <Card>
                  <CardHeader>Send money</CardHeader>
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
                      Send
                    </Button>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader>Request money</CardHeader>
                  <CardBody>
                    {}
                    <Label for={'req-amount'}>Amount (in ETH)</Label>
                    <Input
                      id="req-amount"
                      disabled={this.state.requestMoneyPending}
                      placeholder={'Insert your amount'}
                      onChange={this.handleReqAmountChange.bind(this)}
                    />
                    <Label for={'req-address'}>From:</Label>
                    <Select
                      name="form-field-name"
                      disabled={this.state.requestMoneyPending}
                      value={
                        this.state.selectedRequestAccount
                          ? this.state.selectedRequestAccount
                          : null
                      }
                      onChange={this.handleReqAccountChange.bind(this)}
                      options={this.state.accounts.map(obj => ({
                        label: obj.name,
                        value: obj
                      }))}
                    />
                    <Label for={'reason'}>Reason</Label>
                    <Input
                      id="reason"
                      onChange={this.handleReasonChange.bind(this)}
                      disabled={this.state.requestMoneyPending}
                    />
                    <Button
                      style={{float: 'left'}}
                      color={'primary'}
                      disabled={
                        this.state.requestAmount === '0.00' ||
                        this.state.selectedRequestAccount === 'default' ||
                        this.state.requestMoneyPending
                      }
                      onClick={() => {
                        this.requestMoney();
                      }}
                    >
                      Request
                    </Button>
                    {this.state.requestMoneyPending ? (
                      <div style={{float: 'left', margin: 10}}>
                        <ClipLoader
                          size={35}
                          color={'#cc6600'}
                        />
                      </div>
                    ): null}
                  </CardBody>
                </Card>
              </Col>
            )
            : (
              <Col>
                <Alert color="warning">
                  <span data-notify="message">Please login to MetaMask. You can install MetaMask as a Google Chrome Extension.</span>
                </Alert>
              </Col>
            )}
            <Col xs={6}>
              <Card>
                <CardHeader>
                  Your Address Book{' '}
                  <i className="now-ui-icons business_badge"/></CardHeader>
                <CardBody>
                  <div style={{overflow: 'scroll', maxHeight: 220}}>
                    <Table responsive>
                      <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th/>
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
          {this.state.addresses > 0
            ? (
              <div>
                <Row>
                  <Col xs={12}>
                    <OpenRequests requests={this.state.requests} web3={this.state.web3}
                                  account={this.state.account} contract={this.state.contract}/>
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
            )
            : null}
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
