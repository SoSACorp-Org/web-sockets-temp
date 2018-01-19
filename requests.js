const requests = [
  {
    id: 1,
    cell: 'KABQ',
    unit: 'Unit 1',
    type: 'F-16C',
    mission: 'ATK',
    draft: false,
    inbound: true,
    received: '11:30',
    status: 'Pending',
    sorties: [{
      start: 120700,
      end: 121300,
      quantity: 3
    }]
  },
  {
    id: 2,
    cell: 'NIKE',
    unit: 'Unit 2',
    type: 'F-16C',
    mission: 'AI',
    draft: false,
    inbound: false,
    sent: '13:00',
    status: 'Approved',
    sorties: [{
      start: 120700,
      end: 121300,
      quantity: 13
    }]
  },
  {
    id: 3,
    cell: 'KLSC',
    unit: 'Unit 3',
    type: 'F-16C',
    mission: 'ATK',
    draft: true,
    inbound: false,
    created: '08:00',
    status: 'Not Sent',
    sorties: [{
      start: 120700,
      end: 121300,
      quantity: 23
    }]
  }
];

module.exports = requests;