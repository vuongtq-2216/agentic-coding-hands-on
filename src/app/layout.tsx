import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Montserrat_Alternates } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const montserrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin", "vietnamese"],
	weight: ["400", "500", "600", "700"],
});

const montserratAlternates = Montserrat_Alternates({
	variable: "--font-montserrat-alternates",
	subsets: ["latin", "vietnamese"],
	weight: ["700"],
});

export const metadata: Metadata = {
	title: "SAA 2025 - Sun Annual Awards",
	description: "Sun Annual Awards 2025 - ROOT FURTHER",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="vi">
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${montserratAlternates.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
