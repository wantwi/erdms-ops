import React, { useState, useEffect, useRef } from "react";
import { TreeViewComponent } from "@syncfusion/ej2-react-navigations"
import { Modal, ModalHeader, ModalBody, Col, Button } from "reactstrap";
import { Application, checkboxData } from "util/sample";
import "rc-tree/assets/index.css";
import Tree from 'rc-tree';


const menusData = [
    {
      "id": "f1a21c73-2522-44cd-af59-da3fa77dd3be",
      "name": "Dashborad",
      "accesses": [],
      "menus": [],
      "navicationPath": "",
      "iconPath": "",
      "status": true
    },
    {
      "id": "f71dc0b5-e118-441f-afc9-742bd6c2e6e2",
      "name": "Manage Job",
      "accesses": [],
      "menus": [
        {
          "id": "68451da8-1c74-4c43-b59b-8b5ad99e129f",
          "name": "Assign Activity",
          "accesses": [
            "assign",
            "reassign"
          ],
          "menus": [],
          "navicationPath": "",
          "iconPath": "",
          "status": true
        },
        {
          "id": "a3e0e25e-daec-407e-b6fd-b1b78862ae64",
          "name": "Review Requirement",
          "accesses": [
            "approve",
            "decline"
          ],
          "menus": [],
          "navicationPath": "",
          "iconPath": "",
          "status": true
        },
        {
          "id": "4b36a03f-a2c8-4075-a712-c0a3de6d86de",
          "name": "Update my activity",
          "accesses": [
            "upload",
            "request_approval"
          ],
          "menus": [],
          "navicationPath": "",
          "iconPath": "",
          "status": true
        }
      ],
      "navicationPath": "",
      "iconPath": "",
      "status": true
    },
    {
      "id": "9138cdf3-6bce-43ea-bd88-f6d3a3cd125f",
      "name": "Master Data",
      "accesses": [],
      "menus": [
        {
          "id": "3384ee4e-962e-49d6-a244-4cfd0eeaf48d",
          "name": "Service Items",
          "accesses": [],
          "menus": [
            {
              "id": "5b915355-73c4-4f51-8bcb-d0f31adab5c8",
              "name": "Process",
              "accesses": [
                "create",
                "update",
                "delete"
              ],
              "menus": [],
              "navicationPath": "",
              "iconPath": "",
              "status": true
            },
            {
              "id": "5aed03b4-25ac-4251-8419-e292c3629a05",
              "name": "Requirement",
              "accesses": [
                "create",
                "update",
                "delete"
              ],
              "menus": [],
              "navicationPath": "",
              "iconPath": "",
              "status": true
            },
            {
              "id": "445c3a01-d6d5-4660-819c-ef60c2e02ddf",
              "name": "Documents",
              "accesses": [
                "create",
                "update",
                "delete"
              ],
              "menus": [],
              "navicationPath": "",
              "iconPath": "",
              "status": true
            },
            {
              "id": "6fc56d69-ea4a-4e95-a397-fa0f1d823a29",
              "name": "Activity",
              "accesses": [
                "create",
                "update",
                "delete"
              ],
              "menus": [],
              "navicationPath": "",
              "iconPath": "",
              "status": true
            }
          ],
          "navicationPath": "",
          "iconPath": "",
          "status": true
        },
        {
          "id": "540489e0-a9a9-46e0-ab77-9c6c3153e250",
          "name": "Equipment",
          "accesses": [
            "create",
            "update",
            "delete"
          ],
          "menus": [],
          "navicationPath": "",
          "iconPath": "",
          "status": true
        },
        {
          "id": "e488d4f6-ee97-4ba4-8062-a0b76a34434d",
          "name": "Customer",
          "accesses": [
            "create",
            "update",
            "delete"
          ],
          "menus": [],
          "navicationPath": "",
          "iconPath": "",
          "status": true
        },
        {
          "id": "63042d07-9949-48e4-930b-c968176e07e1",
          "name": "Roles",
          "accesses": [
            "create",
            "update",
            "delete"
          ],
          "menus": [],
          "navicationPath": "",
          "iconPath": "",
          "status": true
        },
        {
          "id": "abe22e92-dd1a-441e-a495-cba5e5240027",
          "name": "Equipment Type",
          "accesses": [
            "create",
            "update",
            "delete"
          ],
          "menus": [],
          "navicationPath": "",
          "iconPath": "",
          "status": true
        },
        {
          "id": "9c1fb97a-88f7-4ec8-93d8-e85abbcace43",
          "name": "Personnel",
          "accesses": [
            "create",
            "update",
            "delete"
          ],
          "menus": [],
          "navicationPath": "",
          "iconPath": "",
          "status": true
        }
      ],
      "navicationPath": "",
      "iconPath": "",
      "status": true
    },
    {
      "id": "9ed10cf7-2099-49ca-bc8f-9ef48a25eea4",
      "name": "Report",
      "accesses": [],
      "menus": [
        {
          "id": "c6166cbb-38b0-4a2b-8e9f-d5c4a648bf5c",
          "name": "Listing Reports",
          "accesses": [],
          "menus": [],
          "navicationPath": "",
          "iconPath": "",
          "status": true
        },
        {
          "id": "38e01632-5e06-4a5e-9394-e6d36b26b749",
          "name": "Job Report Group",
          "accesses": [],
          "menus": [],
          "navicationPath": "",
          "iconPath": "",
          "status": true
        }
      ],
      "navicationPath": "",
      "iconPath": "",
      "status": true
    },
    {
      "id": "26bb9d57-4ff3-45d7-8fe2-91a57f91241b",
      "name": "Service Job",
      "accesses": [
        "create"
      ],
      "menus": [],
      "navicationPath": "",
      "iconPath": "",
      "status": true
    }
  ]

