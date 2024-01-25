import React from "react";
import Moment from 'react-moment';

export const renderDocument = (data) => {

    return data.map((x) => ({...x,documentTypeName:x.documentType.name}))

}


export const renderRequirements = (data) => {

    return data.map((x) => ({...x,document:x.document.name,requirementAction:x.requirementAction.name,requirementType:x.requirementType.name}))

}

export const dateTemplate = ({date})=>{
 
    return (
      <Moment format="MMM DD YYYY" >
         {date}
      </Moment>
  );
  }
  