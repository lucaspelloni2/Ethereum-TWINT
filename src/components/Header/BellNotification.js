import React from 'react';
import styled from 'styled-components';

const NotifContainer = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
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
  background: linear-gradient(90deg, #03a7f7, #1869d0 51%);
  color: white;
  text-align: center;
  margin-top: 5px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.div`
  font-size: 14px;
  text-transform: lowercase;
`;

class BellNotification extends React.Component {
  constructor() {
    super();
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
            <Text>Someone requested money from you</Text>
            <State>MONEY REQUESTED</State>
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
          <Text>Someone has removed the money request</Text>
          <State>MONEY REQUESTED</State>
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
          <p>Someone has fulfill your request</p>
        </NotifContainer>
      );
    }
  }

  render() {
    return <div>{this.renderMessage()}</div>;
  }
}

export default BellNotification;
