const requests = [
  {
    id: 1,
    cell: 'KABQ',
    unit: 'Unit 1',
    type: 'F-16C',
    fromCellId: 'KABQ',
    mission: 'ATK',
    draft: false,
    inbound: true,
    received: '11:30',
    status: 'Pending',
    sorties: [{
      start: "2017-03-01T06:00:00Z",
      end: "2017-03-01T13:59:59Z",
      quantity: 3
    }],
    unit: {
      ownedBy: 'KSLC'
    }
  },
  {
    id: 2,
    cell: 'NIKE',
    unit: 'Unit 2',
    type: 'F-16C',
    fromCellId: 'NIKE',
    mission: 'AI',
    draft: false,
    inbound: false,
    sent: '13:00',
    status: 'Approved',
    sorties: [{
      start: "2017-03-01T06:00:00Z",
      end: "2017-03-01T13:59:59Z",
      quantity: 13
    }],
    unit: {
      ownedBy: 'KSLC'
    }
  },
  {
    id: 3,
    cell: 'KLUF',
    unit: 'Unit 7',
    type: 'F-16C',
    fromCellId: 'KLUF',
    mission: 'AI',
    draft: false,
    inbound: false,
    sent: '13:00',
    status: 'Approved',
    sorties: [{
      start: "2017-03-01T06:00:00Z",
      end: "2017-03-01T13:59:59Z",
      quantity: 15
    }],
    unit: {
      ownedBy: 'ABCD'
    }
  },
  {
    id: 4,
    cell: 'KSLC',
    unit: 'Unit 3',
    type: 'F-16C',
    fromCellId: 'KSLC',
    mission: 'ATK',
    draft: true,
    inbound: false,
    created: '08:00',
    status: 'Not Sent',
    sorties: [{
      start: "2017-03-01T06:00:00Z",
      end: "2017-03-01T13:59:59Z",
      quantity: 23
    }],
    unit: {
      ownedBy: 'NIKE'
    }
  }
];

module.exports = requests;