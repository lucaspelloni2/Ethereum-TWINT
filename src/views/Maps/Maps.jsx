import React from 'react';
import {
  Row, Col,
  Card, CardHeader, CardBody,
    Button, Input, Label

} from 'reactstrap';


import { PanelHeader } from 'components';
import Web3 from 'web3';




class FullScreenMap extends React.Component{
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

            selectedAddress:"default",
            amount: '0.00'
        };
    }

    async componentDidMount() {
        let addresses = await this.getUserAddresses();
        let address = addresses[0];
        let balance = await this.state.web3.eth.getBalance(address);
        this.setState({
            account: {address, balance: this.state.web3.utils.fromWei(balance, 'ether')},
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
            from: this.state.account.address,
            to: this.state.selectedAddress,
            value: this.state.web3.utils.toWei(this.state.amount, 'ether')
        });
        console.log("this address ", this.state.selectedAddress)
    }

    handleAddressChange(e) {
        this.setState({selectedAddress: e.target.value});
    }

    handleAmountChange(e) {
        this.setState({amount: e.target.value});
    }

        render(){
        return (
          <div>
            <PanelHeader size="sm" />
            <div className="content">
              <Row>
                <Col xs={12}>
                  <Card>
                    <CardHeader>Web 3 Integration</CardHeader>
                    <CardBody>

                        <p>TODO: Integrate WEB 3 JS here!</p>
                        <Label for={"address"}>Address</Label>
                        <Input id="address" placeholder={"Insert an address"} onChange={this.handleAddressChange.bind(this)}/>
                        <Label for={"amount"}>Amount (in ETH)</Label>
                        <Input id="amount" placeholder={"Insert your amount"} onChange={this.handleAmountChange.bind(this)}/>
                        <Button onClick={()=>{
                            this.transferMoney()
                        }
                        }>Send money</Button>
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
