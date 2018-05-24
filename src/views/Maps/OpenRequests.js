import React from 'react';
import {Card, CardBody, CardHeader, Table} from "reactstrap";
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

  renderNameOrTxs(txHash) {
    let txHashShort = txHash.substring(0, 10);
    const accounts = AddressBook.getAccounts();

    let knownAccount = accounts.find(a => a.address === txHash);

    if (knownAccount) {
      return (
        <div>
          <a
            href={'https://etherscan.io/address/' + knownAccount.address}
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
          <a href={'https://etherscan.io/address/' + txHash} target="_blank">
            {txHashShort}..
          </a>
        </div>
      );
    }
  }

  renderAction(actionState) {
    if (actionState === '1') {
      return (
        <td>Open</td>
      )
    } else if (actionState === '2') {
      return (
        <td>Withdrawm</td>
      );
    } else {
      return (
        <td>Done</td>
      );
    }
  }


  render() {
    console.log(this.state.requests);
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
              {this.state.requests.map(request => {
                return (
                  // TODO add unique key
                <tr> 
                    {<td>{request.reqId}</td>}
                    {<td>{this.renderNameOrTxs(request.creditor)}</td>}
                    {<td>{this.renderNameOrTxs(request.debitor)}</td>}
                    {<td> {`${request.value} ETH`}</td>}
                    {this.renderAction(request.state)}
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