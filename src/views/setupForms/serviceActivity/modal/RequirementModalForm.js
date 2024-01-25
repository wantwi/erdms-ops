import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import RequirementSelectionTable from "../table/RequirementSelectionTable";


const RequirementModalForm = props => {
  const {addToGridBtn, showModal, setShowModal,title,handleClickEvent, setRequirements } = props;

 
  return (
    <div>
      <Modal
        isOpen={showModal}
        size="lg"
      >
        <ModalHeader style={{background:"#e0e6ef", borderBottom:"1px solid #563c91"}}>
          <span style={{ fontWeight: 900 }}>{title}</span>
        </ModalHeader>
        <ModalBody>
            {/* <select ref={requirementVal} className="form-control">
                <option>Select requirement</option>
                {
                    data.map(x => <option key={x.id} value={x.id}>{x.name}</option> )
                }
               
            </select> */}
            <RequirementSelectionTable addToGridBtn={addToGridBtn} setShowModal={setShowModal} setRequirements={setRequirements}/>
        </ModalBody>
        <ModalFooter>
        <Button
            className="c-secondary"
            size="sm"
            onClick={()=>setShowModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="c-primary"
          size="sm"
          onClick={handleClickEvent}
           
          >
            Add
          </Button>{" "}
         
        </ModalFooter>
      </Modal>
    </div>
  );
};



export default RequirementModalForm