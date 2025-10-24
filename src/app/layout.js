import "@/styles/globals.scss";

export const metadata = {
  title: "Rifraich - Auth Devtool",
  description: "Devtool pour l'authentification Rifraich",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
