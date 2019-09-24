import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyAEvH321zkHf8m_Syn0tiB4mRE4zR9sE-E",
  authDomain: "indeni-test.firebaseapp.com",
  databaseURL: "https://indeni-test.firebaseio.com",
  projectId: "indeni-test",
  storageBucket: "",
  messagingSenderId: "1034221760481",
  appId: "1:1034221760481:web:f2551af7838ccb2596aca0"
};
const firebaseProdactivityApp = firebase.initializeApp(config);

const firestore = firebaseProdactivityApp.firestore();
firestore.settings({ timestampsInSnapshots: true });

export default firestore;
