import Main from "./Components/Main";
import {BrowserRouter} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"

function App() {
  return (
    <>
        <BrowserRouter>
        <Main/>
        </BrowserRouter>
    </>
  );
}

export default App;
