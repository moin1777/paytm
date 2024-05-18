import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export function Amount ({userId, name}) {
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  return <div className={"pl-8 pt-20"}>
    <div className={"flex"}>
      <div className={"h-12 w-12 bg-green-500 rounded-full flex justify-center mr-4"}>
        <div className={"flex flex-col justify-center h-full font-medium text-xl text-white"}>
          {name[0].toUpperCase()}
        </div>
      </div>
      <div className={"flex flex-col justify-center h-full text-xl font-bold pt-2"}>
        {name}
      </div>
    </div>
    <div className={"text-left font-semibold py-2 ml-2"}>
      Amount (in Rs)
    </div>
    <div>
      <input onChange={(e) => setAmount(parseInt(e.target.value))} type={"text"} placeholder={"Enter amount"} className={"border w-96 px-4 py-1 mb-4 mr-8 rounded-md text-lg"}/>
    </div>
    <button onClick={() => {
      axios.post("http://localhost:3000/api/v1/account/transfer", {
        amount: amount,
        to: userId
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((response) => {
          if (response.status === 200) {
            navigate("/dashboard")
          }
        })
    }} type={"button"} className={"border bg-green-500 w-96 mr-8 mb-10 text-white py-2 rounded-lg"}>
      Initiate Transfer
    </button>
  </div>
}