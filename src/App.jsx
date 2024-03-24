import SideBar from "./Components/SideBar/SideBar"
import Timer from "./Components/Timer/Timer"
import { UseTimer } from "./Context/TimerContext"

import { useEffect } from 'react';
import { useState } from 'react';
import { flushSync } from "react-dom";

function App() {
  const { statusTimer } = UseTimer();
  const [IsFocus, setIsFocus] = useState(false)

  useEffect(() => {
    document.startViewTransition(() =>{
      flushSync(() => {
        if (statusTimer === 2 || statusTimer === 6) {
          setIsFocus(true)
    
        } else if (statusTimer === 0) {
          setIsFocus(false)
        }
      })
    })

  }, [statusTimer])


  return (
    <>
      {!IsFocus ?
        <div className="d-flex h-100 gap-2 bg-body p-2 ">
          <SideBar />
          <Timer />
        </div>
        :
        <div className="d-flex h-100 gap-2 bg-body p-2 ">
          <Timer />
        </div>

      }
    </>
  )
}

export default App
