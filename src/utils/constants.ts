export const ADA_SYMBOL = '₳';

export const BORDER_RADIUS_SM = 10;
export const BORDER_RADIUS_MD = 15;
export const BORDER_RADIUS_LG = 20;

// Dummy Data
export const address =
  'addr1qxh4sy9qq8029rv2cpy5rqv2kkhqpz9yvtuwh25er20tn3fhw02uqe6kxus7v6262zsff7vqfyr3lqr68mr9pl9257gs7asee9';
export const transactions = [
  {
    type: 'asset',
    description: 'Sent',
    amount: `${Math.floor(Math.random() * 100)} ${ADA_SYMBOL}`,
    date: 'Dec 3, 2021',
    to: '$levy1',
  },
  {
    type: 'ada',
    description: 'Received',
    amount: `${Math.floor(Math.random() * 100)} ${ADA_SYMBOL}`,
    date: 'Dec 3, 2021',
    from: '$kendra',
  },
  {
    type: 'ada',
    description: 'Sent',
    amount: `${Math.floor(Math.random() * 100)} ${ADA_SYMBOL}`,
    date: 'Dec 3, 2021',
    to: '$levy1',
  },
  {
    type: 'asset',
    description: 'Sent',
    amount: `${Math.floor(Math.random() * 100)} ${ADA_SYMBOL}`,
    date: 'Dec 1, 2021',
    to: '$levy1',
  },
];

export const assets = [
  {
    name: 'ADA',
    type: 'ada',
    amount: '1,000,000',
    image: null,
  },
  {
    name: '$levy',
    type: 'handle',
    amount: '1',
    image: require('../../assets/levy.jpg'),
  },
  {
    name: '$andrewlevy',
    type: 'handle',
    amount: '1',
    image: require('../../assets/levy.jpg'),
  },
  {
    name: '$.eth',
    type: 'handle',
    amount: '1',
    image: require('../../assets/levy.jpg'),
  },
];
