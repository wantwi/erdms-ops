import React, { Fragment, useState, useRef, useEffect } from "react";
import Select from "react-select";
import { components } from "react-select";
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "redux/loader/Loader";
import { CustomAxios } from "util/customAxios";
import { QueryCache  } from "react-query";
import useCustomApi from "api/useCustomApi";
import { useGet } from "hooks/useQueryInfo";

const RegulatoryForm = ({
  regTableRef,
  selectedServices,
  setRegulatoryOption,
  setJobRegulatoryOpt,
  isOpen,
  setIsOpen,
  data,
}) => {
  const dispatch = useDispatch();
  const [regulatoryOptions, setRegulatoryOptions] = useState([]);
  const [regulatoryRequirements, setRegulatoryRequirements] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedRequirements, setSelectedRequirements] = useState([]);
  const [serviceActivities, setServiceActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const customApi = useCustomApi();

  const GetAllRegulatoryOptions = async () => {
    let url = `RegulatoryOptions?results=1000`;
    const response = await customApi.get(url);
    return response.data.items;
  };

  const { data: Options } = useGet(
    "regulatoryOptions",
    GetAllRegulatoryOptions,
    "",
    ()=>{},
    ()=>{},
  );




  // const { regulatoryOptions: Options } = useSelector(
  //   (state) => state.regulatoryOptionState
  // );

  const hiddenOptions =
    selectedRequirements.length > 2 ? selectedRequirements.slice(0, 2) : [];

  const roptions = regulatoryOptions.filter(
    (x) => !hiddenOptions.includes(x.value)
  );
  const getRegulatoryRequirements = async (id) => {
    if (id.length === 0 || id === null || id === undefined) {
      return;
    }
    dispatch(showLoader());
    try {
      const response = await customApi.get(
        `Requirements/RegulatoryOption?regulatoryOptionId=${id}`
      );

      if (response) {
        setRegulatoryRequirements(
          response.data.items.map((x) => ({ value: x.id, label: x.name }))
        );
        dispatch(hideLoader());
      }
    } catch (error) {
      dispatch(hideLoader());
    }
  };

  const getServiceActivities = async (id) => {
    dispatch(showLoader());
    try {
      const response = await customApi.get(`Activities/Services/${id}`);

      if (response) {
        setServiceActivities(response.data);
        dispatch(hideLoader());
      }
    } catch (error) {
      dispatch(hideLoader());
    }
  };
  //

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#9e9e9e",
      minHeight: "32px",
      height: "32px",
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: "30px",
      padding: "0 6px",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),

    indicatorSeparator: (state) => ({
      display: "none",
    }),

    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "30px",
    }),
  };

  const MoreSelectedBadge = ({ items }) => {
    const style = {
      //   marginLeft: "auto",
      background: "#d4eefa",
      borderRadius: "4px",
      fontFamily: "Open Sans",
      fontSize: "11px",
      position: "absolute",
      right: 0,
      padding: "3px",
      order: 99,
    };
    const title = items.join(", ");
    const length = items.length;
    const label = `+ ${length} item${length !== 1 ? "s" : ""} selected`;
    return (
      <div style={style} title={title}>
        {label}
      </div>
    );
  };

  const MultiValue = ({ index, getValue, ...props }) => {
    const maxToShow = 2;
    const overflow = getValue()
      .slice(maxToShow)
      .map((x) => x.label);
    return index < maxToShow ? (
      <components.MultiValue {...props} />
    ) : index === maxToShow ? (
      <MoreSelectedBadge items={overflow} />
    ) : null;
  };

  const handleChange = (e) => {
    setSelectedRequirements(Array.isArray(e) ? e.map((x) => x) : []);
  };

  const handleRegulatorySelection = (e) => {
    setSelectedOption(e.target.value);
    getRegulatoryRequirements(e.target.value);
    setSelectedRequirements([]);
  };
  const handleServiceSelection = (e) => {
    setServiceActivities([]);
    setSelectedActivity("");
    setSelectedService(e.target.value);
    getServiceActivities(e.target.value);
  };

  const handleAddOption = () => {
    let obj = {
      regulatoryOptionId: selectedOption,
      regulatoryOptionName: Options.find((x) => x.id === selectedOption).name,
      serviceId: selectedService,
      serviceName: selectedServices
        .map((x) => ({ ...x, id: x?.id || x?.serviceId }))
        .find((x) => x.id === selectedService).name,
      activityName: serviceActivities.find((x) => x.id === selectedActivity)
        .name,
      activityId: selectedActivity,
      jobRegulatoryRequiements: selectedRequirements.map((x) => ({
        id: x.value,
        name: x.label,
      })),
      serviceSequence: selectedServices
        .map((x) => ({ ...x, id: x?.id || x?.serviceId }))
        .find((x) => x.id === selectedService).serviceSequence,
    };

    setJobRegulatoryOpt((prev) => [...prev, obj]);
    setIsOpen(false);

    setSelectedOption("");
    setSelectedRequirements([]);
    setServiceActivities([]);
    setSelectedActivity("");
    getRegulatoryRequirements([]);
    setServiceActivities([]);
    setSelectedActivity("");
    setSelectedService(null);
  };

  useEffect(() => {
    setSelectedOption("");
    setSelectedRequirements([]);
    setServiceActivities([]);
    setSelectedActivity("");
    getRegulatoryRequirements([]);
    setSelectedService(null);
    setRegulatoryOptions(Options);
    return () => {
      setRegulatoryOptions([]);
      setSelectedService(null);
    };
  }, []);
  console.log({ jobRegulatoryOpt: data });
  return (
    <Modal
      isOpen={isOpen}
      size="lg"
      //className={className}
    >
      <ModalHeader
        style={{ background: "#e0e6ef", borderBottom: "1px solid #563c91" }}
      >
        <span style={{ fontWeight: 900 }}>Add Regulatory Requirement</span>
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col md={4}>
            <FormGroup>
              <Label for="processType">
                Regulatory Option <span className="isRequire">*</span>
              </Label>
              <Input
                type="select"
                name="financeId"
                id="financeId"
                onChange={handleRegulatorySelection}
                value={selectedOption}
              >
                <option>Select regulatory option</option>
                {regulatoryOptions.map((x) => (
                  <option key={x?.id} value={x?.id}>{x.name}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col Col md={8}>
            <FormGroup>
              <Label for="processType">Requirement</Label>
              <Select
                onChange={handleChange}
                isMulti
                name="colors"
                options={regulatoryRequirements}
                className="basic-multi-select"
                classNamePrefix="select"
                value={regulatoryRequirements.filter((obj) =>
                  selectedRequirements.includes(obj)
                )}
                components={{ MultiValue }}
                styles={customStyles}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="processType">
                Service <span className="isRequire">*</span>
              </Label>
              <Input
                type="select"
                name="service"
                id="service"
                onChange={handleServiceSelection}
                value={selectedService}
              >
                <option>Select service</option>
                {selectedServices.map((x) => (
                  <option key={x?.id} value={x?.id || x?.serviceId}>{x.name}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="processType">
                Activity <span className="isRequire">*</span>
              </Label>
              <Input
                type="select"
                name="activity"
                id="activity"
                onChange={(e) => setSelectedActivity(e.target.value)}
                value={selectedActivity}
              >
                <option>Select activity</option>
                {serviceActivities.map((x) => (
                  <option key={x?.id} value={x?.id}>{x.name}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button className="c-secondary" onClick={() => setIsOpen(false)}>
          Close
        </Button>
        <Button className="c-primary" onClick={handleAddOption}>
          Add
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default RegulatoryForm;
