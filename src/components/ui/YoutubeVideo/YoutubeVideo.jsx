import "./YoutubeVideo.css";

export function YoutubeVideo({ title, subtitle, url_1, url_2 }) {
	return (
		<picture class="">
			<h1 class="pt-8">{title}</h1>
			<h3 class="py-2">{subtitle}</h3>
			<iframe
				style="width: 100%; aspect-ratio: 16/9; border-radius: 1.5rem; margin-bottom: 2rem;"
				src={url_1}
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen></iframe>
			<iframe
				style="width: 100%; aspect-ratio: 16/9; border-radius: 1.5rem; margin-bottom: 2rem;"
				src={url_2}
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen></iframe>
		</picture>
	);
}
