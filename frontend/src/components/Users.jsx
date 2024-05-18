import {Button} from "./Button.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
export function Users () {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((response) => {
        setUsers(response.data.user);
      });
  },[filter])
  return <div className={"ml-4"}>
    <div className={"font-bold text-2xl"}>
      Users
    </div>
    <div>
      <input onChange={
        (e) => setFilter(e.target.value)
      } type={"text"} placeholder={"Search Users...."} className={"text-lg border border-slate-300 w-full rounded my-6 px-2 py-1"}/>
    </div>
    <div>
      {users.map((user, index) => <User key={index} user={user}/>)}
    </div>
  </div>
}


function User ({user}) {
  const navigate = useNavigate();

  return <div className={"flex justify-between mb-2"}>
    <div className={"flex"}>
      <div className={"h-12 w-12 bg-slate-200 rounded-full flex justify-center mr-4"}>
        <div className={"flex flex-col justify-center h-full font-medium"}>
          {user.firstName[0].toUpperCase()}
        </div>
      </div>
      <div className={"flex flex-col justify-center h-full text-xl font-bold"}>
        {user.firstName} {user.lastName}
      </div>
    </div>
    <div className={"flex flex-col justify-center h-full mr-4"}>
      <Button onClick={() => {
        navigate(`/send?id=${user._id}&first_name=${user.firstName}`);
      }} label={"Send Money"}/>
    </div>
  </div>
}