import Header from "@/components/Header";

import Footer from "@/components/Footer";

import { ToastContainer } from "react-toastify";

import "react-toastify/ReactToastify.css";

function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToastContainer position="bottom-left" limit={2} />
      <div className="min-h-screen flex flex-col justify-between">
        <Header />
        <main className="container grow basis-0 py-5">{children}</main>
        <Footer />
      </div>
    </>
  );
}

export default App;
