import React from 'react';
import styled from 'styled-components';
import BellNotification from './BellNotification';

const Icon = styled.i`
  position: relative;
`;

const Notification = styled.span`
  position: absolute;
  background-color: #fb404b;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  border: 1px solid red;
  margin-left: -10px;
  font-size: 6px;
`;

const NotificationList = styled.div`
  position: absolute;
  top: 53px;
  width: 350px;
  min-height: 50px;
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;
  background-color: rgba(255, 255, 255, 0.95);
  right: 50px;
  box-shadow: 0 0 11px 0 rgba(0, 0, 0, 0.21);
  z-index: 10;
  line-height: 20px;
  font-size: 14px;
  word-break: break-all;
  border-radius: 8px;
  color: rgb(44, 44, 44);
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

class HeaderNotification extends React.Component {
  constructor() {
    super();
    this.state = {
      showList: false
    };
  }

  componentDidMount() {
    const unviewedRequests = [];

    this.props.myRequests.forEach(myRequest => {
      const reqId = myRequest.reqId;
    });

  }

  showNotifications() {
    let show = this.state.showList;
    this.setState({showList: !show});
  }

  render() {
    return (
      <div>
        <Icon
          className="now-ui-icons ui-1_bell-53"
          onClick={() => {
            this.showNotifications();
          }}
        />
        <Notification />
        {this.state.showList ? (
          <NotificationList>
            {this.props.myRequests.map(myRequest => {
              return (
                <BellNotification
                  account={this.props.account}
                  myRequest={myRequest}
                  key={myRequest.reqId}
                />
              );
            })}
          </NotificationList>
        ) : null}
      </div>
    );
  }
}

export default HeaderNotification;
