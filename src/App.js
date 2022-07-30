import Main from "./Components/Main";
import { BrowserRouter } from "react-router-dom";
import { useEffect,useContext } from "react";
import noteContext from "./context/notes/noteContext";



function App() {
  const a = useContext(noteContext)

        useEffect(() => {
        const getProfileData = async () => {
          await a.gettingData();
        }
        getProfileData(); 
        // eslint-disable-next-line
    },[]);
        
  return (
    <>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
    </>
  );
}

export default App;
