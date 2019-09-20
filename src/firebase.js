import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyCRKO48D1XY9yUh41i04fu5Ms48FUelb6E',
  authDomain: 'test-herolo.firebaseapp.com',
  databaseURL: 'https://test-herolo.firebaseio.com',
  projectId: 'test-herolo',
  storageBucket: 'test-herolo.appspot.com',
  messagingSenderId: '311405146173',
};
const firebaseProdactivityApp = firebase.initializeApp(config);

const firestore = firebaseProdactivityApp.firestore();
firestore.settings({ timestampsInSnapshots: true });

export default firestore;
