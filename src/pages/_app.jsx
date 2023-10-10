import "@/styles/globals.css";
import { Montserrat } from "next/font/google";
import { ReduxWrapper } from "../redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const monteserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
function App({ Component, pageProps }) {
  return (
    <main className={`${monteserrat.variable} font-montserrat`}>
      <ToastContainer
        autoClose={2000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        position={"top-center"}
      />
      <Component {...pageProps} />
    </main>
  );
}

export default ReduxWrapper.withRedux(App);
