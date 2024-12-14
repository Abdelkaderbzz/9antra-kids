import { Data } from './types'
import person1 from '@assets/icons/avatars/person1.svg'
import person2 from '@assets/icons/avatars/person2.svg'
import person3 from '@assets/icons/avatars/person3.svg'
import person4 from '@assets/icons/avatars/person4.svg'
import person5 from '@assets/icons/avatars/person5.svg'
import person6 from '@assets/icons/avatars/person6.svg'
import person7 from '@assets/icons/avatars/person7.svg'
import person8 from '@assets/icons/avatars/person8.svg'

export const initialData: Data = {
  clients: {
    'client-1': {
      id: 'client-1',
      content: {
        clientName: 'abdelkader',
        clientCountry: 'tunisia',
        clientBillingProgress: 60,
        clientBillingAmount: 100,
        clientBillingCurrency: 'dt',
        clientAvatar: person1,
      },
    },
    'client-2': {
      id: 'client-2',
      content: {
        clientName: 'sarah',
        clientCountry: 'usa',
        clientBillingProgress: 80,
        clientBillingAmount: 200,
        clientBillingCurrency: 'usd',
        clientAvatar: person2,
      },
    },
    'client-3': {
      id: 'client-3',
      content: {
        clientName: 'mohamed',
        clientCountry: 'egypt',
        clientBillingProgress: 50,
        clientBillingAmount: 150,
        clientBillingCurrency: 'egp',
        clientAvatar: person3,
      },
    },
    'client-4': {
      id: 'client-4',
      content: {
        clientName: 'emma',
        clientCountry: 'france',
        clientBillingProgress: 70,
        clientBillingAmount: 250,
        clientBillingCurrency: 'eur',
        clientAvatar: person4,
      },
    },
    'client-5': {
      id: 'client-5',
      content: {
        clientName: 'lee',
        clientCountry: 'south korea',
        clientBillingProgress: 90,
        clientBillingAmount: 300,
        clientBillingCurrency: 'krw',
        clientAvatar: person5,
      },
    },
    'client-6': {
      id: 'client-6',
      content: {
        clientName: 'maria',
        clientCountry: 'spain',
        clientBillingProgress: 40,
        clientBillingAmount: 180,
        clientBillingCurrency: 'eur',
        clientAvatar: person6,
      },
    },
    'client-7': {
      id: 'client-7',
      content: {
        clientName: 'john',
        clientCountry: 'canada',
        clientBillingProgress: 75,
        clientBillingAmount: 220,
        clientBillingCurrency: 'cad',
        clientAvatar: person7,
      },
    },
    'client-8': {
      id: 'client-8',
      content: {
        clientName: 'yasmin',
        clientCountry: 'uae',
        clientBillingProgress: 55,
        clientBillingAmount: 160,
        clientBillingCurrency: 'aed',
        clientAvatar: person8,
      },
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'scheduled',
      clientIds: ['client-1', 'client-2', 'client-3', 'client-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'abandoned',
      clientIds: ['client-7', 'client-8'],
    },
    'column-3': {
      id: 'column-3',
      title: 'settled',
      clientIds: ['client-5', 'client-6'],
    },
    'column-4': {
      id: 'column-4',
      title: 'outstanding',
      clientIds: [],
    },
    'column-5': {
      id: 'column-5',
      title: 'deferred',
      clientIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4', 'column-5'],
}
