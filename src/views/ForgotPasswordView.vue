<template lang="pug">
	section
		.column.is-half.is-offset-one-quarter
			h1.mb-3.is-size-3.is-size-3-mobile.has-text-weight-bold.has-text-centered Forgot Password
			.box
				form(@submit.prevent='pressed')
					.field
						p Add your email address and we'll send you a link to get back into your account.
					.field
						label#forgot-mail-label.label(for="forgot-mail-input") Email address
						.control
							input#forgot-mail-input.input(:class="{ 'is-danger': $v.email.$error }", type="text", v-model="email", @blur="$v.email.$touch()", aria-labelledby="forgot-mail-label", aria-describedby="forgot-mail-error", :aria-invalid="$v.email.$error", placeholder="Email address")
							p#forgot-mail-error.help(:class="{ 'is-danger': $v.email.$error }", aria-live="assertive", v-if="$v.email.$dirty && !$v.email.required") Email address is required
					.has-text-centered
						button.button.is-primary(type="submit") Reset password
					.message.is-danger.mt-3(v-if='error')
						p.message-body {{ error.message }}
					.message.is-success.mt-3(v-if='emailSent')
						p.message-body Email sent..
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { email, required } from "vuelidate/lib/validators";

export default {
	data() {
		return {
			email: "",
			password: "",
			error: "",
			emailSent: false
		};
	},
	methods: {
		pressed() {
			firebase
				.auth()
				.sendPasswordResetEmail(this.email)
				.then(() => {
					this.emailSent = true;
				})
				.catch(error => {
					this.emailSent = false;
					this.error = error;
				});
		}
	},
	validations: {
		email: { required, email },
		password: { required }
	},
};
</script>

<style lang="scss" scoped>
</style>
