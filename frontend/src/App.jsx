
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Signup} from "./pages/Signup.jsx";
import {Signin} from "./pages/Signin.jsx";
import {Dashboard} from "./pages/Dashboard.jsx";
import {SendMoney} from "./pages/SendMoney.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/signup"} element={<Signup/>}></Route>
          <Route path={"/signin"} element={<Signin/>}></Route>
          <Route path={"/dashboard"} element={<Dashboard/>}></Route>
          <Route path={"/send"} element={<SendMoney/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
