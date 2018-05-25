import React from 'react';
import styled from 'styled-components';
import AddressBook from '../../views/Maps/AddressBook';

const NotifContainer = styled.div`
  &:hover {
    background: #f2f2f2;
  }
  display: flex;
  align-items: center;
  min-height: 80px;
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #f2f2f2;
`;

const BellIconContainer = styled.div`
  margin-right: 20px;
`;

const BellIcon = styled.i`
  color: rgb(44, 44, 44);
`;

const State = styled.div`
  padding: 5px;
  border-radius: 4px;
  background: ${props =>
    `linear-gradient(90deg, ${props.first}, ${props.second} 51%)`};
  color: white;
  text-align: center;
  margin-top: 5px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Text = styled.div`
  font-size: 14px;
  text-transform: lowercase;
`;

const AddressLink = styled.a``;

class BellNotification extends React.Component {
  constructor() {
    super();
  }

  renderName(address) {
    let isKnown = false;
    let accounts = AddressBook.getAccounts();
    let kAccount = '';
    accounts.forEach(knownAccount => {
      if (knownAccount.address === address) {
        kAccount = knownAccount;
        isKnown = true;
      }
    });

    if (isKnown) {
      return (
        <AddressLink
          href={'https://ropsten.etherscan.io/address/' + kAccount.address}
          style={{color: '#f96332'}}
          target="_blank"
        >
          {kAccount.name}
        </AddressLink>
      );
    } else {
      return (
        <AddressLink
          href={'https://ropsten.etherscan.io/address/' + address}
          style={{color: '#f96332'}}
          target="_blank"
        >
          Someone
        </AddressLink>
      );
    }
  }

  renderMessage() {
    // 1: und ich bi debitor --> some one requested money from you
    // 2: und debitor --> someone has removed the money request
    // 3: und creditor --> someone (the debitor) has fullfilled you requests
    let request = this.props.myRequest;

    if (
      request.state === '1' &&
      request.debitor === this.props.account.ethAddress
    ) {
      return (
        <NotifContainer>
          <BellIconContainer>
            <BellIcon
              style={{fontSize: 22}}
              className="now-ui-icons ui-1_bell-53"
            />
          </BellIconContainer>
          <TextContainer>
            <Text>
              {this.renderName(request.creditor)} requested {request.value}{' '}
              <p style={{textTransform: 'uppercase'}}>ETH</p> from you
            </Text>
            <State first={'#03a7f7'} second={'#1869d0'}>
              MONEY REQUESTED
            </State>
          </TextContainer>
        </NotifContainer>
      );
    } else if (
      request.state === '2' &&
      request.debitor === this.props.account.ethAddress
    ) {
      return (
        <NotifContainer>
          <BellIconContainer>
            <BellIcon
              style={{fontSize: 22}}
              className="now-ui-icons ui-1_bell-53"
            />
          </BellIconContainer>
          <TextContainer>
            <Text>
              {this.renderName(request.creditor)} has removed the money request
            </Text>
            <State first={'#03f7b5'} second={'#1869d0'}>
              REQUEST REMOVED
            </State>
          </TextContainer>
        </NotifContainer>
      );
    } else if (
      request.state === '3' &&
      this.props.account.ethAddress === request.creditor
    ) {
      return (
        <NotifContainer>
          <BellIconContainer>
            <BellIcon
              style={{fontSize: 22}}
              className="now-ui-icons ui-1_bell-53"
            />
          </BellIconContainer>
          <TextContainer>
            <Text>
              {this.renderName(request.debitor)} has paid your request of{' '}
              {request.value} <p style={{textTransform: 'uppercase'}}>ETH</p>
            </Text>
            <State first={'#03b2f7'} second={'#47d888'}>
              REQUEST FULFILLED
            </State>
          </TextContainer>
        </NotifContainer>
      );
    }
  }

  render() {
    return <div>{this.renderMessage()}</div>;
  }
}

export default BellNotification;
