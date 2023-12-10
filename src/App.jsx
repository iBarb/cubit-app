import SideBar from "./Components/SideBar/SideBar"
import Timer from "./Components/Timer/Timer"
import { SessionProvider } from "./Context/SessionContext"


function App() {

  return (
    <>
      <SessionProvider>
        <div className="d-flex h-100 gap-2 bg-body p-2">
          <SideBar />
          <Timer />
        </div>
      </SessionProvider>
    </>
  )
}

export default App
