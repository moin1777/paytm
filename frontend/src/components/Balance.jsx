
export function Balance ({value}) {
  return <div className={"flex ml-4 py-6"}>
    <div className={"font-bold text-2xl"}>
      Your Balance
    </div>
    <div className={"font-bold text-2xl ml-4"}>
      ₹{value}
    </div>
  </div>
}