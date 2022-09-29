<template lang="pug">
	div
		keep-alive
			PersonalForm(v-if="step === 1", @submit-user-data="submitPersonalData")
			AddressForm(v-if="step === 2", @submit-address-data="submitAddressData", @back-page="backPage")
			MailForm(v-if="step === 3", @submit-mail-data="submitMailData", @back-page="backPage")
		.message.is-success(v-if="step === 4 && !submitted")
			.message-header
				h3 Confirmation page
			.message-body(v-if="formData")
				DataCards
					template(v-slot:title) Personal details
					template(v-slot:content)
						dl
							dt.has-text-weight-bold First name
							dd {{ formData.user.firstname }}
							dt.has-text-weight-bold Last name
							dd {{ formData.user.lastname }}
							dt.has-text-weight-bold Gender
							dd {{ formData.user.gender }}
							dt.has-text-weight-bold Age group
							dd {{ formData.user.age }}
					template(v-slot:footer)
						p.card-footer-item
							a.button.is-warning.is-light(href="", @click="step = 1") edit personal details
				DataCards
					template(v-slot:title) Address details
					template(v-slot:content)
						dl
							dt.has-text-weight-bold Street
							dd {{ formData.address.street }}
							dt.has-text-weight-bold City
							dd {{ formData.address.city }}
							dt.has-text-weight-bold Country
							dd {{ formData.address.country }}
					template(v-slot:footer)
						p.card-footer-item
							a.button.is-warning.is-light(href="", @click="step = 2") edit address details
				DataCards
					template(v-slot:title) Contact details
					template(v-slot:content)
						dl
							dt.has-text-weight-bold Mail
							dd {{ formData.mail }}
					template(v-slot:footer)
						p.card-footer-item
							a.button.is-warning.is-light(href="", @click="step = 3") edit contact details
				.level
					.level-item.has-text-centered
					div
						button.button.is-success(@click="sendData") Confirm data
		.technical-error(v-if="technicalError")
			h2 Error, please retry!
		.message.is-success(v-if="submitted && token")
			.message-header
				h3 Success fill
			.message-body
				h4 Filled successfully, thanks for that!
				h5 You can query your data any time on get data page with the following token.
				.field.has-addons.mt-5.is-justify-content-center
					.control
						input.input(type='text', readonly, :value="token", v-on:focus="$event.target.select()", ref="token", size="24")
					.control
						a.button.is-info(@click="copyToClipboard", ref="copy")
							| copy

				.level
					.level-item.has-text-centered
						a.button.is-success.mt-4(href="/form") Fill form again
</template>
<script>
import Steps from "@/components/common/Steps";
import PersonalForm from "@/components/forms/Personal";
import AddressForm from "@/components/forms/Address";
import MailForm from "@/components/forms/Mail";
import DataCards from "@/components/common/DataCards";
import { db } from "@/firebase";

export default {
	name: "Form",
	components: {
		AddressForm,
		PersonalForm,
		MailForm,
		DataCards,
		Steps,
	},
	data() {
		return {
			step: 1,
			technicalError: false,
			formData: {
				user: {},
				address: {},
				mail: null,
			},
			submitted: false,
			token: null,
		};
	},
	methods: {
		submitPersonalData(users) {
			this.formData.user = users;
			this.step += 1;
		},
		submitAddressData(address) {
			this.formData.address = address;
			this.step += 1;
		},
		submitMailData(mail) {
			this.formData.mail = mail;
			this.step += 1;
		},
		backPage(step) {
			this.step = step;
		},
		sendData() {
			const self = this;
			db.collection("formData")
				.add(this.formData)
				.then(function (docRef) {
					self.token = docRef.id;
				})
				.catch(function (error) {
					console.error("Error sending form: ", error);
				});
			this.submitted = true;
		},
		copyToClipboard() {
			this.$refs.token.focus();
			document.execCommand("copy");
			this.$refs.copy.text = "copied";
		},
	},
};
</script>
<style lang="scss">
@import "../common/css/variables";

.card {
	text-align: left;
}

dl {
	margin-bottom: 15px;
}

.level {
	margin-top: 15px;
}
</style>
