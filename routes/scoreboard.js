const express = require('express');
const tableData = require('../data');
const requestData = require('../requests');
const io = require('../socketUtils');

function getScoreboardRouter() {
  const router = express.Router();

  router.get( '/', (req, res) => {
    res.send(tableData);
  });

  router.get('/requests', (req, res) => {
    res.send(requestData);
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