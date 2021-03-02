import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <div className="max-w-screen-lg px-4 py-4 mx-auto flex flex-col">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
