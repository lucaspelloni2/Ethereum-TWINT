import React from 'react';

const data = [
  {
    name: 'Lukas Pelloni',
    address: '0x199d7e3cE60B45De7ee29E0c3a1a2d66197A20D4'
  },
  {
    name: 'Severin Wullschleger',
    address: '0x8745BE2c582BCFC50ACF9d2C61CadEd65a4E3825'
  },
  {
    name: 'Andreas Schaufehubul',
    address: '0x199d7e3cE60B45De7ee29E0c3a1a2d66197A20D4'
  },
  {
    name: 'Vitalik Buterin',
    address: '0xc7470e71627eA66bBFBfD275A616b07273295493'
  },
  {
    name: 'Satoshi Nakamoto',
    address: '0x199d7e3cE60B45De7ee29E0c3a1a2d66197A20D4'
  },
  {
    name: 'Jonathan Burger',
    address: '0x199d7e3cE60B45De7ee29E0c3a1a2d66197A20D4'
  }
];

class AddressBook extends React.Component {
  static addAccount(account) {
    let accounts = localStorage.getItem('accounts')
      ? JSON.parse(localStorage.getItem('accounts'))
      : [];
    accounts.push(account);
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }

  static removeAccount(account) {}

  static getAccounts() {
    return localStorage.getItem('accounts')
      ? JSON.parse(localStorage.getItem('accounts'))
      : [];
  }
}

export default AddressBook;
