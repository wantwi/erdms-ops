import auth from "./auth/reducer";
import themeChanger from "./themeChanger/reducer";
import LanguageSwitcher from "./languageSwitcher/reducer";
import themeSetting from "./themeSettings/reducer";
import scrumboard from "./scrumboard/reducer";
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import DocumentSetupReducer from "./documentSetup/reducer";
import RequirementSetupReducer from "./requirementSetup/reducer";
import ServiceActityReducer from "./serviceActivity/reducer";
import ServiceProcessReducer from "./serviceProcess/reducer";
import { GlobalReducer } from "./loader/Loader";
import { AuthReducer } from "./auth/auth";
import CustomerReducer from "./customer/reducer";
import AssginActivityReducer from "./assignactivity/reducer";
import JobReducer from "./job/reducer";
import EquipmentSetupReducer from "./equipment/reducer";
import JobMessageReducer from "./messages/reducer";
import RoleSetupReducer from "./roles/reducer";
import NotificationReducer from "./notifications/reducer";
import RegulatoryOptionReducer from "./regulatoryOption/reducer"


const createReducer = (asyncReducers) =>
  combineReducers({
    auth: AuthReducer,
    themeChanger,
    LanguageSwitcher,
    themeSetting,
    scrumboard,
    router: routerReducer,
    documentSetup: DocumentSetupReducer,
    requirementSetup: RequirementSetupReducer,
    seviceActitvity: ServiceActityReducer,
    ServiceProcess: ServiceProcessReducer,
    helperState: GlobalReducer,
    customerState: CustomerReducer,
    assignJobState: AssginActivityReducer,
    jobState:JobReducer,
    equipmentState:EquipmentSetupReducer,
    jobmessagesState: JobMessageReducer,
    roleState: RoleSetupReducer,
    notificationState: NotificationReducer,
    regulatoryOptionState: RegulatoryOptionReducer,
    ...asyncReducers,
  });

export default createReducer;
