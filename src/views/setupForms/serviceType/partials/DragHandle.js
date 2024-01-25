import { DragIconWrapper } from "./styles";
import { ReactComponent as DragHandleIcon } from "./drag_handle-black-18dp.svg";
import React from "react";
import * as FaIcons from "react-icons/fa"

export function DragHandle(props) {
  return (
    <DragIconWrapper {...props}>
      <FaIcons.FaArrowsAlt className="fa-2x" style={{fontSize:18}} />
    </DragIconWrapper>
  );
}

