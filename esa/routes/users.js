var express = require('express');
var router = express.Router();

var User = require('../models/User');

router.post('/save', function (req, res) {

  var ip = (req.headers['x-forwarded-for'] || '').split(',').pop() ||
         req.connection.remoteAddress ||
         req.socket.remoteAddress ||
         req.connection.socket.remoteAddress;
  console.log('ip: ', ip);

  var user = new User({
    username: req.body.username,
    address: req.body.address,
    pid: req.body.pid,
    ip: ip
  })

  user.save((err, user) => {
    if (err) return console.error(err);

    res.json({code: '0', message: 'success!', data: user});
  })
});

router.get('/:address', function (req, res) {
  var address = req.params.address

  User.find({address: address}, function (err, user) {
    if (err) return console.error(err);

    res.json({code: '0', message: 'success!', data: user});
  })
})

router.get('/search/:id', function (req, res) {
  var listLevel1 = [], listLevel2 = [], listLevel3 = []

  var _id = req.params.id;
  User.find({pid: _id}, function (err, list1) {
    if (err) return console.error(err);

    if (list1.length === 0) {
      return res.json({code: '0', message: 'success!', data: {
        listLevel1: listLevel1,
        listLevel2: listLevel2,
        listLevel3: listLevel3
      }});
    }
    listLevel1 = list1;
    var params2 = [];
    list1.map(item1 => {
      params2.push({
        pid: item1._id
      })
    });
    User.find().or(params2).exec(function (err, list2) {
      if (err) return console.error(err);

      if (list2.length === 0) {
        return res.json({code: '0', message: 'success!', data: {
          listLevel1: listLevel1,
          listLevel2: listLevel2,
          listLevel3: listLevel3
        }});
      }
      listLevel2 = list2;
      var params3 = [];
      list2.map(item2 => {
        params3.push({
          pid: item2._id
        })
      });
      User.find().or(params3).exec(function (err, list3) {
        if (err) return console.error(err);

        listLevel3 = list3;
        res.json({code: '0', message: 'success!', data: {
          listLevel1: listLevel1,
          listLevel2: listLevel2,
          listLevel3: listLevel3
        }});
      });
    });
  })
});

module.exports = router;
