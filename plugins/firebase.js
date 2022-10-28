import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
	apiKey: 'AIzaSyD9R7EeLdPZusJV_bBsm3EiPj-gwCri8u0',
	authDomain: 'https://ntisa-22a97.firebaseapp.com',
	databaseURL: 'https://ntisa-22a97.firebaseio.com',
	projectId: 'ntisa-22a97',
	storageBucket: 'gs://ntisa-22a97.appspot.com',
	messagingSenderId: '724148179627',
	appId: '1:724148179627:android:0da9e87a1b0c27bb959dee'
}
const fb = firebase.initializeApp(firebaseConfig)
export default fb;
