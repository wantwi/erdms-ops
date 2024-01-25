import React from 'react';
import styles from 'styled-components';
import {dateTemplate} from '../../util/helper';
const PopoverBlock = ({ people, name, text, created }) => {
  
    return (
        <div className="mail-popover-block"  title ={text} >
            <div className="flex-x">
                <div className="mail-photo">
                    <img src={people} alt="people" />
                </div>
                <div className="flex-1">
                    <div className="fs-13 demi-bold-text" onClick ={()=> console.log("you clicked onme")}>
                        {name}
                    </div>
                    <div className="fs-11 medium-text">
                       <Trancate>{text}</Trancate> 
                    </div>
                </div>
                <div className="fs-10 medium-text">
                   
                    {dateTemplate(created)}
                   
                </div>
            </div>
        </div>
    );
};

export default PopoverBlock;

export const Trancate = styles.p`
{
    width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`