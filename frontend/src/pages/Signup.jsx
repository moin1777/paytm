import {Heading} from "../components/Heading.jsx";
import {SubHeading} from "../components/SubHeading.jsx";
import {InputBox} from "../components/InputBox.jsx";
import {Button} from "../components/Button.jsx";
import {BottomWarning} from "../components/BottomWarning.jsx";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 return <div className={"bg-slate-300 h-screen flex justify-center"}>
   <div className={"flex flex-col justify-center"}>
     <div className={"rounded-lg bg-white w-80 text-center pt-2 h-max px-4"}>
       <Heading label={"Sign up"}/>
       <SubHeading label={"Enter your infromation to create an account"}/>
       <InputBox onChange={(e) => setFirstName(e.target.value)} label={"First Name"} placeholder={"Moin"}/>
       <InputBox onChange={(e) => setLastName(e.target.value)} label={"Last Name"} placeholder={"Malek"}/>
       <InputBox onChange={(e) => setUsername(e.target.value)} label={"Email"} placeholder={"moin@gmail.com"}/>
       <InputBox onChange={(e) => setPassword(e.target.value)} label={"Password"} placeholder={"123123"}/>
       <div className={"pt-4"}>
         <Button onClick={async () => {
           const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
             firstName,
             lastName,
             username,
             password
           });
           if (response.status === 200) {
             localStorage.setItem("token", response.data.jwt);
             navigate("/dashboard")
           }
         }} label={"Sign up"}/>
       </div>
       <div>
         <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"}/>
       </div>
     </div>
   </div>
 </div>
}