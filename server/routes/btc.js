/**
 *@file    btc.js
 *@author  Like (likeaixi@gmail.com)
 *@date    2018/10/25
 *@disc    比特币相关路由
 */
"use strict";

const bitcoin = require('bitcoinjs-lib');
const express = require('express');
const router = express.Router();
// const http = require('t');

const rng = require('crypto').randomBytes; // 随机数发生器
// console.log(bitcoin);


router.get('/create', (req, res) => {
  const keyPair = bitcoin.ECPair.makeRandom();
  const wif = keyPair.toWIF();
  const { address } =bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });

  res.send({
    status: 'success',
    message: '创建帐户成功',
    data: {
      privateKey: keyPair.privateKey.toString('hex'),
      publicKey: keyPair.publicKey.toString('hex'),
      wif: wif,
      address: address
    }
  });

});

router.get('/create/testnet', (req, res) => {
  const testnet = bitcoin.networks.testnet;
  const keyPair = bitcoin.ECPair.makeRandom({network: testnet});
  const wif = keyPair.toWIF();
  const { address } =bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: testnet });

  res.send({
    status: 'success',
    message: '创建测试网络帐户成功',
    data: {
      wif: wif,
      address: address
    }
  });

});

router.get('/transfer/:address/:amount', (req, res) => {
  const toAddress = req.params.address;
  const amount = req.params.amount;

  const privateKey = bitcoin.ECPair.fromWIF('cRQN7G5zL47jwWbF3ZJ8Zzzz4rWfuSRJdsWNNT1pSxNtaWwt3Yjb');

});


module.exports = router;
