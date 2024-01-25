import { userLogout } from "config/config"
import useAuth from "hooks/useAuth"
import React, {useEffect, useState} from "react"
import { useIdleTimer } from 'react-idle-timer'
import { Button} from "reactstrap"
import Dock from "./Dock"



const IdleTimerComponet = () =>{
  const {auth} = useAuth()
    const timeout = 1000 * 60 * 10
    const promptTimeout = 1000 * 30
     
  const [open, setOpen] = useState(false)
  const [remaining, setRemaining] = useState(0)

  const onPrompt = () => {
    // onPrompt will be called after the timeout value is reached
    // In this case 30 minutes. Here you can open your prompt. 
    // All events are disabled while the prompt is active. 
    // If the user wishes to stay active, call the `reset()` method.
    // You can get the remaining prompt time with the `getRemainingTime()` method,
    setOpen(true)
    setRemaining(promptTimeout)
  }

  const onIdle = () => {
    // onIdle will be called after the promptTimeout is reached.
    // In this case 30 seconds. Here you can close your prompt and 
    // perform what ever idle action you want such as log out your user.
    // Events will be rebound as long as `stopOnMount` is not set.
    
    setOpen(false)
    userLogout()
    setRemaining(0)
  
  }

  const onActive = () => {
    // onActive will only be called if `reset()` is called while `isPrompted()` 
    // is true. Here you will also want to close your modal and perform
    // any active actions. 
    setOpen(false)
    setRemaining(0)
  }

  const { getRemainingTime, isPrompted, activate } = useIdleTimer({
    timeout,
    promptTimeout,
    onPrompt,
    onIdle,
    onActive
  })

  const handleStillHere = () => {
    setOpen(false)
    activate()
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPrompted()) {
        setRemaining(Math.ceil(getRemainingTime() / 1000))
      }
    
    }, 1000)
   
    return () => {
      clearInterval(interval)
    }
  }, [getRemainingTime, isPrompted])



    return (
    
           
      <Dock position='top' fluid={true} duration={1000}  isVisible={open}  >

        <div style={{display:'flex', justifyContent:'center',flexDirection:"column", alignItems:"center", height:'100%'}}>
          <h1>Hi, {auth?.given_name}</h1>
        <p style={{fontSize:25, alignItems:"center"}}>Logging you out in <span style={{color:"red",fontWeight:"900", fontSize:30}}>{remaining}</span> seconds</p>
      
        <div style={{}}>
          <Button onClick={userLogout} className="c-danger mr-2">Log me Out</Button>
          <Button onClick={handleStillHere} className="c-primary">I'm Still Here</Button>
        </div>
        
          </div>
        
    </Dock>
        
    )

}

export default IdleTimerComponet