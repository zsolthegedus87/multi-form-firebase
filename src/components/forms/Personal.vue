<template lang="pug">
	div
		Steps(:steps="3", :step-active="1")
		form(@submit.prevent="handleSubmit")
			.field
				label#subscribe-fname-label.label(for="subscribe-fname-input") First name
				.control
					input#subscribe-fname-input.input(:class="{ 'is-danger': $v.user.firstname.$error }", type="text", v-model="user.firstname", @blur="$v.user.firstname.$touch()", aria-labelledby="subscribe-fname-label", aria-describedby="subscribe-fname-error", :aria-invalid="$v.user.firstname.$error", placeholder="First name")
					p#subscribe-fname-error.help(:class="{ 'is-danger': $v.user.firstname.$error }", aria-live="assertive", v-if="$v.user.firstname.$dirty && !$v.user.firstname.required") First name is required
			.field
				label#subscribe-lname-label.label(for="subscribe-lname-input") Last name
				.control
					input#subscribe-lname-input.input(:class="{ 'is-danger': $v.user.lastname.$error }", type="text", v-model="user.lastname", @blur="$v.user.lastname.$touch()", aria-labelledby="subscribe-lname-label", aria-describedby="subscribe-lname-error", :aria-invalid="$v.user.lastname.$error", placeholder="Last name")
					p#subscribe-lname-error.help(:class="{ 'is-danger': $v.user.lastname.$error }", aria-live="assertive", v-if="$v.user.lastname.$dirty && !$v.user.lastname.required") Last name is required
			.field(role="radiogroup", aria-labelledby="subscribe-gender-title")
				h3#subscribe-gender-title.has-text-weight-bold Select gender
				.control
					label#subscribe-gender-label-1.radio(for="subscribe-gender-input-1")
						input#subscribe-gender-input-1(type="radio", name="subscribe-gender-input", value="female", v-model="user.gender", aria-labelledby="subscribe-gender-label", checked)
						|  Female
					label#subscribe-gender-label-2.radio(for="subscribe-gender-input-2")
						input#subscribe-gender-input-2(type="radio", name="subscribe-gender-input", value="male", v-model="user.gender", aria-labelledby="subscribe-gender-label")
						|  Male
			.field
				.label
					label#subscribe-age-label.label(for="subscribe-age-select") Age group
				.control
					.select
						select#subscribe-age-select(name="subscribe-age-select", v-model="user.age", aria-labelledby="subscribe-age-label")
							option(value="Child (0-18)", selected) Child (0-18)
							option(value="Young Adults (17-39)") Young Adults (17-39)
							option(value="Middle-aged Adults (40-59)") Middle-aged Adults (40-59)
							option(value="Old-aged Adults (Above 60)") Old-aged Adults (Above 60)
			.level
				.level-item.has-text-centered
				div
					button.button.is-primary(type="submit") Next step

</template>
<script>
import { required } from "vuelidate/lib/validators";
import Steps from "@/components/common/Steps";

export default {
	name: "PersonalForm",
	components: {
		Steps
	},
	data() {
		return {
			user: {
				firstname: "",
				lastname: "",
				gender: "female",
				age: "Child (0-18)"
			},
			submitted: false,
			hasError: false,
		};
	},
	props: {
		msg: String,
	},
	validations: {
		user: {
			firstname: { required },
			lastname: { required }
		},
	},
	methods: {
		handleSubmit() {
			this.submitted = true;
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}
			this.$emit("submit-user-data", this.user);
		}
	},
};
</script>
<style scoped lang="scss">
@import "../../common/css/variables";
</style>
