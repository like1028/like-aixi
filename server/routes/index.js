const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  // res.render('index', {title: 'Hello World'});
  res.redirect('index.html');
});

module.exports = router;
