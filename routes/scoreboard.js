const express = require('express');
const _ = require('lodash');
const moment = require('moment');
const requestData = require('../requests');
const unitStatusSummaryData = require('../UnitStatusSummary');
const io = require('../socketUtils');

function getScoreboardRouter() {
  let requestId = 1;

  const router = express.Router();

  router.get( '/', (req, res) => {
    res.send(unitStatusSummaryData);
  });

  router.get('/requests', (req, res) => {
    res.send(requestData);
  });

  router.post('/requests', (req, res) => {
    const newRequest = req.body;
    newRequest.sorties = [];
    _.forEach(req.body.reservations, (reservation) => {
      const sortieAssignment = _.find(req.body.unit.sortieAssignments, (assignment) => {
        const reserved = reservation.split('/');
        return assignment.domainId === _.last(reserved);
      });
      const existingTurnWindow = _.find(newRequest.sorties, (sortie) => {
        return sortie.start === _.get(sortieAssignment, 'turnWindow.start', 'not equal') && sortie.end === _.get(sortieAssignment, 'turnWindow.end', 'not equal')
      });
      if (existingTurnWindow){
        existingTurnWindow.quantity = existingTurnWindow.quantity + 1;
      } else {
        newRequest.sorties.push(
          {
            start: sortieAssignment.turnWindow.start,
            end: sortieAssignment.turnWindow.end,
            quantity: 1
          }
        )
      }
    });
    newRequest.inbound = true;
    newRequest.domainId = requestId;
    newRequest.received = new Date();
    newRequest.status = 'Pending';
    requestData.push(newRequest);
    res.send('success');
    const socket = io.get();
    socket.emit('scoreboard_request_update', newRequest);
    requestId++;
  });

  router.put('/request/update', (req, res) => {
    const requestToUpdate = _.find(requestData, (request) => {
      return (parseInt(request.domainId, 10) === parseInt(req.body.domainId, 10) && parseInt(request.domainId, 10) > 0)
    });
    if (requestToUpdate) {
      requestToUpdate.status = req.body.status;
      res.send('success');
      const socket = io.get();
      socket.emit('scoreboard_request_update', requestToUpdate);
      if (req.body.status === 'Approved') {
        const newUnit = _.cloneDeep(req.body.unit);
        newUnit.changeInReservation = -requestToUpdate.quantity;
        newUnit.lastUpdate = moment().format();
        _.forEach(requestToUpdate.reservations, (reservation) => {
          const sortieAssignment = _.find(newUnit.sortieAssignments, (assignment) => {
            const reserved = reservation.split('/');
            return assignment.domainId === _.last(reserved);
          });
          sortieAssignment.usedSorties = sortieAssignment.usedSorties + 1
        });
        socket.emit('scoreboard_row_update', newUnit);
      }
    }
  });

  return router;
}

module.exports = getScoreboardRouter();
