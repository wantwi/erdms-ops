import styled from "styled-components";
export const MessageWrapper = styled.div`
:root {
  --body-bg: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  --msger-bg: #fff;
  --border: 2px solid #ddd;
  --left-msg-bg: #ececec;
  --right-msg-bg: #579ffb;
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: var(--body-bg);
  font-family: Helvetica, sans-serif;
}

.msg-bubble * {
  color: whitesmoke;
}

.msger {
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  width: 100%;
  max-width: 867px;
  margin: 25px 10px;
  height: calc(100% - 50px);
  border: var(--border);
  border-radius: 5px;
  background: var(--msger-bg);
  box-shadow: 0 15px 15px -5px rgba(0, 0, 0, 0.2);
}

.msger-header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: var(--border);
  background: #eee;
  color: #666;
}

.msger-chat {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}
.msger-chat::-webkit-scrollbar {
  width: 6px;
}
.msger-chat::-webkit-scrollbar-track {
  background: #ddd;
}
.msger-chat::-webkit-scrollbar-thumb {
  background: #bdbdbd;
}
.msg {
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
}
.msg:last-of-type {
  margin: 0;
}
.msg-img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  background: #ddd;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
}
.msg-bubble {
  max-width: 450px;
  padding: 15px;
  border-radius: 15px;
  background: var(--left-msg-bg);
}
.msg-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.msg-info-name {
  margin-right: 10px;
  font-weight: bold;
}
.msg-info-time {
  font-size: 0.85em;
}

.left-msg .msg-bubble {
  border-bottom-left-radius: 0;
  background-color: #2d2d84
}

.right-msg {
  flex-direction: row-reverse;
}
.right-msg .msg-bubble {
  background: var(--right-msg-bg);
  color: #fff;
  border-bottom-right-radius: 0;
  background-color: grey
}
.right-msg .msg-img {
  margin: 0 0 0 10px;
}

.msger-inputarea {
  display: flex;
  padding: 10px;
  border-top: var(--border);
  background: #eee;
}
.msger-inputarea * {
  padding: 10px;
  border: none;
  border-radius: 3px;
  font-size: 1em;
}
.msger-input {
  flex: 1;
  background: #ddd;
}
.msger-send-btn {
  margin-left: 10px;
  background: rgb(0, 196, 65);
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.23s;
}
.msger-send-btn:hover {
  background: rgb(0, 180, 50);
}

.msger-chat {
  // background-image: linear-gradient(rgba(0, 0.2, 0.5, 0.9),rgba(0, 0, 0, 0.3)) , url(data:image/jpeg;base64,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);
  backgroound-color: 'whitesmoke'
  background-repeat: no-repeat;
  background-size: cover;
  background-position: left;
   
}

a:hover {
  text-decoration: none;
}

.sideItem:active {
  animation-name: moveInLeft;
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
}

.isActiveSideItem {
  border-right: 5px solid rgb(92, 37, 141);
}

 .msger-input {
  height: 40px
}
  
   .msger-inputarea * {
      padding: 6px;
  }
  
  .sideItem p {
      font-size: small;
  }
  
  .msger-header-title {
      font-size: smaller;
  }

   .msger-inputarea {
      padding: 2px;
  }

@keyframes moveInLeft {
  0% {
    opacity: 0;
    transform: translateX(-10rem); }
  80% {
    transform: translateX(1rem); }
  100% {
    opacity: 1;
    transform: translate(0); } }

@keyframes moveInRight {
  0% {
    opacity: 0;
    transform: translateX(10rem); }
  80% {
    transform: translateX(-1rem); }
  100% {
    opacity: 1;
    transform: translate(0); } }

@keyframes moveInBottom {
  0% {
    opacity: 0;
    transform: translateY(3rem); }
  100% {
    opacity: 1;
    transform: translate(0); } }

    

`
