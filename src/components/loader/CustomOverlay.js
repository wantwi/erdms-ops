
import React, { useEffect } from "react"
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { setResponse } from "redux/loader/Loader";
import Load from "../../assets/gif/load.gif"
import Message from "views/message/Message";


const CustomOverLay = (props) => {
  const dispatch = useDispatch();
  const { isLoading, message, success } = useSelector(state => state.helperState)
  const {showDialog} = useSelector(state => state.jobmessagesState)

  const notify = (txt) => toast.success(txt, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    onClose: { onCloseToast }
  })

  const onCloseToast = () => {
    dispatch(setResponse("", true))
  }

  const notifyError = (txt) => toast.error(txt, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined, 
  })


  useEffect(() => {

    if (message) {
      success ? notify(message) : notifyError(message)
    }

  }, [message])

  return (
    <>
      <LoadingOverlay
        active={isLoading}
        spinner={<img src={Load} />}
      
      >
    
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={1}

        />
        {
          props.children
        }



      </LoadingOverlay>
      {
                    showDialog ?   <Message/> : null
                }
    </>
  )




}

export default CustomOverLay