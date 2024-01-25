import React, { useRef, useState } from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Page,
  Inject,
  Toolbar,
  Group,
  Edit,
  CommandColumn,
} from "@syncfusion/ej2-react-grids";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Badge,
} from "reactstrap";
import classnames from "classnames";
import CustomModal from "../../serviceType/modal/CustomModal";
import ActivityTable from "./ActivityTable";
import "../../../../components/tables/syncfussionTable/generic.style.css";
import { useDispatch } from "react-redux";
import { getSelectedActivity } from "redux/serviceActivity/actions";
import * as FaIcons from "react-icons/fa";
import { showLoader, hideLoader } from "redux/loader/Loader";
import styled from "styled-components";
import useCustomApi from "api/useCustomApi";
import { useGetById } from "hooks/useQueryInfo";



const ActionWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const actionTemp = ({ code }) => {
  return (
    <div>
      <i className="fa fa-eye"></i>
    </div>
  );
};

const renderData = ({
  id,
  code,
  name,
  tat,
  maillingList,
  activityType,
  requiements,
}) => {
  return {
    id,
    code,
    name,
    days: tat,
    emailList: maillingList,
    activityType: activityType.id,
    requirements: requiements,
  };
};

const ApplicationActivityTable = ({data, setIsClone, setOpenModal }) => {
  const dispatch = useDispatch();
  const customApi = useCustomApi();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [selectedRowId, setSelectedRowId] = useState("")
  let rowId = useRef("")
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const actionTemplate = ({
    id,
    code,
    name,
    description,
    maillingList,
    status,
    tat,
    activityType,
  }) => {
    let data = {
      id,
      code,
      name,
      description,
      maillingList,
      status,
      tat,
      activityType,
    };

    return (
      <ActionWrap>
        <Badge
          color="primary"
          title="View Activity"
          className="btn btn-sm  mr-2 p-1"
          style={{
            width: 30,
            background: "#67abda !important",
            border: "1px solid #67abda",
          }}
          onClick={() => getRowRecordes(data)}
        >
          <FaIcons.FaEye size={14} className="align-middle me-25" />
        </Badge>

        <Badge
          title="Clone Activity"
          color="primary"
          className="btn btn-sm btn-primary p-1"
          style={{ width: 30, padding: 4 }}
          onClick={() => getCloneRow(data)}
        >
          <FaIcons.FaClone size={14} className="align-middle me-25" />
        </Badge>
      </ActionWrap>
    );
  };

  const GetById = async () => {
    dispatch(showLoader());
    const response =  await customApi.get(`Activities/${selectedRowId}`)

    //dispatch(getSelectedActivity(renderData(response.data)));
    console.log({response})

    return response.data

  }

  const onSuccess = (data) => {
    dispatch(getSelectedActivity(renderData(data)))
    dispatch(hideLoader());
     setOpenModal(true);
    
  }

  const onError = (data) => {
    console.log({data})
  }
  const { data:selectedServiceActivity, refetch } = useGetById(
    "activity-types",
    selectedRowId,
    GetById,
    onSuccess,
    onError
  );


  const getCloneRow = (data) => {
    console.log({getRowRecordes: data})
    
    setIsClone(true);
    
    setSelectedRowId(data?.id)
    setTimeout(() => {
      refetch()
    }, 100);
  };

  const getRowRecordes = (data) => {
    setIsClone(false);
    setSelectedRowId(data?.id)
    setTimeout(() => {
      refetch()
    }, 100);
  };

  // const rowSelected = (args) => {
  //   console.log({ args });
  //   dispatch(getActiviy(args.data));

  //   dispatch(getSelectedActivity(renderData(args.data)));

  //   setOpenModal(true);
  // };

  const actionBegin = (args) => {
    if (args.requestType === "add") {
      args.cancel = true;
      setShowModal(!showModal);
    }
  };



  return (
    <div className="mt-2">
      <GridComponent
        pageSettings={{ pageCount: 4, pageSizes: true }}
        height={600}
        allowPaging={true}
        editSettings={{
          allowEditing: false,
          allowAdding: true,
          allowDeleting: true,
          newRowPosition: "Bottom",
        }}
        actionBegin={actionBegin}
        dataSource={data}
        // rowSelected={rowSelected}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="code"
            headerText="Code"
            width="100"
            textAlign="left"
          />
          <ColumnDirective
            field="name"
            headerText="Name"
            width="300"
            textAlign="left"
          />
          <ColumnDirective
            field="tat"
            headerText="TAT (Days)"
            width="150"
            textAlign="right"
          />
          <ColumnDirective
            headerText="Action"
            width="80"
            textAlign="center"
            template={actionTemplate}
            // commands={commands}
          ></ColumnDirective>
        </ColumnsDirective>
        <Inject services={[Page, CommandColumn, Toolbar, Edit, Group]} />
      </GridComponent>

      <CustomModal
        setShowModal={setShowModal}
        showModal={showModal}
        title="Service Activity"
      >
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" }, "doc-title")}
              onClick={() => {
                toggle("1");
              }}
            >
              Activity Details
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" }, "doc-title")}
              onClick={() => {
                toggle("2");
              }}
            >
              Requirement
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <div className="doc-title mt-10">
                  <Form>
                    <Row form>
                      <Col md={8}>
                        <FormGroup>
                          <Label for="processCode">Name</Label>
                          <Input
                            type="text"
                            name="code"
                            id="processCode"
                            placeholder="Enter name"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="processName">TAT (Days)</Label>
                          <Input
                            type="number"
                            name="name"
                            id="processName"
                            placeholder="Enter turn arround time in days"
                            autoComplete="false"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <Label for="processDescription">
                        Escalation Mailing List
                      </Label>
                      <Input
                        type="select"
                        name="description"
                        id="processDescription"
                        placeholder="Select escalation mailing list"
                      >
                        <option>Select mailing list</option>
                        <option>William Antwi-Boasiako</option>
                        <option>Micheal Nartey</option>
                        <option>Eric Boateng</option>
                        <option>Enoch Enchill</option>
                        <option>Yoavi Gavor</option>
                      </Input>
                    </FormGroup>

                    <Row form>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="processType">Process Type</Label>
                          <Input
                            type="select"
                            name="process Type"
                            id="processType"
                          >
                            <option value="-1">Select process Type</option>
                            <option value="50131">Contruction Permit</option>
                            <option value="40131">Operating License</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={8}>
                        <FormGroup>
                          <Label for="processOwner">Process Owner</Label>
                          <Input
                            type="select"
                            name="processOwner"
                            id="processOwner"
                          >
                            <option>Select process owner</option>
                            <option>William Antwi-Boasiako</option>
                            <option>Micheal Nartey</option>
                            <option>Eric Boateng</option>
                            <option>Enoch Enchill</option>
                            <option>Yoavi Gavor</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}></Col>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row className="mt-10">
              <ActivityTable />
            </Row>
          </TabPane>
        </TabContent>
        {/* <h1>Forms goes here</h1> */}
      </CustomModal>
    </div>
  );
};

export default ApplicationActivityTable;
