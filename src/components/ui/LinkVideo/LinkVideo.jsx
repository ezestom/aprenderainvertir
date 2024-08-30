import { useState } from "react";
import close from "../../../icons/x.svg";
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
		<article>
			<strong className="px-1 ">
				<button className="inline-flex" onClick={openDialog}>
					{buttonName}
				</button>
			</strong>
			{isOpen && (
				<dialog
					open
					className="z-50 fixed h-screen w-screen top-0 left-0 bg-[#fafafa] ">
					<aside class="mx-auto w-full max-w-[70ch] scroll-mt-16 lg:scroll-mt-32 2xl:right-auto px-4 md:px-10 flex flex-col  ">
						<div className="pt-12  mx-auto flex items-start justify-between text-center">
							<div className="">
								<h2 className="pb-2 m-0">{title}</h2>
								<p className="text-gray-500 text-base font-normal mb-0">
									{description}
								</p>
							</div>
							<div>
								<button
									className="bg-[--lightblue]  rounded-md z-100 hover:scale-105 transition-transform duration-300 ease-in-out ml-2 active:scale-95"
									onClick={closeDialog}>
									<img src={close.src} alt="close button" />
								</button>
							</div>
						</div>

						<div
							className="w-full aspect-video rounded-md overflow-hidden shadow-xl border-0 mt-12"
							style={{ background: "rgba(0,0,0,0.05)" }}>
							<lite-youtube
								videoid={youtubeUrl}
								videoStartAt="5"
								posterquality="maxresdefault"
								params="autoplay=1&mute=0&loop=0&controls=1&modestbranding=0&playsinline=0&rel=0&enablejsapi=1"></lite-youtube>
						</div>
					</aside>
				</dialog>
			)}
		</article>
	);
}
