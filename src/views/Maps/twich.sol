pragma solidity ^0.4.23;
//pragma experimental ABIEncoderV2;

contract Twich {

    /*
    *   Requests
    */
    mapping(address => uint[]) public creditorReq;

    mapping(address => uint[]) public debitorReq;

    uint counter = 0;
    mapping(uint => Request) public requests;

    enum RequestState {NOT_EXISTING, REQUESTED, WITHDRAWN, FULFILLED}

    struct Request {
        uint id;
        uint value;
        address creditor;
        address debitor;
        RequestState state;
        bytes32 reason;
    }

    function requestMoneyFrom(uint value, address debitor, bytes32 reason) public {
        uint reqId = counter++;
        requests[reqId].id = reqId;
        requests[reqId].value = value;
        requests[reqId].creditor = msg.sender;
        requests[reqId].debitor = debitor;
        requests[reqId].state = RequestState.REQUESTED;
        requests[reqId].reason = reason;

        creditorReq[msg.sender].push(reqId);
        debitorReq[debitor].push(reqId);
    }

    function fulfillRequest(uint reqId) public payable {
        require(requests[reqId].debitor == msg.sender, 'msg sender not debitor');
        require(requests[reqId].value == msg.value, 'not the right amount of money');
        require(requests[reqId].state == RequestState.REQUESTED, 'not able to fulfill the request');

        (requests[reqId].creditor).transfer(msg.value);
        requests[reqId].state = RequestState.FULFILLED;
    }

    function withdrawRequest(uint reqId) public {
        require(requests[reqId].creditor == msg.sender, 'msg sender not request owner');
        require(requests[reqId].state == RequestState.REQUESTED, 'not able to withdraw the request');

        requests[reqId].state = RequestState.WITHDRAWN;
    }

    function getRequestsByCreditor(address creditor) public view
    returns (uint[] reqIds, uint[] values, address[] creditors, address[] debitors, RequestState[] states, bytes32[] reasons) {
        reqIds = creditorReq[creditor];

        values = new uint[](reqIds.length);
        creditors = new address[](reqIds.length);
        debitors = new address[](reqIds.length);
        states = new RequestState[](reqIds.length);
        reasons = new bytes32[](reqIds.length);
        for (uint i=0; i<reqIds.length; i++) {

            values[i] = requests[reqIds[i]].value;
            creditors[i] = requests[reqIds[i]].creditor;
            debitors[i] = requests[reqIds[i]].debitor;
            states[i] = requests[reqIds[i]].state;
            reasons[i] = requests[reqIds[i]].reason;
        }
        return (reqIds, values, creditors, debitors, states, reasons);
    }

    function getRequestsByDebitor(address debitor) public view
    returns (uint[] reqIds, uint[] values, address[] creditors, address[] debitors, RequestState[] states, bytes32[] reasons) {
        reqIds = debitorReq[debitor];

        values = new uint[](reqIds.length);
        creditors = new address[](reqIds.length);
        debitors = new address[](reqIds.length);
        states = new RequestState[](reqIds.length);
        reasons = new bytes32[](reqIds.length);
        for (uint i=0; i<reqIds.length; i++) {

            values[i] = requests[reqIds[i]].value;
            creditors[i] = requests[reqIds[i]].creditor;
            debitors[i] = requests[reqIds[i]].debitor;
            states[i] = requests[reqIds[i]].state;
            reasons[i] = requests[reqIds[i]].reason;
        }
        return (reqIds, values, creditors, debitors, states, reasons);
    }
}