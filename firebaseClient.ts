import firebaseClient from 'firebase/app';
import 'firebase/auth';

/*

Copy/paste your *client-side* Firebase credentials below.

To get these, go to the Firebase Console > open your project > Gear Icon >
Project Settings > General > Your apps. If you haven't created a web app
already, click the "</>" icon, name your app, and copy/paste the snippet.
Otherwise, go to Firebase SDK Snippet > click the "Config" radio button >
copy/paste.

const privateKey = process.env["PRIVATE_KEY"];
const clientEmail = process.env["CLIENT_EMAIL"];
const projectId = process.env["PROJECT_ID"];
*/

// const CLIENT_CONFIG = {
//   apiKey: 'AIzaSyBtesJGsnR2tIpK9lXGxFsdpK1AMxVAgRE',
//   authDomain: 'warranty-api-penguin.firebaseapp.com',
//   databaseURL: 'https://warranty-api-penguin.firebaseio.com',
//   projectId: 'warranty-api-penguin',
//   storageBucket: 'warranty-api-penguin.appspot.com',
//   messagingSenderId: '1037014015988',
//   appId: '1:1037014015988:web:0498a67ffd059de2ace3a1',
//   measurementId: 'G-E03HXDFXDN',
// };

// console.log(CLIENT_CONFIG);
//
const CLIENT_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// apiKey: "AIzaSyCf_2bTfMB4Vx-8qgj5YNVs0UIHJ998mMU",
// authDomain: "penguin-app-e0fb5.firebaseapp.com",
// databaseURL: "https://penguin-app-e0fb5.firebaseio.com",
// projectId: "penguin-app-e0fb5",
// storageBucket: "penguin-app-e0fb5.appspot.com",
// messagingSenderId: "212587430542",
// appId: "1:212587430542:web:9623f000cafca842f07fdf",
// measurementId: "G-MYLKVZBK1Q",

if (typeof window !== 'undefined' && !firebaseClient.apps.length) {
  firebaseClient.initializeApp(CLIENT_CONFIG);
  firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
  (window as any).firebase = firebaseClient;
}

export { firebaseClient };
