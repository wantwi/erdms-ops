import React from "react";
import className from "classnames";

const Bubble = ({ side, message, date, name }) => {
  return (
    <div
      className={
        side === "left" ? className(`msg left-msg`) : className(`msg right-msg`)
      }
    >
      {/* <div className="msg-img">image</div> */}

      <div className="msg-bubble">
      <span className="msg-info-time text-black" style={{color:"black"}}>{name}</span>
        <p className="msg-text" style={{marginTop:0}}>{message}</p>
        <span className="msg-info-time text-black" style={{color:"black", float: side ? "right" :"left"    }}>{date}</span>
        {/* <div className="msg-info" style={{padding:0,margin:0}}>
         
        </div> */}
      </div>
    </div>
  );
};

export default Bubble;
