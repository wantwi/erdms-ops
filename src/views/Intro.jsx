import React, { useEffect } from "react";
import { connect } from "react-redux";
import PageTitle from "components/common/PageTitle";
import { useSelector,useDispatch } from "react-redux";
import {CustomAxios} from "../util/customAxios"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";
import { getAllUnreadMessages } from "../redux/notifications/action";
import useAuth from "hooks/useAuth";
import { useGet } from "hooks/useQueryInfo";
import { GetAssignedActivityEndpoint } from "api/apiEndPoint";
import { MiniWidget } from "components/widgets/statisticswidgets";
import jwt from "jsonwebtoken"



const Intro = () => {
  const dispatch = useDispatch()
  const {auth} = useAuth()
  const {sub} = jwt.decode(auth?.accessToken)

  useEffect(() => {
  //  dispatch(getAllUnreadMessages())
   
  }, []);
  const myActivities = (data)=>{
    console.log({myActivities1: data});
    const res =   data.filter(x => x?.officer?.id.toLocaleLowerCase() == sub.toLocaleLowerCase())
    console.log({myActivities: res});
    return res.length
 }
 const myCompleted = (data)=>{
  console.log({myActivities1: data});
  const res =   data.filter(x => (x?.officer?.id.toLocaleLowerCase() == sub.toLocaleLowerCase() && x?.status ==="Completed"))
  console.log({myActivities: res});
  return res.length
}
const myWaitingApproval = (data)=>{
  console.log({myActivities1: data});
  const res =   data.filter(x => (x?.officer?.id.toLocaleLowerCase() == sub.toLocaleLowerCase() && x?.status ==="WaitingApproval"))
  console.log({myActivities: res});
  return res.length
}

const myInProgress = (data)=>{
  console.log({myActivities1: data});
  const res =   data.filter(x => (x?.officer?.id.toLocaleLowerCase() == sub.toLocaleLowerCase() && x?.status ==="InProgress"))
  console.log({myActivities: res});
  return res.length
}

//
  const {data:activities, isLoading} = useGet("activities",GetAssignedActivityEndpoint)
  useEffect(() => {
   
    if(activities){
      myActivities(activities)
      myCompleted(activities)
      myWaitingApproval(activities)
    }
      
  
    return () => {
      
    }
  }, [activities])
  

  return (
    <div>
      <PageTitle title="Dashboard" />

      <div className="plr-15">
        <div className="mtb-30 theme-color">
        <div className="row mlr-0" style={{marginTop: '-15px'}}>
        <div className="col-12 col-xl-3 col-lg-6 col-md-6 col-sm-6 ptb-15">
          {
          isLoading? <Skeleton  baseColor="#e1e2e3" style={{height:'100px', width:'100%'}}/> :
            <MiniWidget
            iconName="fas fa-list"
            iconColor="#6200ea"
            background="white"
            className="demo"
            headline={activities ?myActivities(activities) : 0 }
            subheader="MY ACTIVITIES"
        />
          }
        
        </div>
        <div className="col-12 col-xl-3 col-lg-6 col-md-6 col-sm-6 ptb-15">
        {
          isLoading? <Skeleton  baseColor="#bac8dc" style={{height:'100px', width:'100%'}}/> :
            <MiniWidget
            iconName="fa fa-check-square"
            iconColor="#00c853"
            background="white"
            className="demo"
            headline={activities ? myCompleted(activities) : 0 }
            subheader="COMPLETED ACTIVITIES"
        />
          }
        </div>

       

        <div className="col-12 col-xl-3 col-lg-6 col-md-6 col-sm-6 ptb-15">
        {
          isLoading? <Skeleton  baseColor="#bac8dc" style={{height:'100px', width:'100%'}}/> :
            <MiniWidget
            iconName="fas fa-spinner"
            iconColor="#052452"
            background="white"
            className="demo"
            headline={activities ? myInProgress(activities) : 0 }
            subheader="IN PROGRESS"
        />
          }
       
        </div>

        <div className="col-12 col-xl-3 col-lg-6 col-md-6 col-sm-6 ptb-15">
        {
          isLoading? <Skeleton  baseColor="#bac8dc" style={{height:'100px', width:'100%'}}/> :
            <MiniWidget
            iconName="fas fa-clock"
            iconColor="#c88100"
            background="white"
            className="demo"
            headline={activities ? myWaitingApproval(activities) : 0 }
            subheader="WAITING APPROVAL"
        />
          }
        </div>
       
        </div>
        {/* <Main>
          <div className="cardRow">
            <Box>
              <Skeleton  baseColor="#bac8dc" style={{height:'100%', width:'100%'}}/>
            </Box>
            <Box>
            <Skeleton  baseColor="#e1e2e3" style={{height:'100%', width:'100%'}}/>
            </Box>
            <Box>
            <Skeleton  baseColor="#bac8dc" style={{height:'100%', width:'100%'}}/>
            </Box>
            <Box>
            <Skeleton  baseColor="#e1e2e3" style={{height:'100%', width:'100%'}}/>
            </Box>

          </div>

          <div className="chartRow">
          <Box>
          <Skeleton  baseColor="#e1e2e3" style={{height:'100%', width:'100%'}}/>
          </Box>
          <Box>
          <Skeleton  baseColor="#bac8dc" style={{height:'100%', width:'100%'}}/>
          </Box>

          </div>
        </Main> */}
          {/* <div className="mtb-10">
                        This is simple quick start app. you can easily setup your theme as per our documentation.
                    </div>

                    <div className="mtb-10">
                        You can follow below files for setting your theme
                        <span className="chip"> src/settings/index </span>
                    </div>

                    <div className="mtb-10">
                        We removed all the components, views, and unnecessary things in quick start app.If you want any components please refer our Roe app.
                    </div> */}
        </div>
      </div>
    </div>
  );
};

export default Intro;


export const Main  = styled.main`
display:flex;
flex-direction: column
.cardRow{
  display:grid;
  grid-template-columns: repeat(4, 1fr);
  gap:15px
}
.chartRow{
  margin-top:20px;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  gap:15px;
  height:40vh;
}

.chartRow section: first-child{
  flex:2;
  height:100%
}
.chartRow section{
  flex:1;
  height:100%
}

`



export const Box = styled.section`
height:200px;
border:0px solid #ceacea;
padding:0;
overflow:hidden;


`
