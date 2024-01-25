import React,{useEffect,useRef,useState } from "react";
import HeaderWrapper from "./header.style";
import { UncontrolledPopover, PopoverBody } from 'reactstrap';
import {
    // friend1,
    // friend2,
    // friend3,
    people1,

    ProfileLockScreen
} from "helper/constant";
import { connect, useDispatch,useSelector } from "react-redux";
import { compose } from "redux";
import AuthActions from "redux/auth/actions";
import { withRouter } from "react-router-dom";
import PopoverBlock from './PopoverBlock'
import {idpLogOut} from "../../redux/auth/auth"
import { getAllUnreadMessages, onNotify } from "redux/notifications/action";
import useCustomApi from "api/useCustomApi";
import { useGetStatic } from "hooks/useQueryInfo";
import useAuth from "hooks/useAuth";
import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifyInfo = (txt) => toast.info(txt, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined, 
  })

const { logout } = AuthActions;
const { REACT_APP_SERVICE_URL } = process.env;
const Header = props => {
    const dispatch = useDispatch()
    const { drawerMiniMethod, mini } = props;
   
    const customApi = useCustomApi();
    const {auth} = useAuth()

    const hubConnectionOptions = {
        logging: LogLevel.Trace,
        accessTokenFactory: () => `${auth?.accessToken || null}`,
      };


    let notficatonConnection = useRef(new HubConnectionBuilder()
    .withUrl(`${REACT_APP_SERVICE_URL}notificationHub`, hubConnectionOptions)
    .build()) 
     
  

    const GetAllNotifications = async () => {
        let url = `Notifications`;
        if(auth?.accessToken  && auth !==null){
            const response = await customApi.get(url);
            console.log({Notifications:response});
            return response.data;
        }
        return []
       
      };

      const onSuccess = (result) =>{
        dispatch(getAllUnreadMessages(result))
       
      }

    const { data  =[], refetch } = useGetStatic(
        "notifications",
        GetAllNotifications,
        onSuccess,
        () => {}
      );
    

     const {notificationMassages} =  useSelector(state =>state.notificationState)

     const {showDialog} =  useSelector(state =>state.jobmessagesState)
     

     console.log({notificationMassages})
    const userSignout = () => {

        localStorage.removeItem("currentLocation")
        dispatch(idpLogOut())
      
    };

    
   notficatonConnection.current
        .start()
        .then(  () => { 
            notficatonConnection.current.on("Notify", (messages) => {
                console.log({messages, showDialog});
                dispatch(onNotify(messages))
                notifyInfo(`You have a new message from ${messages?.userName}`)
               // refetch()

                
            // customApi.get('Notifications').then(res =>{
            //     console.log({Notifications: res});
            // })
              
            // if(showDialog){
            //     dispatch(onNotify(messages))
            // }else {
               
            // }
         //  refetch()
          });
       
        })
        .catch((err) => {
          console.log({ err });
        });
   

    return (
        <HeaderWrapper {...props}>
            <div className="headerBack">
                <div className="flex-x align-center">
                    <div className="drawer-handle-arrow">
                        {mini ? (
                            <button
                                className="top-header-icon"
                                onClick={() => drawerMiniMethod()}
                            >
                                <i className="fas fa-bars"></i>
                            </button>
                        ) : (
                                <button
                                    className="top-header-icon"
                                    onClick={() => drawerMiniMethod()}
                                >
                                    <i className="fas fa-bars"></i>
                                </button>
                            )}
                    </div>
                    <div
                        className="mini-drawer-menu-icon"
                        onClick={() => drawerMiniMethod()}
                    >
                        <i className="fas fa-bars" />{" "}
                        <span className="app-name fs-16 bold-text">{'Baj Freight'}</span>
                    </div>
                   
                    <div className="pl-10 flex-1">
                        <button
                            id="notification"
                            className="top-header-icon"
                        >
                            <i className="far fa-bell"></i>
                            <div className="button-badge fs-11 demi-bold-text">
                            {notificationMassages?.length||0}
                            </div>
                        </button>
                        <UncontrolledPopover placement="bottom-start" target="notification" className="header-popover" trigger="focus" >
                        <div className="fs-13 bold-text mb-10 pl-2 pt-2">
                                    You have {notificationMassages.length} Notifications.
                                </div>
                            <PopoverBody className="mail-popover-body" style={{height:300,overflowY:"scroll"}} >
                               
                               {
                                   notificationMassages.map(item =><PopoverBlock
                                   key={item?.userId}
                                    people={ProfileLockScreen}
                                    name={item?.userName}
                                    text={item?.message}
                                    created={item?.createdAt}
                                    
                                />)
                               }
                               
                            </PopoverBody>
                        </UncontrolledPopover>
                    </div>
                    {/* <div className="pl-10">
                        <button
                            className="top-header-icon"
                        >
                            <i className="fas fa-search"></i>
                        </button>
                    </div> */}
                    <div className="pl-10">
                    <div id="profile">
                    <span style={{fontWeight:500}}>{auth?.given_name}</span>       <img
                                className="top-header-profile-class"
                                src={ProfileLockScreen}
                                alt="notify"
                            />
                        </div>
                        <UncontrolledPopover 
                            className="roy-menu"
                            innerClassName="roy-inner-content"
                            placement="bottom-end" 
                            target="profile" 
                            trigger="legacy"
                        >
                            <PopoverBody>
                                <div
                                    className="roy-menu-list"
                                    // onClick={() => props.history.push('/profile')}
                                >
                                   {auth?.given_name}
                                </div>
                                {/* <div
                                    className="roy-menu-list"
                                >
                                    Settings
                                </div> */}
                                <div
                                    className="roy-menu-list"
                                    onClick={userSignout}
                                >
                                    Logout
                                </div>
                            </PopoverBody>
                        </UncontrolledPopover>
                    </div>
                    {/* <div className="pl-10">
                        <button
                            onClick={layoutSettingDrawerToggle}
                            className="top-header-icon"
                        >
                            <i className="fas fa-th-large"></i>
                        </button>
                    </div> */}
                </div>
            </div>
        </HeaderWrapper>
    );
};

export default compose(
    withRouter,
    connect(
        null,
        { logout }
    )
)(Header);
