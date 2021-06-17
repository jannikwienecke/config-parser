"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IOS_PLIST_ATTRIBUTES = [
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
        value: 'The App access location information in the background, in order to give you helpful alerts on your trip.',
    },
    {
        path: [],
        key: 'NSLocationAlwaysAndWhenInUseUsageDescription',
        value: 'The app uses your location to enhance your user experience by alerting you in helpful situations and automates tasks for you.',
    },
    {
        path: [],
        key: 'NSMotionUsageDescription',
        value: 'This app accesses your motion data to identify your current type of movement',
    },
    {
        path: [],
        key: 'NSCameraUsageDescription',
        value: 'Take images and videos of your transport goods to capture their conditions',
    },
    {
        path: [],
        key: 'UIBackgroundModes',
        value: ['fetch', 'location', 'remote-notification', 'processing'],
    },
    {
        path: [],
        key: 'NSUserTrackingUsageDescription',
        value: 'This app shares your crash data to identify problems with the app',
    },
];
exports.default = IOS_PLIST_ATTRIBUTES;
