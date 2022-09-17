import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

Vue.use(VueRouter);

const routes = [
	{
		path: "*",
		name: "Home",
		component: HomeView,
	},
	{
		path: "/form",
		name: "Form",
		component: () =>
			import(/* webpackChunkname: "about" */ "../views/FormView.vue"),
	},
	{
		path: "/get-data",
		name: "Get data",
		component: () =>
			import(/* webpackChunkname: "about" */ "../views/QueryView.vue"),
	},
	{
		path: "/login",
		name: "Login",
		component: () =>
			import(/* webpackChunkname: "about" */ "../views/LoginView.vue"),
	},
	{
		path: "/register",
		name: "Register",
		component: () =>
			import(/* webpackChunkname: "about" */ "../views/RegisterView.vue"),
	},
	{
		path: "/forgot-password",
		name: "Forgot Password",
		component: () =>
			import(
				/* webpackChunkname: "about" */ "../views/ForgotPasswordView.vue"
			),
	},
	{
		path: "/secret",
		name: "secret",
		component: () =>
			import(/* webpackChunkname: "about" */ "../views/SecretView.vue"),
		meta: { requiresAuth: true }
	},
	{
		path: "*",
		component: HomeView
	},
];

const index = new VueRouter({
	mode: "history",
	routes,
});

index.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
	const isAuthenticated = firebase.auth().currentUser;
	if (requiresAuth && !isAuthenticated) {
		next("/login");
	} else {
		next();
	}
});

export default index;
