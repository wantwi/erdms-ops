
import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";



const ActivityModalForm = (props) => {
  const {
    showModal,
    setShowModal,
    data,
    title,
    activityVal,
    handleClickEvent,
    currData,
  } = props;

  const [activitiesList, setactivitiesList] = useState([]);

  const removeSelectedActivity = () => {
    setactivitiesList(
      activitiesList.filter((x) => x.id !== activityVal.current.value)
    );
  };


  const removeSelectedActivies = () => {
    let unslectedActivities = [];
    data.map((x) => {
      if (!currData.filter((activity) => activity.id == x.id)[0]) {
        unslectedActivities.push(x);
      }
    });

    return unslectedActivities;
  };

  useEffect(() => {
    if (currData.length > 0) {
    
      setactivitiesList(removeSelectedActivies());
    } else {
      setactivitiesList(data);
    
    }
  }, []);

  return (
    <div>
      <Modal isOpen={showModal} size="md">
        <ModalHeader toggle={() => setShowModal(!showModal)}>
          <span style={{ fontWeight: 900 }}>{title}</span>
        </ModalHeader>
        <ModalBody>
           <select ref={activityVal} className="form-control">
            <option>Select activity</option>

            {activitiesList.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </select>
          
          
        </ModalBody>
        <ModalFooter>
          <Button
            className="c-secondary"
            size="sm"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="c-primary"
            size="sm"
            onClick={() => {
              handleClickEvent();
              removeSelectedActivity();
            }}
          >
            Add
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ActivityModalForm;
