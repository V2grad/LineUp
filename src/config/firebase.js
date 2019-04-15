import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDZsgdhBNU0GtAINpewfWzu0HChrKLFZso',
  authDomain: 'never-pet.firebaseapp.com',
  databaseURL: 'https://never-pet.firebaseio.com',
  projectId: 'never-pet',
  storageBucket: 'never-pet.appspot.com',
  messagingSenderId: '776662745353'
}

firebase.initializeApp(config)
