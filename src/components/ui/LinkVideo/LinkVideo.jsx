import { useState } from "react";
import close from "../../../icons/x.svg";
import "./LinkVideo.css";

export function LinkVideo({ buttonName, youtubeUrl, title, description }) {
	const [isOpen, setIsOpen] = useState(false);

	const openDialog = () => {
		setIsOpen(true);
		// stop scroll
		document.body.style.overflow = "hidden";
	};
	const closeDialog = () => {
		setIsOpen(false);
		// enable scroll
		document.body.style.overflow = "auto";
	};

	return (
		<article className="">
			<strong className="px-1">
				<button onClick={openDialog}>{buttonName}</button>
			</strong>
			{isOpen && (
				<dialog
					open
					className="z-50 fixed h-screen w-screen top-0 left-0 bg-[#fafafa] ">
					<iframe
						className="m-auto bottom-0 top-0 left-0 right-0 absolute w-full md:w-[75%] xl:w-[50%]  aspect-video rounded-md shadow-md border-0"
						style={{ background: "rgba(0,0,0,0.05)" }}
						src={youtubeUrl + "&autoplay=1&vq=hd1080"}
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowFullScreen></iframe>

					<div className="fixed w-full top-10 mx-auto flex flex-col items-center justify-center text-center">
						<button
							className="bg-[--lightblue] rounded-md z-80 hover:scale-105 transition close-button "
							onClick={closeDialog}>
							<img src={close.src} alt="close button" />
						</button>
						<h2 className="py-2 m-0">{title}</h2>
						<p className="text-gray-500 text-base font-normal mb-0">
							{description}
						</p>
					</div>
				</dialog>
			)}
		</article>
	);
}
