const express = require('express');
const _ = require('lodash');
const requestData = require('../requests');
const io = require('../socketUtils');


function createUnit(id) {
  const date = new Date();
  const startTime = date.getHours();
  const endTime = date.getHours() + 4;

  const timeSlots = [
    {
      id: 'timeSlot-'+1,
      startTime: startTime,
      endTime: endTime,
      status: 'Available',
      controlledBy: 'KABQ'
    },
    {
      id: 'timeSlot-'+2,
      startTime: startTime + 6,
      endTime: endTime + 6,
      status: 'Available',
      controlledBy: 'KABQ'
    }
  ];

  const assets = [
    {
      id: 'asset-'+1,
      timeSlots: _.cloneDeep(timeSlots)
    },
    {
      id: 'asset-'+2,
      timeSlots: _.cloneDeep(timeSlots)
    }
  ];

  const unit = _.assign({}, {
    id: 'unit-' + id,
    cell: 'KABQ',
    unit: 'Unit ' + id,
    platform: 'F-16C',
    missionType: 'ATK',
    used: 4,
    available: 15,
    total: 19,
    assets: assets
  });

  return unit;
}

function getScoreboardRouter() {
  const tableData = [];
  var i = 1;
  for(i; i <= 15; i++) {
    tableData.push(createUnit(i));
  }

  let requestId = 4;

  const router = express.Router();

  router.get( '/', (req, res) => {
    res.send(tableData);
  });

  router.get('/requests', (req, res) => {
    res.send(requestData);
  });

  router.post('/requests', (req, res) => {
    const newRequest = req.body;
    newRequest.id = requestId;
    newRequest.inbound = true;
    newRequest.received = new Date();
    newRequest.status = 'Pending';

    requestData.push(newRequest);
    res.send('success');
    const socket = io.get();
    socket.emit('scoreboard_requests_update', requestData);
    requestId++;
  });

  router.post( '/requests/1', (req, res) => {
    tableData[0] = {
      id: 1,
      cell: 'KABQ',
      unit: 'Unit 1',
      platform: 'F-16C',
      missionType: 'ATK',
      used: 7,
      available: 12,
      total: 19
    };

    res.send('success');
    const socket = io.get();
    socket.emit('scoreboard_table_update', tableData);
  });

  router.post( '/requests/2', (req, res) => {
    tableData[1] = {
      id: 2,
      cell: 'KABQ',
      unit: 'Unit 2',
      platform: 'F-16C',
      missionType: 'ATK',
      used: 5,
      available: 0,
      total: 5
    };

    res.send('success');
    const socket = io.get();
    socket.emit('scoreboard_table_update', tableData);
  });

  router.post( '/requests/3', (req, res) => {
    tableData[2] = {
      id: 3,
      cell: 'KABQ',
      unit: 'Unit 3',
      platform: 'F-16C',
      missionType: 'ATK',
      used: 6,
      available: 6,
      total: 12
    };

    res.send('success');
    const socket = io.get();
    socket.emit('scoreboard_table_update', tableData);
  });

  return router;
}

module.exports = getScoreboardRouter();
