import {Heading} from "../components/Heading.jsx";
import {Amount} from "../components/Amount.jsx";
import {useSearchParams} from "react-router-dom";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  const name = searchParams.get("first_name")
  return <div className={"flex justify-center h-screen bg-gray-100"}>
    <div className={"flex flex-col justify-center w-[30%]"}>
      <div className={"border shadow-lg rounded-lg bg-white text-center pt-4"}>
        <Heading label={"Send Money"}></Heading>
        <Amount userId={id} name={name}/>
      </div>
    </div>
  </div>
}