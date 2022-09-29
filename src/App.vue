<template lang="pug">
	#app
		nav.navbar.is-primary(role='navigation' aria-label='main navigation')
			.navbar-brand
				a.navbar-item(href='/')
					img(src='https://bulma.io/images/bulma-logo.png' width='112' height='28')
				a.navbar-burger(role='button' aria-label='menu' aria-expanded='false' data-target='navbarBasicExample', @click="menuToggle = !menuToggle" :class="{ 'is-active': menuToggle }")
					span(aria-hidden='true')
					span(aria-hidden='true')
					span(aria-hidden='true')
			#navbarBasicExample.navbar-menu(:class="{ 'is-active': menuToggle }")
				.navbar-start
					router-link.navbar-item(to="/home", active-class="is-active") Home
					router-link.navbar-item(to="/form", active-class="is-active") Form
					router-link.navbar-item(to="/get-data", active-class="is-active") Get data
					router-link.navbar-item(to="/secret", active-class="is-active") Secret
			NavbarEnd
		main(role="main")
			router-view


</template>
<script>
import NavbarEnd from "@/components/NavbarEnd";

export default {
	name: "App",
	components: {
		NavbarEnd,
	},
	data() {
		return {
			menuToggle: false,
		};
	},
};
</script>
<style lang="scss">
@import "common/css/main.scss";
[v-cloak] {
	display: none;
}
</style>
