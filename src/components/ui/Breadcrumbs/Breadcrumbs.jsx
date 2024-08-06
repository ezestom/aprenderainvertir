import "./Breadcrumbs.css";
import { useState, useEffect } from "react";
import { NAVBAR } from "../Nav.astro"; // Asegúrate de que la ruta sea correcta

// Definir rutas adicionales que no están en NAVBAR
const ADDITIONAL_ROUTES = [
	{ name: "Anchor 1", href: "#anchor1" },
	{ name: "Internal Section", href: "/internal-section" },
	// Agrega más rutas adicionales aquí según sea necesario
];

export function Breadcrumbs() {
	const [breadcrumbs, setBreadcrumbs] = useState([]);

	useEffect(() => {
		const currentPath = window.location.pathname + window.location.hash;

		// Combinar NAVBAR con ADDITIONAL_ROUTES
		const combinedRoutes = [...NAVBAR, ...ADDITIONAL_ROUTES];

		// Dividir el currentPath en partes
		const pathParts = currentPath.split("/").filter(Boolean);

		// Crear breadcrumbs dinámicos
		const dynamicBreadcrumbs = pathParts.map((part, index) => {
			const href = "/" + pathParts.slice(0, index + 1).join("/");
			const matchingRoute = combinedRoutes.find(
				(route) => route.href === href
			);

			return {
				title: matchingRoute
					? matchingRoute.name
					: decodeURIComponent(part),
				url: href,
			};
		});

		console.log("Dynamic Breadcrumbs:", dynamicBreadcrumbs); // Para depuración

		setBreadcrumbs(dynamicBreadcrumbs);
	}, []);

	return (
		<article className="fixed top-0 mx-auto right-0 left-0 w-fit ">
			<nav
				id="breadcrumbs"
				className=" flex top-0 w-full m-auto inset-0  text-xs font-bold py-2 px-4 backdrop-blur rounded-md rounded-t-none "
				aria-label="breadcrumb">
				<ol className="flex items-center">
					{breadcrumbs.map((breadcrumb, index) => {
						const isLast = index === breadcrumbs.length - 1;
						return (
							<li key={index} className="flex items-center m-0">
								{isLast ? (
									<span className="text-[--darkblue] capitalize-first-letter">
										{breadcrumb.title}
									</span>
								) : (
									<>
										<a
											href={breadcrumb.url}
											className="text-[--darkblue] hover:text-[--darkred] capitalize-first-letter "
											aria-current={
												isLast ? "page" : undefined
											}>
											{breadcrumb.title}
										</a>
										<span className="mx-1 text-[--darkblue] mx-1">
											↪
										</span>
									</>
								)}
							</li>
						);
					})}
				</ol>
			</nav>
		</article>
	);
}
