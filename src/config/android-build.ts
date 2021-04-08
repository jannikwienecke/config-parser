import { BuildLines } from '../types';

const ANDROID_BUILD_NEW_LINES: BuildLines[] = [
  {
    snippet: "apply plugin: 'com.android.application'",
    newLine: ` def background_geolocation = "../../node_modules/cordova-background-geolocation-lt/src/android" \napply from: "$background_geolocation/app.gradle"`,
  },
  {
    snippet: `proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'`,
    newLine: `               proguardFiles "$background_geolocation/proguard-rules.pro"`,
  },
];

export default ANDROID_BUILD_NEW_LINES;
