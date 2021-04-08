import { Attribute } from '../types';

const IOS_PLIST_ATTRIBUTES: Attribute[] = [
  {
    path: [],
    key: 'BGTaskSchedulerPermittedIdentifiers',
    value: ['com.transistorsoft.fetch'],
  },

  { path: [], key: 'IonApi', value: 'https://api.ionicjs.com' },
  { path: [], key: 'IonAppId', value: 'c9fabb37' },
  { path: [], key: 'IonChannelName', value: 'Production' },
  { path: [], key: 'IonMaxVersions', value: 2 },
  { path: [], key: 'IonMinBackgroundDuration', value: 30 },
  { path: [], key: 'IonUpdateMethod', value: 'background' },
  {
    path: [],
    key: 'LSApplicationQueriesSchemes',
    value: [
      'citymapper',
      'comgooglemaps',
      'avigon',
      'transit',
      'waze',
      'yandexnavi',
      'uber',
      'tomtomhome',
      'here-route',
      'com.sygic.aura',
      'moovit',
      'lyft',
      'mapsme',
      'cabify',
      'baidumap',
      'taxis99',
      'iosamap',
      'navigon',
    ],
  },

  {
    path: [],
    key: 'NSLocationAlwaysAndWhenInUseUsageDescription',
    value:
      'The App accesses location information while running in the background',
  },

  {
    path: [],
    key: 'NSMotionUsageDescription',
    value: 'This app needs to be able to access your motion use',
  },

  {
    path: [],
    key: 'UIBackgroundModes',
    value: ['fetch', 'location', 'remote-notification', 'processing'],
  },
];

export default IOS_PLIST_ATTRIBUTES;
