import React, { useState, useRef, useEffect } from "react";
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
import "../../../../components/tables/syncfussionTable/generic.style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { CustomAxios } from "util/customAxios";
import { showLoader, hideLoader } from "redux/loader/Loader";
import RegulatorySelectionTable from "./RegulatorySelectionTable";

const commands = [

  {
    type: "Delete",
    buttonOption: { iconCss: "e-icons e-delete", cssClass: "e-flat" },
  },
];





const RegulatoryRequirement = ({data,setData,selectedService, rowSelected, setShow, show }) => {
  const dispatch =useDispatch()
  const [showTable, setShowTable] = useState(false)
  const [selecteRegulatoryRequirements, setSelecteRegulatoryRequirements] = useState([])
  const [regulatoryRequirements, setRegulatoryRequirements] = useState([])
  const { requirements } = useSelector((state) => state.requirementSetup);
  const [serviceActivities, setserviceActivities] = useState([])
  const [selectedJob, setSelectedJob] = useState({})
  const [selectdActivityId, setSelectdActivityId] = useState("")
  const [selectedServiceId, setSelectedServiceId] = useState("")
  const myGrid =  useRef()
  // const [data, setData] = useState([])

  // const serviceIdRef = useRef();
  // const activityIdRef = useRef();
  // const addActionBtn = useRef(null)

console.log({selectedService})

  const { job } = useSelector(
    (state) => state.jobState
  );

  const getActivities = async (e)=> {
    setSelectedServiceId(e.target.value)
   
    dispatch(showLoader());
    try {

      const response = await CustomAxios.get(`Activities/Services/${e.target.value}`)
      console.log({getActivities:response})
      if(response){
        setserviceActivities(response.data)
        dispatch(hideLoader());
       
      }
    
      
    } catch (error) {
      dispatch(hideLoader());
    }

  }

const onActivityChange = (e) => {

  setSelectdActivityId(e.target.value) 
    const filterData = data.find(x => x?.serviceId === selectedServiceId)?.activities.find(x => x?.activityId === e.target.value)
    console.log({filterData})


    filterData ? setSelecteRegulatoryRequirements(filterData.regulatoryRequiements) : setSelecteRegulatoryRequirements([])
}

  
  const getRegulatoryOption = async () => {
    if(!rowSelected.id) {
        return
    }
    dispatch(showLoader());
    try {

      const response = await CustomAxios.get(`Requirements/RegulatoryOption?regulatoryOptionId=${rowSelected.id}`)
      console.log({getRegulatoryOption:response})
      if(response){
        setRegulatoryRequirements(response.data.items)
        dispatch(hideLoader());
        setShowTable(true);
      }
    
      
    } catch (error) {
      dispatch(hideLoader());
    }

  }

 

  const handleAddEvent = () =>{

     console.log({myGrid:myGrid.current.getSelectedRecords(),selectdActivityId, selectedServiceId});

     setSelecteRegulatoryRequirements(myGrid.current.getSelectedRecords())
    
    const actObj ={}, serviceObj={}, serviceArry =[]
    actObj.activityId = selectdActivityId
    actObj.regulatoryRequiements = myGrid.current.getSelectedRecords()

    
    serviceArry.push(actObj)
    serviceObj.serviceId = selectedServiceId
    serviceObj.activities = serviceArry

    const filteredData = data.filter(x =>x.serviceId !== selectedServiceId)

    console.log({filteredData});

    setData([...filteredData,serviceObj])

    
   

    setShowTable(false)
  }
  console.log({data});

  

  const handleClickEvent = () => {
    setShow(false);
    setSelecteRegulatoryRequirements([])
      setSelectdActivityId("")
      setSelectedServiceId("")
    console.log({data});
  };

  const actionBegin = (args) => {
    console.log({ args });
    if (args.requestType === "add") {
      args.cancel = true;

      getRegulatoryOption()
      
    }
    if (args.requestType === "beginEdit") {
      args.cancel = true;

      setShow(true);
    }
  };

  useEffect(() => {
    
    if(job?.id){
      setSelectedJob(job)
    }
    
    return () => {
      setSelectedJob(null)
    }
  }, [job])
  
  
console.log({job})

  return (
    <div className="p-4">
      <Modal isOpen={show} size="lg">
        <ModalHeader
          style={{ background: "#e0e6ef", borderBottom: "1px solid #563c91" }}
        >
          <span style={{ fontWeight: 900 }}>
          
            {`Regulatory Option: ${rowSelected.name}`}
          </span>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="processType">
                  Service <span className="isRequire">*</span>
                </Label>
                <Input
                  type="select"
                  name="selectedServiceId"
                  id="selectedServiceId"
                  onChange={getActivities}
                  value={selectedServiceId}
                >
                 <option>Select Service</option>
               

                 {selectedService.map(service => <option  key={service?.serviceId ||service?.id} value={service?.serviceId ||service?.id}>{service.name}</option>)}
                
                </Input>
                
                {/* <Input
                  type="select"
                  name="selectedServiceId"
                  id="selectedServiceId"
                  onChange={getActivities}
                  value={selectedServiceId}
                  >
                 
                  {
                   job?.id ??
                   <>
                    <option value="">Select Service</option>
                    {job?.jobServices.map(service => <option  key={service.id} value={service.id}>{service.name}</option>)}
                   </>
                  
                  }
                </Input> */}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="">
                 Activity<span className="isRequire">*</span>
                </Label>
                <Input
                  type="select"
                  name="requestDate"
                  id=""
                  placeholder="Activity"
                  onChange={onActivityChange}
                  value={selectdActivityId}
                >
                 <option>Select Activity</option>
                  {
                    serviceActivities.map(service => <option  key={service?.id} value={service.id}>{service.name}</option>)
                  }
                   
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <GridComponent
            toolbar={[{ text: "Add", align: "right" }]}
            height={250}
            allowPaging={true}
            editSettings={{
              allowEditing: true,
              allowAdding: true,
              allowDeleting: true,
              newRowPosition: "Top",
            }}
            actionBegin={actionBegin}
            dataSource={selecteRegulatoryRequirements}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="id"
                headerText="ID"
                width="300"
                textAlign="left"
                visible={false}
              />
              <ColumnDirective
                field="name"
                headerText="Name"
                width="300"
                textAlign="left"
              />

              <ColumnDirective
                headerText="Action"
                width="80"
                textAlign="center"
                commands={commands}
              ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Page, CommandColumn, Toolbar, Edit, Group]} />
          </GridComponent>
        </ModalBody>
        <ModalFooter>
          <Button
            className="c-secondary"
            size="sm"
            onClick={() => setShow(false)}
          >
            Cancel
          </Button>
          <Button className="c-primary" size="sm" onClick={handleClickEvent}>
            Add
          </Button>{" "}
        </ModalFooter>
      </Modal>
    
      <RegulatorySelectionTable 
      title ={`Add ${rowSelected.name} Requirement`} 
      setShowTable={setShowTable} 
      showTable={showTable} 
      data={regulatoryRequirements}
      handleAddEvent={handleAddEvent}
      myGrid={myGrid}
       />
    </div>
  );
};

export default RegulatoryRequirement;
