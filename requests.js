const requests = [
  {
    id: 1,
    cell: 'KABQ',
    unit: 'Unit 1',
    quantity: 3,
    type: 'F-16C',
    mission: 'ATK',
    start: 120700,
    end: 121300,
    draft: false,
    inbound: true,
    received: '11:30',
    status: 'Pending'
  },
  {
    id: 2,
    cell: 'NIKE',
    unit: 'Unit 2',
    quantity: 13,
    type: 'F-16C',
    mission: 'AI',
    start: 120700,
    end: 121300,
    draft: false,
    inbound: false,
    sent: '13:00',
    status: 'Approved'
  },
  {
    id: 3,
    cell: 'KLSC',
    unit: 'Unit 3',
    quantity: 23,
    type: 'F-16C',
    mission: 'ATK',
    start: 120700,
    end: 121300,
    draft: true,
    inbound: false,
    created: '08:00',
    status: 'Not Sent'
  }
];

module.exports = requests;