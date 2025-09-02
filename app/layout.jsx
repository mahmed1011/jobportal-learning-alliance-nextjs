import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Learning Alliance Job Portal",
  description: "Job Portal for Learning Alliance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="bg-gray-100 flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
