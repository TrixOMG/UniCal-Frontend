/** @type {import('tailwindcss').Config} */
module.exports = {
	purge: {
		content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
		safelist: [
			"grid-cols-1",
			"grid-cols-2",
			"grid-cols-3",
			"grid-cols-4",
			"grid-cols-5",
			"grid-cols-6",
			"grid-cols-7",
			"grid-rows-1",
			"grid-rows-2",
			"grid-rows-4",
			"grid-rows-5",
			"grid-rows-6",
			"grid-rows-7",
		],
	},
	theme: {
		extend: {
			fontFamily: {},
			gridTemplateColumns: {
				"1/5": "1fr 5fr",
			},
		},
	},
	plugins: [],
};
