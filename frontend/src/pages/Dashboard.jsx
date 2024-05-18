import {AppBar} from "../components/AppBar.jsx";
import {Balance} from "../components/Balance.jsx";
import {Users} from "../components/Users.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

export const Dashboard = () => {
  const [name, setName] = useState("U");
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/user/userInfo", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((response) => {
        setName(response.data.firstName);
        setBalance(response.data.balance);
      })
  },[]);

  return <div>
    <AppBar name={name}/>
    <div>
      <Balance value={balance}/>
      <Users/>
    </div>
  </div>
}