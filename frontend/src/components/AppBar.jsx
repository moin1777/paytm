
export function AppBar ({name}) {
  return <div className={"shadow flex justify-between border border-gray-300 h-14"}>
    <div className={"flex flex-col justify-center h-full font-bold text-2xl ml-4"}>
      Payments App
    </div>
    <div className={"flex"}>
      <div className={"flex flex-col justify-center h-full mr-4"}>
        Hello, {name}
      </div>
      <div className={"rounded-full h-12 w-12 bg-gray-200 flex justify-center mt-1 mr-2"}>
        <div className={"flex flex-col justify-center h-full text-xl"}>
          {name[0].toUpperCase()}
        </div>
      </div>
    </div>
  </div>
}