
export const sidebarData = [
  {
    name: "Dashboard",
    routepath: "/home",
    iconClass: "fas fa-chalkboard",
  },
  // {
  //   type: "heading",
  //   name: "Setup",
  // },
  // {
  //   name: "Master Data",
  //   iconClass: "fab fa-wpforms",
  //   child: [
  //     {
  //       listname: "Personnel",
  //       routepath: "/personnel",
  //       shortname: "PL",
  //     },
  //     {
  //       listname: "Equipment Type",
  //       routepath: "/equipment-type",
  //       shortname: "ET",
  //     },

  //     {
  //       listname: "Equipment",
  //       routepath: "/equipment",
  //       shortname: "EQ",
  //     },

  //     {
  //       listname: "Roles",
  //       routepath: "/roles",
  //       shortname: "RO",
  //     },
  //     {
  //       listname: "Service Items",
  //       shortname: "SI",
  //       iconClass: "fas fa-cog",
  //       child: [
  //         {
  //           listname: "Document",
  //           routepath: "/document-setup",
  //           shortname: "SD",
  //         },
  //         {
  //           listname: "Regulatory Option",
  //           routepath: "/regulatory-setup",
  //           shortname: "SR",
  //         },
  //         {
  //           listname: "Requirement",
  //           routepath: "/requirement-setup",
  //           shortname: "SR",
  //         },
  //         {
  //           listname: "Activity",
  //           routepath: "/service-activity",
  //           shortname: "SA",
  //         },
  //         {
  //           listname: "Process",
  //           routepath: "/service-type",
  //           shortname: "SP",
  //         },
  //       ],
  //     },
  //     {
  //       listname: "Customer",
  //       routepath: "/customer-registration",
  //       shortname: "CU",
  //     },
  //     // {
  //     //   name: 'Services',
  //     //   iconClass: 'fab fa-wpforms',

  //     // },
  //   ],
  // },
  // {
  //   type: "heading",
  //   name: "Transaction",
  // },
  // {
  //   name: "Service Job",
  //   routepath: "/new-job",
  //   iconClass: "fas fa-briefcase",
  // },
  {
    name: "Manage Job",
    iconClass: "fas fa-chalkboard",
    child: [
      // {
      //   listname: "Assign Activity",
      //   routepath: "/assign-activity",
      //   shortname: "AA",
      // },

      {
        listname: "Update My Activity",
        routepath: "/update-activity",
        shortname: "UA",
      },
      // {
      //   listname: "Review Requirment",
      //   routepath: "/review-requirment",
      //   shortname: "RR",
      // },
    ],
  },
  // {
  //   name: "Report",
  //   iconClass: "fas fa-chalkboard",
  //   child: [
  //     {
  //       listname: "Listing Reports",
  //       routepath: "/report",
  //       shortname: "LR",
  //     },
  //     {
  //       listname: "Job Report Group",
  //       routepath: "/job-report-group",
  //       shortname: "AT",
  //     },
     
  //   ],
  // },

  // {
  //   name: "Admin",
  //   iconClass: "fas fa-chalkboard",
  //   child: [
  //     {
  //       listname: "Segments",
  //       routepath: "/admin/segment",
  //       shortname: "SG",
  //     },
  //     {
  //       listname: "Group And User",
  //       routepath: "/admin/group-user",
  //       shortname: "GU",
  //     },
     
  //   ],
  // },

  // {
  //   name: 'Service Process',
  //   iconClass: 'fab fa-wpforms',
  //   child: [
  //     {
  //       listname: 'Service Type',
  //       routepath: '/service-type',
  //       shortname: 'AT'
  //     },
  //     {
  //       listname: 'Service Activity',
  //       routepath: '/service-activity',
  //       shortname: 'AA'
  //     },
  //     // {
  //     //   listname: 'Requirement Type',
  //     //   routepath: '/requirement-type',
  //     //   shortname: 'RS'
  //     // },
  //     {
  //       listname: 'Requirement Setup',
  //       routepath: '/requirement-setup',
  //       shortname: 'RS'
  //     },

  //     {
  //       listname: 'Document Setup',
  //       routepath: '/document-setup',
  //       shortname: 'DS'
  //     },

  //   ]
  // },
];

// Comments:::::::

//  If you want one level child then look below example

/*
  {
    name: 'sidebar.forms',
    iconClass: 'fab fa-wpforms',
    child: [
      {
        listname: 'sidebar.regularforms',
        routepath: '/regularform',
        shortname: 'RF'
      }
    ]
  }
*/

//  If you want Second level child then look below example

/*
   {
      name: 'sidebar.pages',
      iconClass: 'fas fa-print',
      child: [
        {
          listname: 'sidebar.authentication',
          iconClass: 'fas fa-user',
          child: [
            {
              listname: 'sidebar.login',
              routepath: '/login',
              shortname: 'L'
            },
          ]
        }
      ]
    }
*/

export const HorizontalSidebarData = [
  {
    name: "sidebar.intro",
    routepath: "/index",
    iconClass: "fas fa-chalkboard",
  },
];

// ### For Horizontal sidebar

//     <!-- Basics -->
//         {
//             name: "sidebar.single",
//             iconClass: "fab fa-stripe-s",
//             routepath: "/single"
//         }
//     <!-- One Level -->
//         {
//             name: "sidebar.onelevel",
//             iconClass: "fas fa-expand",
//             child: [
//                 {
//                     name: "sidebar.example",
//                     routepath: "/ex",
//                 }
//             ]
//         }
//     <!-- Second level -->
//         {
//             name: "sidebar.secondlevel",
//             iconClass: "fas fa-expand",
//             child: [
//                 {
//                     name: "sidebar.example",
//                     iconClass: "fas fa-plus",
//                     child: [
//                         {
//                             name: "sidebar.example1",
//                             routepath: "/ex1",
//                         },
//                         {
//                             name: "sidebar.example2",
//                             routepath: "/ex2",
//                         }
//                     ]
//                 }
//             ]
//         }
