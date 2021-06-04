import firebaseClient from "firebase/app";
import "firebase/auth";

/*

Copy/paste your *client-side* Firebase credentials below.

To get these, go to the Firebase Console > open your project > Gear Icon >
Project Settings > General > Your apps. If you haven't created a web app
already, click the "</>" icon, name your app, and copy/paste the snippet.
Otherwise, go to Firebase SDK Snippet > click the "Config" radio button >
copy/paste.

*/
const CLIENT_CONFIG = {
  apiKey: "AIzaSyCf_2bTfMB4Vx-8qgj5YNVs0UIHJ998mMU",
  authDomain: "penguin-app-e0fb5.firebaseapp.com",
  databaseURL: "https://penguin-app-e0fb5.firebaseio.com",
  projectId: "penguin-app-e0fb5",
  storageBucket: "penguin-app-e0fb5.appspot.com",
  messagingSenderId: "212587430542",
  appId: "1:212587430542:web:9623f000cafca842f07fdf",
  measurementId: "G-MYLKVZBK1Q"
};

if (typeof window !== "undefined" && !firebaseClient.apps.length) {
  firebaseClient.initializeApp(CLIENT_CONFIG);
  firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
  (window as any).firebase = firebaseClient;
}

export { firebaseClient };