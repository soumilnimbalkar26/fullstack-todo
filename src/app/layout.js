import "./globals.css";
import QueryProvider from "../../components/queryProvider/QueryProvider";

export const metadata = {
  title: "Momentum Todo",
  description: "A focused task board for planning the day and clearing the list.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
