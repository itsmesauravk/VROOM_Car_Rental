import Home from "./Pages/Home";
import { Route,Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/login" element={<Login />}  />
        <Route path="/signup" element={<Signup/>}  />
      </Routes>
    </div>
  );
}

export default App;
