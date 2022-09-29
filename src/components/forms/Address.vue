<template lang="pug">
	div
		Steps(:steps="3", :step-active="2")
		form(@submit.prevent="handleSubmit")
			.field
				label#subscribe-street-label.label(for="subscribe-street-input") Street
				.control
					input#subscribe-street-input.input(:class="{ 'is-danger': $v.address.street.$error }", type="text", v-model="address.street", @blur="$v.address.street.$touch()", aria-labelledby="subscribe-street-label", aria-describedby="subscribe-street-error", :aria-invalid="$v.address.street.$error", placeholder="Street")
					p#subscribe-street-error.help(:class="{ 'is-danger': $v.address.street.$error }", aria-live="assertive", v-if="$v.address.street.$dirty && !$v.address.street.required") Street is required
			.field-body
				.field
					label#subscribe-city-label.label(for="subscribe-city-input") City
					.control
						input#subscribe-city-input.input(:class="{ 'is-danger': $v.address.city.$error }", type="text", v-model="address.city", @blur="$v.address.city.$touch()", aria-labelledby="subscribe-city-label", aria-describedby="subscribe-city-error", :aria-invalid="$v.address.city.$error", placeholder="City")
						p#subscribe-city-error.help(:class="{ 'is-danger': $v.address.city.$error }", aria-live="assertive", v-if="$v.address.city.$dirty && !$v.address.city.required") City is required
				.field
					label#subscribe-country-label.label(for="subscribe-country-input") Country
					.control
						input#subscribe-country-input.input(:class="{ 'is-danger': $v.address.country.$error }", type="text", v-model="address.country", @blur="$v.address.country.$touch()", aria-labelledby="subscribe-country-label", aria-describedby="subscribe-country-error", :aria-invalid="$v.address.country.$error", placeholder="Country")
						p#subscribe-country-error.help(:class="{ 'is-danger': $v.address.country.$error }", aria-live="assertive", v-if="$v.address.country.$dirty && !$v.address.country.required") Country is required
			.level
				div
					button.button.is-primary(type="submit") Next step
				div
					a.button.is-primary.is-light(href="", @click="backPage") Back to previous step

</template>
<script>
import { required } from "vuelidate/lib/validators";
import Steps from "@/components/common/Steps";

export default {
	name: "AddressForm",
	components: {
		Steps,
	},
	data() {
		return {
			address: {
				street: "",
				city: "",
				country: "",
			},
			submitted: false,
			hasError: false,
		};
	},
	props: {
		msg: String,
	},
	validations: {
		address: {
			street: { required },
			city: { required },
			country: { required },
		},
	},
	methods: {
		backPage() {
			this.$emit("back-page", 1);
		},
		handleSubmit() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}
			this.$emit("submit-address-data", this.address);
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
