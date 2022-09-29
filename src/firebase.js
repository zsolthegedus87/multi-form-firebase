import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

let config = {
	apiKey: "AIzaSyC0HGRm9wL9OSVIzhXPr5pR3FkH9uQQlKg",
	authDomain: "multi-page-form-hzs.firebaseapp.com",
	databaseURL:
		"https://multi-page-form-hzs-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "multi-page-form-hzs",
	storageBucket: "multi-page-form-hzs.appspot.com",
	messagingSenderId: "162516945175",
	appId: "1:162516945175:web:8bda15fce53ef1b43b8f52",
};

firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
