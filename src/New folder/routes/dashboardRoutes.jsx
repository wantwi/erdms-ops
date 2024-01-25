import Intro from "views/Intro";
import {
  ApplicationActivity,
  DocumentSetup,
  ServiceType,
  RequirementSetup,
  PersonnelPage,
  EquipmentPage,
  EquipmentTypePage,
  RolesPage,
  RegulatoryOptionPage
} from "views/setupForms/index";

import { CustomerRegistrationPage } from "views/customers/index";
import { JobPage } from "views/operation/index";
import { ReportViewer } from "../views/reports/index";
import { AssignActivity, UpdateActivity,ReviewActivityPage } from "views/manageJob/index";
import {GroupAndUserPage} from "views/admin/index"
const dashboardRoutes = [
  { path: "/home", component: Intro },
  // { path: "/home", component: Intro },
  //Setup > application  pages

  { path: "/personnel", component: PersonnelPage },
  { path: "/equipment", component: EquipmentPage },
  { path: "/equipment-type", component: EquipmentTypePage },
  { path: "/roles", component: RolesPage },

  {
    path: "/service-activity",
    component: ApplicationActivity,
  },
  { path: "/service-type", component: ServiceType },
  { path: "/document-setup", component: DocumentSetup },
  {
    path: "/regulatory-setup",
    component: RegulatoryOptionPage,
  },
  {
    path: "/requirement-setup",
    component: RequirementSetup,
  },
  {
    path: "/customer-registration",
    component: CustomerRegistrationPage,
  },
  { path: "/new-job", component: JobPage },
  { path: "/report", component: ReportViewer },
  { path: "/assign-activity", component: AssignActivity },
  { path: "/update-activity", component: UpdateActivity },
  { path: "/review-requirment", component: ReviewActivityPage },

  { path: "/admin/group-user", component: GroupAndUserPage },
  // { path: "/requirement-type", component: RequirementType }
];

export default dashboardRoutes;
