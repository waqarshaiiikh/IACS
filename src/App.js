import Main from "./Components/Main";
import { BrowserRouter } from "react-router-dom";
import { useEffect,useContext } from "react";
import noteContext from "./context/notes/noteContext";



function App() {
  const a = useContext(noteContext)

        useEffect(() => {
          if(a.Signin){
            const getProfileData = async () => {
              await a.gettingData().catch(e=>console.log(e));
            }
            getProfileData(); 
            // eslint-disable-next-line
          }
        
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
