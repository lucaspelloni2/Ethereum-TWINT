import React from 'react';
import {Button, Card, CardBody, CardHeader, Table} from "reactstrap";
import AddressBook from "./AddressBook";


class OpenRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.requests !== this.state.requests) {
      this.setState({
        requests: nextProps.requests
      })
    }
  }

  renderNameOrTxs(address) {
    let addrShort = address.substring(0, 10);
    const accounts = AddressBook.getAccounts();

    let knownAccount = accounts.find(a => a.address.toLowerCase() === address.toLowerCase());

    if (knownAccount) {
      return (
        <div>
          <a
            href={'https://ropsten.etherscan.io/address/' + knownAccount.address}
            target="_blank"
          >
            {knownAccount.name}
          </a>
        </div>
      );
    } else {
      return (
        <div>
          {' '}
          <a href={'https://ropsten.etherscan.io/address/' + address} target="_blank">
            {addrShort}..
          </a>
        </div>
      );
    }
  }

  /*
  call with this.fulfillRequest(this.state.requests[1].reqId, this.state.requests[1].value);
 */
  fulfillRequest(reqId, valueInEth) {
    this.props.contract.methods.fulfillRequest(reqId)
      .send({
        from: this.props.account.ethAddress,
        value: this.props.web3.utils.toWei(valueInEth, 'ether')
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
      .on('confirmation', function(confirmationNr) {

      });
  }

  /*
  call with this.withdrawRequest(this.state.requests[1].reqId);
 */
  withdrawRequest(reqId) {
    this.props.contract.methods.withdrawRequest(reqId)
      .send({
        from: this.props.account.ethAddress
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
      .on('confirmation', function(confirmationNr) {

      });
  }


  renderAction(request) {
    if (request.state === '1') {
      if(this.props.account.ethAddress === request.creditor) {
        return(<td><Button style={{background: '#00aaff'}} onClick={() => (this.withdrawRequest(parseInt(request.reqId)))}>Withdraw Request</Button></td>
        )
      } else {
        return (
          <td><Button color={'primary'} onClick={() => (this.fulfillRequest(parseInt(request.reqId), request.value))}>Fullfill Request</Button></td>
        )
      }
    } else if (request.state === '2') {
      return (
        <td><div><i className="now-ui-icons business_bank"/> Withdrawm</div></td>
      );
    } else {
      return (
        <td><i className="now-ui-icons ui-1_check"
               style={{color: '#092', fontSize: 20, fontWeight: 900}}/>
          Paid
        </td>
      );
    }
  }


  render() {
    return (
      <Card>
        <CardHeader> My Open Requests</CardHeader>
        <CardBody>{this.state.requests.length <= 0 ? (
          <div>You have no open requests</div>
        ) : (
          <div style={{overflow: 'scroll', maxHeight: 220}}>
            <Table responsive>
              <thead className="request-table-head">
              <tr>
                <th>RequestId</th>
                <th>Creditor</th>
                <th>Debitor</th>
                <th>Value</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
              {this.state.requests.map((request,i) => {
                return (
                  // TODO add unique key
                <tr key={i}>
                    {<td>{request.reqId}</td>}
                    {<td>{this.renderNameOrTxs(request.creditor)}</td>}
                    {<td>{this.renderNameOrTxs(request.debitor)}</td>}
                    {<td> {`${request.value} ETH`}</td>}
                    {this.renderAction(request)}
                  </tr>
                )
              })}
              </tbody>
            </Table>
          </div>
        )}</CardBody>
      </Card>
    )
  }
}

export default OpenRequests;