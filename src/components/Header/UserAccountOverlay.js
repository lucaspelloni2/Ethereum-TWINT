import React from 'react';
import {PopoverBody} from "reactstrap";
import Web3 from 'web3';
import 'assets/css/header.css';

class UserAccountOverlay extends React.Component {
  constructor(props) {
    super(props);

    let web3 = new Web3(Web3.givenProvider);

    this.state = {
      account: {
        ethAddress: 'default',
        ethBalance: 0
      },
      web3: web3,
      amount: '0.00'
    };
  }

  async componentDidMount(){
    let addresses = await this.getUserAddresses();
    let address = addresses[0];
    let balance = await this.state.web3.eth.getBalance(address);
    this.setState({
      account: {
        ethAddress: address,
        ethBalance: this.state.web3.utils.fromWei(balance, 'ether')
      },
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

  render(){
    console.log(this.state.account.ethBalance);
    return (
      <div className='userPopOver'>
        <PopoverBody>
          <div className='popOverTag'>ETH address: {this.state.account.ethAddress}
          </div>
          <div className='popOverTag'> ETH balance: {this.state.account.ethBalance}</div>
        </PopoverBody>
      </div>
    )
  }
}


export default UserAccountOverlay;