import { Attribute } from '../types';

const path = ['resources', 'string', 0];
const ANDROID_STRINGS_ATTRIBUTES: Attribute[] = [
  {
    path,
    value: { _: 'Sirum', $: { name: 'app_name' } },
  },
  {
    path,
    value: { _: 'c9fabb37', $: { name: 'ionic_app_id' } },
  },
  {
    path,
    value: { _: 'Production', $: { name: 'ionic_channel_name' } },
  },
  {
    path,
    value: { _: 'background', $: { name: 'ionic_update_method' } },
  },
  {
    path,
    value: { _: '2', $: { name: 'ionic_max_version' } },
  },
  {
    path,
    value: { _: '30', $: { name: 'ionic_min_background_duration' } },
  },
  {
    path,
    value: { _: 'https://api.ionicjs.com', $: { name: 'ionic_update_api' } },
  },
];

export default ANDROID_STRINGS_ATTRIBUTES;
