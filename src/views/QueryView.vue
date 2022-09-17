<template lang="pug">
	section
		.column.is-half.is-offset-one-quarter
			h1.mb-3.is-size-3.is-size-3-mobile.has-text-weight-bold.has-text-centered Get data
			.box
				DataQuery
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
import { db } from "@/firebase";
import DataQuery from "@/components/DataQuery";

export default {
	name: "QueryView",
	components: {
		DataQuery
	},
	data() {
		return {
			query: {
				email: "",
				token: "",
			},
			submitted: false,
			hasError: false,
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
						const data = doc.data();
						self.firebaseData = JSON.parse(JSON.stringify(data));
					} else {
						self.noData = true;
						console.error("No such document!");
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
