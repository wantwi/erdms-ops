export const Application =
    [
        {
            id: 1001,
            name: "Persol LMS Operation Host Portal",
            menus: [
                {
                    id: 1,
                    menu: "Master Data",
                    subMenu: [
                        {
                            id: 1,
                            menu: "Personnel"
                        },
                        {
                            id: 2,
                            menu: "Equipment type"
                        },
                        {
                            id: 3,
                            menu: "Equipment"
                        },
                        {
                            id: 4,
                            menu: "Roles"
                        },
                        {
                            id: 5,
                            menu: "Services",
                            subMenu: [
                                {
                                    id: 1,
                                    menu: "Document"
                                },
                                {
                                    id: 2,
                                    menu: "Requirement"
                                },
                                {
                                    id: 3,
                                    menu: "Activities"
                                },
                                {
                                    id: 4,
                                    menu: "Service process"
                                },
                                {
                                    id: 5,
                                    menu: "Customer"
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    menu: "Service Job",
                    subMenu:[]
                },
                {
                    id: 3,
                    menu: "Manage Job",
                    subMenu: [
                        {
                            id: 1,
                            menu: "Assign Activities"
                        },
                        {
                            id: 2,
                            menu: "Review Requirements"
                        },
                        {
                            id: 3,
                            menu: "Update My Activities"
                        }
                    ]
                },
                {
                    id: 4,
                    menu: "Report",
                    subMenu: [
                        {
                            id: 1,
                            menu: "Master Data listings"
                        },
                        {
                            id: 2,
                            menu: "Job reports group"
                        }
                    ]
                }


            ]
        },
        {
            id: 1002,
            name: "Customer portal (Job Status Tracking)",
            menus: [
                {
                    id: 1,
                    menu: "Track Job Status",
                    subMenu: []
                },
                {
                    id: 2,
                    menu: "Manage Users Accounts",
                    subMenu: [
                        {
                            id: 1,
                            menu: "Add user"
                        },
                        {
                            id: 2,
                            menu: "Deactivate user"
                        }
                    ]
                },
                {
                    id: 3,
                    menu: "Reports",
                    subMenu: [
                        {
                            id: 1,
                            menu: "Job Status"
                        },
                        {
                            id: 2,
                            menu: "Job Documents (view/print)"
                        },
                        {
                            id: 3,
                            menu: "Job Delivery statistics"
                        },
                        {
                            id: 4,
                            menu: "Graphs & Charts"
                        }
                    ]
                }
            ]
        }
    ]


    export const  checkboxData =  [
        { "id": 1, "name": "Australia", "hasChild": true, "expanded": true },
        { "id": 2, "pid": 1, "name": "New South Wales" },
        { "id": 3, "pid": 1, "name": "Victoria" },
        { "id": 4, "pid": 1, "name": "South Australia" },
        { "id": 6, "pid": 1, "name": "Western Australia" },
        { "id": 7, "name": "Brazil", "hasChild": true },
        { "id": 8, "pid": 7, "name": "Paraná" },
        { "id": 9, "pid": 7, "name": "Ceará" },
        { "id": 10, "pid": 7, "name": "Acre" },
        { "id": 11, "name": "China", "hasChild": true },
        { "id": 12, "pid": 11, "name": "Guangzhou" },
        { "id": 13, "pid": 11, "name": "Shanghai" },
        { "id": 14, "pid": 11, "name": "Beijing" },
        { "id": 15, "pid": 11, "name": "Shantou" },
        { "id": 16, "name": "France", "hasChild": true },
        { "id": 17, "pid": 16, "name": "Pays de la Loire" },
        { "id": 18, "pid": 16, "name": "Aquitaine" },
        { "id": 19, "pid": 16, "name": "Brittany" },
        { "id": 20, "pid": 16, "name": "Lorraine" },
        { "id": 21, "name": "India", "hasChild": true },
        { "id": 22, "pid": 21, "name": "Assam" },
        { "id": 23, "pid": 21, "name": "Bihar" },
        { "id": 24, "pid": 21, "name": "Tamil Nadu" },
        { "id": 25, "pid": 21, "name": "Punjab" }
    ]