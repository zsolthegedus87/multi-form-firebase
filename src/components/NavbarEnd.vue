<template lang="pug">
	.navbar-end
		.navbar-item
			.buttons
				router-link(v-if="!loggedIn", to="/register").button.is-primary
					strong Sign up
				a(v-if="loggedIn", @click="signOut").button.is-light
					| Sign out
				router-link(v-else, to="/login").button.is-light
					| Log in
</template>
<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default {
	name: "NavbarEnd",
	components: {},
	data() {
		return {
			loggedIn: false,
		};
	},
	mounted() {
		this.setupFirebase();
	},
	methods: {
		setupFirebase() {
			firebase.auth().onAuthStateChanged((user) => {
				this.loggedIn = !!user;
			});
		},
		signOut() {
			firebase
				.auth()
				.signOut()
				.then(() => {
					this.$router.push("/home");
				});
		},
	},
};
</script>
