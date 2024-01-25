import React, { useState } from "react";

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

import Multiselect from "multiselect-react-dropdown";
import { useSelector } from "react-redux";

const AssignOfficerForm = ({
  title,
  showForm,
  setShowForm,
  activities,
  setActivities,
}) => {
  const [owners, setOwners] = useState([]);

  const { processowners } = useSelector((state) => state.ServiceProcess);



  const onSelect = (values) => {
    setOwners(values);
  };
  const onRemove = (values) => {
    setOwners(values);
  };

  const handleClick = () => {


 let selectedAct = activities.find((x) => x.id === title.id);

selectedAct.officer = { id: "2001", name: "Emily Brown" }

 console.log({selectedAct})

 let newSet = [...activities.filter(x =>x.id !== selectedAct.id),selectedAct]

    console.log({newSet});
 setActivities(newSet)

 setShowForm(false)

 console.log({activities});



    //
    // selectedAct.officer = { id: "2001", name: "Emily Brown" };

    // console.log({ jobActivities });

    // setJobActivities(
    //   jobActivities
    //     .filter((x) => x.sequence !== selectedAct.id)
    //     .push(selectedAct)
    // );

    // console.log({ jobActivities });

    //  setJobActivities(
    //   ...(
    //   ).officer = "william")
    // ),
  };

  return (
    <div>
      <Modal isOpen={showForm} size="md">
        <ModalHeader>
          <span style={{ fontWeight: 900 }}>Activity: </span>
          <span style={{ fontWeight: 700, color: "#5C258D" }}>
            {title.name}{" "}
          </span>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for="processType">Officer Name</Label>
                <Input
                  type="select"
                  name="officerName"
                  id="officerName"
                  //   onChange={handleChange}
                  //   value={values.industryId}
                >
                  <option value="">Select officer</option>
                  <option value="">Emily Jones</option>
                  <option value="">Kofi Boakye</option>
                  <option value="">Alice Tanko</option>
                  <option value="">Jame Mens</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for="processCode">Remarks / Specific Instruction</Label>
                <Input
                  type="textarea"
                  rows={2}
                  name="name"
                  id="processCode"
                  placeholder="Remarks"
                  //   onChange={handleChange}
                  //   value={values.name}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for="processOwner">Process Owner</Label>
                <Multiselect
                  options={processowners}
                  hidden
                  //  selectedValues={process.processOwner}
                  onSelect={onSelect}
                  onRemove={onRemove}
                  placeholder=""
                  closeIcon="circle2"
                  isObject={true}
                  displayValue="name"
                  name="processOwner"
                  // onChange={handleChange}
                  // value={values.processOwner = owners}
                />
                {/* {errors.processOwner && touched.processOwner && (
                              <div className="text-danger">{errors.processOwner}</div>
                            )} */}
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            className="c-secondary"
            onClick={() => setShowForm(false)}
          >
            Close
          </Button>
          <Button className="c-primary" size="sm" onClick={handleClick}>
            Save
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AssignOfficerForm;
