import React from 'react'

const FormModal = () => {
  return (
    <Modal isOpen={openModal} size="lg">
    <ModalHeader
      style={{ background: "#e0e6ef", borderBottom: "1px solid #563c91" }}
    >
      <span style={{ fontWeight: 900 }}>{title}</span>
    </ModalHeader>
    <ModalBody> </ModalBody>
        <ModalFooter>
          <Button className="c-secondary" onClick={() => setOpenModal(false)}>
            {personnel.id ? (
              <>
                <span>
                  <i className="fa fa-close"></i>{" "}
                </span>{" "}
                Close
              </>
            ) : (
              <>
                <span>
                  <i className="fa fa-close"></i>{" "}
                </span>{" "}
                Cancel
              </>
            )}
          </Button>
          {personnel.id ? (
            <Button className="c-danger" onClick={() => handleDelete()}>
              Delete
            </Button>
          ) : null}
          <Button className="c-primary" onClick={handleClickEvent}>
            {personnel.id ? (
              <>
                <span>
                  <i className="fa fa-edit"></i>{" "}
                </span>{" "}
                Update
              </>
            ) : (
              <>
                <span>
                  <i className="fa fa-save"></i>{" "}
                </span>{" "}
                Save
              </>
            )}
          </Button>{" "}
        </ModalFooter>
      </Modal>
  )
}

export default FormModal