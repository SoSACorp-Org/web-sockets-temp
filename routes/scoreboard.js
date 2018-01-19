const express = require('express');
const _ = require('lodash');
const requestData = require('../requests');
const unitStatusSummaryData = require('../UnitStatusSummary');
const io = require('../socketUtils');

function getScoreboardRouter() {
  let requestId = 4;

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
    newRequest.fromCellId =
    newRequest.id = requestId;
    newRequest.received = new Date();
    newRequest.status = 'Pending';
    requestData.push(newRequest);
    res.send('success');
    const socket = io.get();
    socket.emit('scoreboard_requests_update', requestData);
    requestId++;
  });

  router.put('/requests', (req, res) => {
    if (!req.body.id || !req.body.status) {
      res.send('error, need request ID and status');
    } else {
      const request = _.find(requestData, reqObject => reqObject.id === req.body.id);
      if (!request) {
        res.send('error, no request with that ID');
      } else {
        request.status = req.body.status;
        res.send('success');

        const socket = io.get();
        socket.emit('scoreboard_requests_update', requestData);
      }
    }
  });

  router.put('/requests/1', (req, res) => {
    const newUnit = {
      "@class" : ".UnitStatusImpl",
      "domainId" : "1e94265d62594a4da5917a1b0a0db5ec",
      "missionType" : "ATK",
      "numSorties" : 19,
      "ownedBy" : "KABQ",
      "platform" : "F-16C",
      "sortieAssignments" : [ {
        "@class" : ".SortieAssignmentImpl",
        "cellId" : "KABQ",
        "domainId" : "752d6b87773b4f009620c2a8cb94c273",
        "numSorties" : 7,
        "turnWindow" : {
          "start" : "2017-03-01T06:00:00Z",
          "end" : "2017-03-01T13:59:59Z"
        },
        "usedSorties" : 4
      }, {
        "@class" : ".SortieAssignmentImpl",
        "cellId" : "KABQ",
        "domainId" : "41205b0355a644ec8de24585dd01bab5",
        "numSorties" : 6,
        "turnWindow" : {
          "start" : "2017-03-01T14:00:00Z",
          "end" : "2017-03-01T21:59:59Z"
        },
        "usedSorties" : 2
      }, {
        "@class" : ".SortieAssignmentImpl",
        "cellId" : "KABQ",
        "domainId" : "deba314244404308afe2dccabbdb5b78",
        "numSorties" : 6,
        "turnWindow" : {
          "start" : "2017-03-01T22:00:00Z",
          "end" : "2017-03-02T05:59:59Z"
        },
        "usedSorties" : 1
      } ],
      "unit" : "Unit1"
    };

    res.send('success');
    const socket = io.get();
    socket.emit('scoreboard_row_update', newUnit);
  });

  return router;
}

module.exports = getScoreboardRouter();
