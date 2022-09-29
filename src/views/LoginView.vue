<template lang="pug">
	section
		.column.is-half.is-offset-one-quarter
			h1.mb-3.is-size-3.is-size-3-mobile.has-text-weight-bold.has-text-centered Login
			.box
				form(@submit.prevent='pressed')
					.field
						label#login-mail-label.label(for="login-mail-input") Email address
						.control
							input#login-mail-input.input(:class="{ 'is-danger': $v.email.$error }", type="text", v-model="email", @blur="$v.email.$touch()", aria-labelledby="login-mail-label", aria-describedby="login-mail-error", :aria-invalid="$v.email.$error", placeholder="First name")
							p#login-mail-error.help(:class="{ 'is-danger': $v.email.$error }", aria-live="assertive", v-if="$v.email.$dirty && !$v.email.required") First name is required

					.field
						label#login-password-label.label(for="login-password-input") Password
						.control
							input#login-password-input.input(:class="{ 'is-danger': $v.password.$error }", type="password", v-model="password", @blur="$v.password.$touch()", aria-labelledby="login-password-label", aria-describedby="login-password-error", :aria-invalid="$v.password.$error", placeholder="First name")
							p#login-password-error.help(:class="{ 'is-danger': $v.password.$error }", aria-live="assertive", v-if="$v.password.$dirty && !$v.password.required") First name is required

					.has-text-centered
						button.button.is-primary(type="submit") Login

					router-link(to="/forgot-password").is-link
						| Forgot password
					div.message.is-danger.mt-3(v-if='error')
						p.message-body {{ error.message }}

</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { email, required } from "vuelidate/lib/validators";

export default {
	data() {
		return {
			email: "",
			password: "",
			error: "",
		};
	},
	methods: {
		pressed() {
			firebase
				.auth()
				.signInWithEmailAndPassword(this.email, this.password)
				.then(() => {
					this.$router.replace({ name: "secret" });
				})
				.catch((error) => {
					this.error = error;
				});
		},
	},
	validations: {
		email: { required, email },
		password: { required },
	},
};
</script>
