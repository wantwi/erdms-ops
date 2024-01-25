import React, { useState, useRef, useContext, useMemo, useEffect } from "react";
import { MessageWrapper } from "./MeassageStyle";
import { useParams } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { GlobalContext } from "components/context/GlobalContext";
import className from "classnames";
import Moment from "react-moment";
import LoaderComponent from "components/common/LoaderComponent";
import throttle from 'lodash.throttle';

export const MessageUI = () => {
  const { jobId, activityName } = useParams();
  let [msgInput, setmsgInput] = useState("");
  let [fileAttached, setFileAttached] = useState(null);
  let [fileName, setFileName] = useState("");
  let msgerChat = useRef(null);
  let {
    jobs,
    messages,
    createMessage,
    loggedInCustomerId,
    isLoadingMsgs,
    selectedJobName,
  } = useContext(GlobalContext);

  console.log({ messages });
  const BOT_MSGS = [
    "What's the status of the job?",
    "Ohh... I can't understand what you trying to say. Sorry!",
    "I like to play games... But I don't know how to play!",
    "Sorry if my answers are not relevant. :))",
    "I feel sleepy! :(",
  ];

  // Icons made by Freepik from www.flaticon.com
  const BOT_IMG =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcovkqo-amf8cBG4RJB75t2e3MVVPkR9c1bQ&usqp=CAU";
  const PERSON_IMG =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcovkqo-amf8cBG4RJB75t2e3MVVPkR9c1bQ&usqp=CAU";
  const BOT_NAME = "Fred, Tema";
  const PERSON_NAME = "You";

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(msgInput);
    if (!msgInput) return;
    let dataToSend = {
      title: "",
      messageText: msgInput,
      jobId,
      fileReferenceId: "",
      customerId: loggedInCustomerId,
    };
    let data = createMessage(dataToSend);
    if (data) {
      // return console.log({ data });
      appendMessage(PERSON_NAME, PERSON_IMG, "right", msgInput, fileAttached);
      setmsgInput("");

      botResponse();
    }
  };

  const handleAttachment = (params) => {
    setFileAttached(URL.createObjectURL(params.files[0]));
    setFileName(URL.createObjectURL(params.files[0]).name);
  };

  function appendMessage(name, img, side, text, hasAttachment) {
    if (hasAttachment) {
      const msgHTML = `
      <div class="msg ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>
  
        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">${name}</div>
            <div class="msg-info-time">${formatDate(new Date())}</div>
          </div>
          <img style="width: 40px height: 40px" src='${hasAttachment}' />
          <div class="msg-text">${text}</div>
        </div>
      </div>
      `;
      msgerChat.current.insertAdjacentHTML("beforeend", msgHTML);
      msgerChat.current.scrollTop += 500;
      setFileAttached(null);
      setFileName("");
      return true;
    }
    const msgHTML = `
      <div class="msg ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>
  
        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">${name}</div>
            <div class="msg-info-time">${formatDate(new Date())}</div>
          </div>
          <div class="msg-text">${text}</div>
        </div>
      </div>
      `;
    msgerChat.current.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.current.scrollTop += 500;
  }

  function botResponse() {
    const r = random(0, BOT_MSGS.length - 1);
    const msgText = BOT_MSGS[r];
    const delay = msgText.split(" ").length * 100;

    setTimeout(() => {
      appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
    }, delay);
  }

  function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();

    return `${h.slice(-2)}:${m.slice(-2)}`;
  }

  function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const eventHandler = () => {
   
    console.log({throttled:"throttled"})
  };


  const throttledEventHandler = useMemo(
    () => throttle(eventHandler, 300)
  , []);


  useEffect(() => {
   
  
    throttledEventHandler()
  }, [])
  

  return (
    <>
      <MessageWrapper>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <Sidebar jobId={jobId} />
          <section
            className="msger"
            style={{ flex: "4", height: "75vh", overflow: "scroll" }}
          >
            <header className="msger-header">
              <div
                className="msger-header-title"
                style={{ color: "rgb(92, 37, 141)" }}
              >
                <i className="fas fa-comment-alt"></i>Chats for Job{" "}
                {selectedJobName}
              </div>
              {/* /BAJ001404441/  */}
              <div className="msger-header-options">
                <span>
                  <i className="fas fa-cog"></i>
                </span>
              </div>
            </header>
            {isLoadingMsgs && <LoaderComponent loading={isLoadingMsgs} />}
            {!isLoadingMsgs && jobs?.length > 0 && !messages && (
              <div
                className="msg-text"
                style={{ display: "flex", justifyContent: "center" }}
              >
                Please select a Job to start messaging
              </div>
            )}
            {!isLoadingMsgs && jobs && messages?.length == 0 && (
              <div
                className="msg-text"
                style={{ margin: "auto", marginTop: "194px" }}
              >
                No messages yet
              </div>
            )}
            {!isLoadingMsgs && jobId && messages?.length > 0 && (
              <main className="msger-chat" ref={msgerChat}>
                {messages.map((message, i) => {
                  return (
                    <div
                      className={className("msg right-msg")}
                    
                    >
                      <div className="msg-img">image</div>

                      <div className="msg-bubble">
                        <div className="msg-info">
                          <div className="msg-info-name">name </div>
                          <div className="msg-info-time">
                           date
                          </div>
                        </div>

                        <div className="msg-text">mesage</div>
                      </div>
                    </div>
                  );
                })}
              </main>
            )}
            {!isLoadingMsgs && jobId && messages != null && (
              <form
                className="msger-inputarea"
                // style={!messages ? { display: "none" } : { display: "flex" }}
              >
                {fileName && <p>{fileName}</p>}
                <input
                  id="uploadFile"
                  type="file"
                  onChange={({ target }) => handleAttachment(target)}
                  accept="image/*"
                  className="btn btn-light mr-2"
                  hidden
                />
                <label
                  style={{ backgroundColor: "#ddd" }}
                  className="mr-2"
                  htmlFor="uploadFile"
                >
                  <i id="uploadFile" className="fas fa-paperclip"></i>
                </label>

                <input
                  type="text"
                  className="msger-input "
                  placeholder="Enter your message..."
                  value={msgInput}
                  style={{ backgroundColor: "white" }}
                  onChange={(e) => setmsgInput(e.target.value)}
                />
                <button
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                  className="msger-send-btn"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            )}
            <div className="msger-inputarea"></div>
          </section>
        </div>
      </MessageWrapper>
    </>
  );
};
