<template lang="pug">
	section.section.is-relative
		img.column.is-6.is-hidden-touch(style='position: absolute; top: 0; left: 0; object-fit: cover; height: 100%' src='https://picsum.photos/seed/picsum/1200/800' alt='')
		img.is-hidden-desktop.is-fullwidth(style='max-height: 512px; width: 100%; object-fit: cover;' src='https://picsum.photos/seed/picsum/1200/800' alt='')
		.container.py-6
			.columns.is-multiline
				.column.is-12.is-6-desktop.ml-auto.has-text-centered
					span.has-text-grey-dark Home Page
					h2.mt-2.mb-4.is-size-1.is-size-3-mobile.has-text-weight-bold Where the craic starts
					p.subtitle.has-text-grey.mb-6 Lorem ipsum dolor
					.buttons.is-centered
						a.button.is-primary(href='#') Go somewhere
						a.button(href='#') Try Again

</template>
<script>
export default {
	name: "HomeView"
};
</script>
