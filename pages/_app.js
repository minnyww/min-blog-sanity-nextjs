import "bootstrap/dist/css/bootstrap.min.css";
import "styles/index.scss";
import ThemeProvider from "providers/ThemeProvider";
import "highlight.js/styles/darcula.css";

function MyApp({ Component, pageProps }) {
   return (
      <ThemeProvider>
         <Component {...pageProps} />;
      </ThemeProvider>
   );
}

export default MyApp;
