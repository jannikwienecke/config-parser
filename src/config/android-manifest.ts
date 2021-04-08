import { Attribute } from '../types';

const ANDROID_MANIFEST_ATTRIBUTES: Attribute[] = [
  {
    path: ['manifest', 'application', 0, '$'],
    key: 'android:requestLegacyExternalStorage',
    value: 'true',
  },
  {
    path: ['manifest', 'application', 0, 'meta-data', 0, '$'],
    key: 'android:name',
    value: 'com.transistorsoft.locationmanager.license',
  },
  {
    path: ['manifest', 'application', 0, 'meta-data', 0, '$'],
    key: 'android:value',
    value: 'bfd79988a59d869adbdef608eb47b705c1c3daf16b0a30147c395b0575007519',
  },
];

export default ANDROID_MANIFEST_ATTRIBUTES;
