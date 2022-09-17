<template lang="pug">
	form(@submit.prevent="getData", ref="dataQuery")
		.field
			label#subscribe-email-label.label(for="subscribe-email-input") Email address
			.control
				input#subscribe-email-input.input(:class="{ 'is-danger': $v.query.email.$error }", type="text", v-model="query.email", @blur="$v.query.email.$touch()", aria-labelledby="subscribe-email-label", aria-describedby="subscribe-email-error", :aria-invalid="$v.query.email.$error", placeholder="example@example.com")
				p#subscribe-email-error.help(:class="{ 'is-danger': $v.query.email.$error }", aria-live="assertive", v-if="$v.query.email.$dirty && !$v.query.email.required") Email address is required
				p#subscribe-email-error.help(:class="{ 'is-danger': $v.query.email.$error }", aria-live="assertive", v-if="$v.query.email.$dirty && !$v.query.email") Email address is invalid
		.field
			label#subscribe-token-label.label(for="subscribe-token-input") Token id
			.control
				input#subscribe-token-input.input(:class="{ 'is-danger': $v.query.token.$error }", type="text", v-model="query.token", @blur="$v.query.token.$touch()", aria-labelledby="subscribe-token-label", aria-describedby="subscribe-token-error", :aria-invalid="$v.query.token.$error", placeholder="Enter token")
				p#subscribe-token-error.help(:class="{ 'is-danger': $v.query.token.$error }", aria-live="assertive", v-if="$v.query.token.$dirty && !$v.query.token.required") Token is required

		.level
			.level-item.has-text-centered
			div
				button.button.is-primary(@click="getData") Query my data

		.message.is-danger(v-if="noData")
			.message-body
				h3 Error occured when querying data. Please try again!
		.message.is-success(v-if="firebaseData && !noData")
			.message-header
				h3 Confirmation
			.message-body
				DataCards
					template(v-slot:title) Personal
					template(v-slot:content)
						dl
							dt.has-text-weight-bold First name
							dd {{ firebaseData.user.firstname }}
							dt.has-text-weight-bold Last name
							dd {{ firebaseData.user.lastname }}
							dt.has-text-weight-bold Gender
							dd {{ firebaseData.user.gender }}
							dt.has-text-weight-bold Age group
							dd {{ firebaseData.user.age }}
				DataCards
					template(v-slot:title) Address
					template(v-slot:content)
						dl
							dt.has-text-weight-bold Street
							dd {{ firebaseData.address.street }}
							dt.has-text-weight-bold City
							dd {{ firebaseData.address.city }}
							dt.has-text-weight-bold Country
							dd {{ firebaseData.address.country }}
				DataCards
					template(v-slot:title) Contact
					template(v-slot:content)
						dl
							dt.has-text-weight-bold Mail
							dd {{ firebaseData.mail }}
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
import { db } from "@/firebase";
import DataCards from "@/components/common/DataCards";

export default {
	name: "DataQuery",
	components: {
		DataCards,
	},
	data() {
		return {
			query: {
				email: "",
				token: "",
			},
			submitted: false,
			hasError: false,
			//data: null,
			noData: false,
			firebaseData: null,
		};
	},
	validations: {
		query: {
			email: { required, email },
			token: { required },
		},
	},
	methods: {
		getData() {
			const self = this;
			const docRef = db.collection("formData").doc(this.query.token);
			docRef
				.get()
				.then(function (doc) {
					if (doc.exists) {
						self.noData = false;
						const data = doc.data();
						self.firebaseData = JSON.parse(JSON.stringify(data));
						self.$refs.dataQuery.reset();
					} else {
						self.noData = true;
						console.error("No such document!", self.query.token);
						self.$refs.dataQuery.reset();
					}
				})
				.catch(function (error) {
					self.noData = true;
					console.error("Error getting document:", error);
				});
		},
	}
};
</script>
