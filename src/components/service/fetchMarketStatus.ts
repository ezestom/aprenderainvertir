// src/service/fetchMarketStatus.ts

const apiKey = "6H2RP567RM9ZPCTG"; // Reemplaza 'demo' con tu propia clave API
const url = `https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=${apiKey}`;

export const fetchMarketStatus = async (): Promise<void> => {
	try {
		// Realiza la solicitud fetch
		const response = await fetch(url);

		// Verifica si la respuesta es exitosa
		if (!response.ok) {
			throw new Error(`Error ${response.status}: ${response.statusText}`);
		}

		// Intenta parsear la respuesta como JSON
		const data = await response.json();

		// Muestra los datos en la consola
		console.log(data);
	} catch (error) {
		// Maneja los errores de la solicitud y del parsing
		if (error instanceof Error) {
			console.error("Error:", error.message);
		} else {
			console.error("Unexpected Error:", error);
		}
	}
};

fetchMarketStatus();
