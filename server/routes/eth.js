/**
 *@file    eth.js
 *@author  Like (likeaixi@gmail.com)
 *@date    2018/10/22
 *@disc    以太坊相关路由
 */

"use strict";
const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const Tx = require('ethereumjs-tx');

// Infura HttpProvider Endpoint
let web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/bWQAsi2JbfmO9YAoxOgm"));

router.get('/transfer/:address/:amount', async (req, res) => {
  let toAddress = req.params.address;
  let amount = req.params.amount;

  let privateKey = Buffer.from('asfdsfs', 'hex');
  let myAccount = web3.eth.accounts.privateKeyToAccount('sdfsdfss');

  let myNonce = await web3.eth.getTransactionCount(myAccount.address);
  let gasPrice = await web3.eth.getGasPrice();
  let gasLimit = 21000;
  let value = amount ? amount*Math.pow(10,18) : 0;

  let rawTx = {
    nonce: web3.utils.toHex(myNonce),
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex(gasLimit),
    to: toAddress,
    value: web3.utils.toHex(value),
    data: ''
  }

  let tx = new Tx(rawTx);
  tx.sign(privateKey);

  let serializedTx = tx.serialize();
  // console.log(serializedTx.toString('hex'));

  web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
    .once('transactionHash', hash => {
      console.log(`交易发送成功， 交易hash: ${hash}`);

      res.send({
        status: 'success',
        message: `交易发送成功， 交易hash: ${hash}`,
      });
    })
    .once('error', err => {
      console.log(`交易发送失败，err: ${err}`);

      res.send({
        status: 'error',
        message: '交易发送失败'
      });
    });
});

router.get('/token/transfer/:address/:amount', async (req, res) => {
  let toAddress = req.params.address;
  let amount = req.params.amount;

  let privateKey = Buffer.from('sdfsfs', 'hex');
  let myAccount = web3.eth.accounts.privateKeyToAccount('sdfsfs');

  let contract = '0x0b76544F6C413a555F309Bf76260d1E02377c02A'; // INT 合约地址

  let myNonce = await web3.eth.getTransactionCount(myAccount.address);
  let gasPrice = await web3.eth.getGasPrice();
  let gasLimit = 100000;
  let myAmount = amount ? amount*Math.pow(10,6) : 0; //  INT 为6位小数

  let functionName = "transfer(address,uint256)";//erc20标准转账函数

  let myData = web3.eth.abi.encodeParameters(['address', 'uint256'], [toAddress, myAmount]).substring(2);

  //签名函数
  let functionSig = web3.utils.sha3(functionName).substr(2,8);

  let rawTx = {
    nonce: web3.utils.toHex(myNonce + 1),
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex(gasLimit),
    to: contract,
    value: web3.utils.toHex(0),
    data: '0x' + functionSig + myData
  }

  let tx = new Tx(rawTx);
  tx.sign(privateKey);

  let serializedTx = tx.serialize();
  // console.log(serializedTx.toString('hex'));

  web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
    .once('transactionHash', hash => {
      console.log(`交易发送成功， 交易hash: ${hash}`);

      res.send({
        status: 'success',
        message: `交易发送成功， 交易hash: ${hash}`,
      });
    })
    .once('error', err => {
      console.log(`交易发送失败，err: ${err}`);

      res.send({
        status: 'error',
        message: '交易发送失败'
      });
    });
});

module.exports = router;

