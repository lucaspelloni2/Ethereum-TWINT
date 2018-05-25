const ContractProps = {
  CONTRACT_ABI: [
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
  CONTRACT_ADDRESS: '0xb45aff6677f3f2ca6dd50507089cd4d4485c553d'
};

export default ContractProps;
