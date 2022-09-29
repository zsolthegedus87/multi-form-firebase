import Vue from "vue";
import App from "./App.vue";
import VueI18n from "vue-i18n";
import router from "./router";
import Vuelidate from "vuelidate";

Vue.use(VueI18n);
Vue.use(Vuelidate);

const i18n = new VueI18n({
	locale: document.documentElement.lang,
});

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

new Vue({
	render: (h) => h(App),
	router,
	i18n,
}).$mount("#app");
