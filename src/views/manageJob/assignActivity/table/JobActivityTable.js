import React, { useState, useRef } from "react";

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
  Row,
  Col,
  Input,
  Label,
  FormGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
// import Multiselect from "multiselect-react-dropdown";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// import { hideLoader, showLoader, setResponse } from "redux/loader/Loader";
import LoadingOverlay from "react-loading-overlay";
import useCustomApi from "api/useCustomApi";
import { useGet } from "hooks/useQueryInfo";


let schema = Yup.object().shape({
  officerId: Yup.string().required("Officer name is required"),
});

const init = {
  jobActivityId: "",
  officerId: "",
  remarks: "",
 
};


const JobActivityTable = ({
  activities,
  // setActivities,
  showOfficerModal,
  setShowForm,
  showForm,
  // handleClick,
  grid,
  handleSubmit,
  setActivityId,
  isLoading, 
  setisLoading
}) => {
  const [owners, setOwners] = useState([]);
  // const [personnels, setPersonnels] = useState([])
  const customApi = useCustomApi();

  const GetAllPersonnel  = async () => {
    let url = `Job/Personnels?results=1000`;
    const response = await customApi.get(url);
    return response.data.items
  };
  const { isLoading:load, data: personnels } = useGet(
    "personnels",
    GetAllPersonnel,
    "",
    ()=>{},
    ()=>{},
  );

  

 
  const submitBtn = useRef();
  // const dispatch = useDispatch();

  // const { processowners } = useSelector((state) => state.ServiceProcess);

  // console.log({ processowners });

  const saveAssignOfficer = () => {
    setShowForm(false);
    setisLoading(true);
    submitBtn.current.click();

    //
  };


  const actionTemp = ({ officer, activityName, id }) => {
    return (
      <>
      {
        officer?.id ?
        <div>
        <button
         className="btn btn-secondary btn-sm"
         onClick={() => {
           showOfficerModal(activityName, id);
           setActivityId({id,officer});
         }}
       >
         <i className="fa fa-user-minus"></i> Re-assign
       </button>

     </div> 
        
        
        :
        <div>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            showOfficerModal(activityName, id);
            setActivityId(id);
          }}
        >
          <i className="fa fa-user-plus"></i> Assign
        </button>
      </div>
     
      }
      </>
     
    );
  };

  return (
    <LoadingOverlay active={false} spinner={true}>
      <div className="mt-2">
        <GridComponent
          ref={grid}
          height={300}
          allowPaging={true}
          editSettings={{
            allowEditing: false,
            allowAdding: true,
            allowDeleting: true,
            newRowPosition: "Top",
          }}
          dataSource={activities}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="id"
              headerText="id#"
              visible={false}
              textAlign="left"
            />
            <ColumnDirective
              field="sequence"
              headerText="Seq#"
              width="70"
              textAlign="left"
            />
            <ColumnDirective
              field="activityName"
              headerText="Activity"
              width="200"
              textAlign="left"
            />
            <ColumnDirective
              field="name"
              headerText="Officer"
              width="200"
              textAlign="left"
             
            />
            <ColumnDirective
              field="status"
              headerText="Status"
              width="100"
              textAlign="left"
            />

            <ColumnDirective
              headerText="Action"
              width="100"
              textAlign="left"
              template={actionTemp}
              // commands={commands}
            ></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Page, CommandColumn, Toolbar, Edit, Group]} />
        </GridComponent>

        <div>
          <Modal isOpen={showForm} size="md">
            <ModalHeader style={{background:"#e0e6ef", borderBottom:"1px solid #563c91"}}>
              <span style={{ fontWeight: 900 }}>Select Officer</span>
              {/* <span style={{ fontWeight: 700, color: "#5C258D" }}>title</span> */}
            </ModalHeader>
            <ModalBody>
              <Formik
                initialValues={init}
                validationSchema={schema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, handleChange, touched }) => (
                  <Form>
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="processType">Name</Label>
                          <Input
                            type="select"
                            name="officerId"
                            id="officerId"
                            onChange={handleChange}
                            value={values.officerId}
                          >
                               <option value="">Select officer</option>

                            {
                             load ? "Loading ....." : personnels.map(x =>  <option value={x.id}>{`${x.firstName} ${x.lastNName}`}</option>) 
                            }
                         
                          
                          </Input>
                          {errors.officerId && touched.officerId && (
                            <div className="text-danger">
                              {errors.officerId}
                            </div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="processCode">
                            Remarks / Specific Instruction
                          </Label>
                          <Input
                            type="textarea"
                            rows={2}
                            name="remarks"
                            id="remarks"
                            placeholder="Remarks"
                            onChange={handleChange}
                            value={values.remarks}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* <Row>
                      <Col md={12} hidden>
                        <FormGroup>
                          <Label for="jobActivityOwnerIds">Process Owner</Label>
                          <Multiselect
                            options={processowners}
                            hidden
                            // selectedValues={process.jobActivityOwnerIds}
                            onSelect={onSelect}
                            onRemove={onRemove}
                            placeholder=""
                            closeIcon="circle2"
                            isObject={true}
                            displayValue="name"
                            name="jobActivityOwnerIds"
                            onChange={handleChange}
                            value={
                              (values.jobActivityOwnerIds = owners.map(
                                (x) => x.id
                              ))
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row> */}
                    <input hidden ref={submitBtn} type="submit" value="Save" />
                  </Form>
                )}
              </Formik>
            </ModalBody>
            <ModalFooter>
              <Button
                size="sm"
                className="c-secondary"
                onClick={() => setShowForm(false)}
              >
                Close
              </Button>
              <Button
                className="c-primary"
                size="sm"
                onClick={saveAssignOfficer}
              >
                Save
              </Button>{" "}
            </ModalFooter>
          </Modal>
        </div>

        {/* <AssignOfficerForm
        title={info}
        showForm={showForm}
        setShowForm={setShowForm}
        activities={activities}
        setActivities={setActivities}
      /> */}
      </div>
    </LoadingOverlay>
  );
};

export default JobActivityTable;
