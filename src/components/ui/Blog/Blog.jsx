import close from "../../../icons/x.svg";
import { useState, useEffect } from "react";
import "./Blog.css";

export function Blog({ text, title, description }) {
	const [isOpen, setIsOpen] = useState(false);

	const openDialog = () => {
		setIsOpen(true);
		console.log("open");
		// stop scroll
		// document.body.style.overflow = "hidden";
	};
	const closeDialog = () => {
		setIsOpen(false);
		// enable scroll
		// document.body.style.overflow = "auto";
	};

	// Función para convertir \n en <br />
	const formatDescription = (desc) => {
		return desc.split("\n").map((paragraph, index) => (
			<p key={index}>
				{paragraph}
				<br />
			</p>
		));
	};
	// create a function, if press esc close the modal

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape") {
				setIsOpen(false);
				document.body.style.overflow = "auto";
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<div className="">
			<button onClick={openDialog} className="text-4xl">
				{text}
			</button>

			{isOpen && (
				<section className="fixed  inset-0 z-100  items-center justify-center bg-black bg-opacity-50 flex flex-col ">
					<article className="relative h-full w-full max-w-xl  bg-blue-600 dark:bg-gray-800 rounded-xl overflow-y-scroll max-h-[99%]  border border-gray-100 dark:shadow-none dark:border-gray-700">
						<div className="relative overflow-hidden rounded-t-xl ">
							<button
								onClick={closeDialog}
								className="w-fit absolute top-0 right-0 p-2 bg-black rounded-xl rounded-e-none rounded-t-none hover:scale-105  transition duration-300 z-80">
								<img
									src={close.src}
									alt="close"
									className="w-10 "
								/>
							</button>
							<img
								src={image.src}
								alt="art cover"
								loading="lazy"
								className=" w-full max-h-[300px] object-cover mx-auto shadow-2xl shadow-gray-600/10"
							/>
						</div>
						<div className="p-4 md:p-6">
							<h3 className="mt-6 text-xl font-semibold text-gray-800 dark:text-white">
								{title}
							</h3>
							<p className="mt-6 text-base text-gray-600 dark:text-gray-300 text-pretty">
								{description}
							</p>
						</div>
					</article>
				</section>
			)}
		</div>
	);
}