const STYLE = `
.rc-tree-child-tree {
  display: block;
}

.node-motion {
  transition: all .3s;
  overflow-y: hidden;
}
`;

const defaultExpandedKeys = ['0', '0-2', '0-9-2'];

const renderMenus =(data)=>{
    let arr =[]

data.map(level1 =>{
    let obj = {},level_Child =[],level2_Child=[], childObj1={},childObj2={}
    if(level1.menus.length > 0){
        
        level1.menus.map(level2 =>{

            if(level2.menus.length > 0){

                level2.menus.map(level3 =>{

                    childObj2 ={key:level2.id,title:level2.name}
                })


            childObj1 ={key:level2.id,title:level2.name, children:level2_Child}
            }else{

                childObj1 ={key:level2.id,title:level2.name}
                level_Child.push(childObj1)
            }

        })

        obj = {key:level1.id,title:level1.name,children:level_Child}
    }else{
        obj = {key:level1.id,title:level1.name}
    }
   
    arr.push(obj)

})

return arr
}

console.log({renderMenus: renderMenus(menusData)})

// const motion = {
//   motionName: 'node-motion',
//   motionAppear: false,
//   onAppearStart: () => ({ height: 0 }),
//   onAppearActive: node => ({ height: node.scrollHeight }),
//   onLeaveStart: node => ({ height: node.offsetHeight }),
//   onLeaveActive: () => ({ height: 0 }),
// };


//const fields = { dataSource: countries, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' }

const AppMenuTree = ({ show, setShow, info }) => {
  const [menus] = useState([]);
  const treeRef = useRef();

  const { id, name } = info;

  console.log({ info });
  console.log({ Application });

  const getSelectAppMenus = () => {
    let ob = {};
    const appM = Application.find((x) => x.id === id);
    let arr = [];

    appM.menus.map((x) => {
      console.log({ x });
      ob = {
        id: x.id,
        name: x.menu,
        hasChild: x.subMenu.length > 0,
        expanded: false,
      };

      arr.push(ob);
      if (x.subMenu.length > 0) {
        x.subMenu.map((y) => {
          ob = { id: y.id, pid: x.id, name: y.menu, isChecked: false };
          arr.push(ob);
        });
      }
    });

    console.log({ arr });
  };

  useEffect(() => {
    if (info.id) {
      getSelectAppMenus();
    }
  }, [info]);

  const onCheck =(event)=>{

    console.log({event})

  }

  

  return (
    <div>
      <Modal
        isOpen={show}
        onClosed={() => setShow(false)}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody>
          <h1 className="address-title text-center mb-1">{name}</h1>
          <p className="address-subtitle text-center mb-2 pb-75">
            Select Menus for Group
          </p>
          <div
            className="tree-control_wrapper"
            style={{ height: "500px", overflowY: "scroll" }}
          >
            <TreeViewComponent fields={ { dataSource: checkboxData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' }} showCheckBox={true} />

            {/* <Tree
            ref={treeRef}
            onCheck ={onCheck}
            //  defaultExpandAll={false}
             checkable
            // defaultExpandedKeys={defaultExpandedKeys}
            // motion={motion}
            autoExpandParent ={false}
            height={200}
            itemHeight={20}
            style={{ border: '1px solid #000' }}
            treeData={ renderMenus(menusData)}
          /> */}
            
          </div>

          <Col className="text-center" xs={12}>
            <Button type="submit" className="me-1 mt-2" color="primary">
              Submit
            </Button>
            <Button
              type="reset"
              className="mt-2"
              color="secondary"
              outline
              onClick={() => setShow(false)}
            >
              Discard
            </Button>
          </Col>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AppMenuTree;
