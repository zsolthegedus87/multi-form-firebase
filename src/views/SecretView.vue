<template lang="pug">
	section.hero.is-info.welcome.is-small.mt-6
		.hero-body
			.container
				h1.title
					| Logged in!
				h2.subtitle
					| Hello User!

</template>

<script>
export default {
	data() {
		return {
			secrets: "",
		};
	},
};
</script>

<style lang="scss" scoped>
div {
	color: inherit;
}
</style>
