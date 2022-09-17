<template lang="pug">
	div
		Steps(:steps="3", :step-active="3")
		form(@submit.prevent="handleSubmit")
			.field
				label#subscribe-email-label.label(for="subscribe-email-input") Email address
				.control
					input#subscribe-email-input.input(:class="{ 'is-danger': $v.mail.email.$error }", type="text", v-model="mail.email", @blur="$v.mail.email.$touch()", aria-labelledby="subscribe-email-label", aria-describedby="subscribe-email-error", :aria-invalid="$v.mail.email.$error", placeholder="example@example.com")
					p#subscribe-email-error.help(:class="{ 'is-danger': $v.mail.email.$error }", aria-live="assertive", v-if="$v.mail.email.$dirty && !$v.mail.email.required") Email address is required
					p#subscribe-email-error.help(:class="{ 'is-danger': $v.mail.email.$error }", aria-live="assertive", v-if="$v.mail.email.$dirty && !$v.mail.email.email") Email address is invalid

			.field
				label#subscribe-cemail-label.label(for="subscribe-cemail-input") Email confirm
				.control
					input#subscribe-cemail-input.input(:class="{ 'is-danger': $v.mail.cemail.$error }", type="text", v-model.trim="$v.mail.cemail.$model", @blur="$v.mail.cemail.$touch()", aria-labelledby="subscribe-cemail-label", aria-describedby="subscribe-cemail-error", :aria-invalid="$v.mail.cemail.$error", placeholder="example@example.com")
					p#subscribe-cemail-error.help(:class="{ 'is-danger': $v.mail.cemail.$error }", aria-live="assertive", v-if="$v.mail.cemail.$dirty && !$v.mail.cemail.required") Confirm email is required
					p#subscribe-cemail-error.help(:class="{ 'is-danger': $v.mail.cemail.$error }", aria-live="assertive", v-if="$v.mail.cemail.$dirty && !$v.mail.cemail.email") Confirm email is invalid
					p#subscribe-cemail-error.help(:class="{ 'is-danger': !$v.mail.cemail.sameAsMail }", aria-live="assertive", v-if="$v.mail.cemail.required && $v.mail.cemail.email && !$v.mail.cemail.sameAsMail") The email addresses do not match

			.level
				div
					button.button.is-primary(type="submit") Finish
				div
					a.button.is-primary.is-light(href="#", @click="backPage") Back to previous step

</template>
<script>
import { required, email, sameAs } from "vuelidate/lib/validators";
import Steps from "@/components/common/Steps";
//import axios from "axios";

export default {
	name: "AddressForm",
	components: {
		Steps
	},
	data() {
		return {
			mail: {
				email: "",
				cemail: "",
			},
			submitted: false,
			hasError: false,
		};
	},
	props: {
		msg: String,
	},
	validations: {
		mail: {
			email: { required, email },
			cemail: {
				required,
				email,
				sameAsMail: sameAs('email')
			}
		},
	},
	methods: {
		backPage() {
			this.$emit("back-page", 2);
		},
		handleSubmit() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}
			this.$emit("submit-mail-data", this.mail.email);
		},
	},
};
</script>
<style scoped lang="scss">
@import "../../common/css/variables";

.level div:nth-child(1) {
	order: 2;
}

.level div:nth-child(2) {
	order: 1;
}
</style>
