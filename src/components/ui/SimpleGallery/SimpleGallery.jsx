import { useEffect } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

export function SimpleGallery(props) {
	useEffect(() => {
		let lightbox = new PhotoSwipeLightbox({
			gallery: "#" + props.galleryID,
			children: "a",
			pswpModule: () => import("photoswipe"),
		});
		lightbox.init();

		return () => {
			lightbox.destroy();
			lightbox = null;
		};
	}, []);

	return (
		<div className="pswp-gallery my-12  " id={props.galleryID}>
			{props.images.map((image, index) => (
				<a
					href={image.largeURL}
					data-pswp-width={image.width}
					data-pswp-height={image.height}
					data-cropped="true"
					key={props.galleryID + "-" + index}
					target="_blank"
					rel="noreferrer"
					className="">
					<h3 className="my-1">{image.title}</h3>
					<div className="shadow-xl rounded-md">
						<img
							src={image.thumbnailURL}
							alt={image.title || `Image ${index + 1}`}
							className="rounded-sm aspect-video object-cover"
						/>
					</div>
				</a>
			))}
		</div>
	);
}
