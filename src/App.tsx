import {Navigation} from "./routes";
import { ThemeProvider } from '@material-ui/core';
import theme from "./themeConfig";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context";


function App() {
 
  return (
    <>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Navigation/>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
      </ThemeProvider>
    </AuthProvider>

   
    </>
  );
}

export default App;
