<template lang="pug">
	section
		.column.is-half.is-offset-one-quarter
			h1.mb-3.is-size-3.is-size-3-mobile.has-text-weight-bold.has-text-centered Form
			.box
				Form
</template>
<script>
import Form from "@/components/Form";
import PersonalForm from "@/components/forms/Personal";
import AddressForm from "@/components/forms/Address";
import MailForm from "@/components/forms/Mail";

export default {
	name: "FormView",
	components: {
		Form,
		AddressForm,
		PersonalForm,
		MailForm,
	},
};
</script>
