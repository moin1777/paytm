import {Heading} from "../components/Heading.jsx";
import {SubHeading} from "../components/SubHeading.jsx";
import {InputBox} from "../components/InputBox.jsx";
import {Button} from "../components/Button.jsx";
import {BottomWarning} from "../components/BottomWarning.jsx";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const Signin = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return <div className={"flex justify-center bg-slate-300 h-screen"}>
    <div className={"flex flex-col justify-center"}>
      <div className={"bg-white text-center rounded-lg w-80 pt-2 h-max px-4"}>
        <Heading label={"Sign in"}/>
        <SubHeading label={"Enter your credentials to access your account"}/>
        <InputBox onChange={(e) => setUserName(e.target.value)} label={"Email"} placeholder={"moin@gmail.com"}/>
        <InputBox onChange={(e) => setPassword(e.target.value)} label={"Password"} placeholder={"*******"}/>
        <div className={"pt-4"}>
          <Button onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
              username: username,
              password: password
            });
            console.log(response.status)
            console.log(response.data)
            if (response.status === 200) {
              localStorage.setItem("token", response.data.jwt);
              navigate("/dashboard")
            }
          }} label={"Sign in"}/>
        </div>
        <div>
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"}/>
        </div>
      </div>
    </div>
  </div>
}