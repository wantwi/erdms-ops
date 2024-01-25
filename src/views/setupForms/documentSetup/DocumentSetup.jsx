import PageTitle from "components/common/PageTitle";
import DocumentSetupTable from "components/tables/syncfussionTable/documentSetupTable/DocumentSetupTable";
import React, { useState, useEffect } from "react";
import DocumentForm from "./form/DocumentForm";
import { useDispatch } from "react-redux";
import { getSelectedDocument } from "../../../redux/documentSetup/actions";

import "./documentSetup.css";

import "react-toastify/dist/ReactToastify.css";
import useDebounce from "hooks/useDebounce";
import useCustomApi from "api/useCustomApi";
import { useGet } from "hooks/useQueryInfo";

const DocumentSetup = (props) => {
  const customApi = useCustomApi();
  const dispatch = useDispatch();
  const [text, SetText] = useState("");
  const debouncedSearch = useDebounce(text, 500);
  const [openModal, setOpenModal] = useState(false);

  const GetAllDocuments = async () => {
    let url = `Documents?results=1000`;
    if (!!text) {
      url += `&filter=${text}`;
    }
    const response = await customApi.get(url);
    return response.data.items;
  };
  const GetAllDocumentTypes = async () => {
    let url = `Documents/DocumentTypes?results=1000`;

    const response = await customApi.get(url);
    return response.data;
  };

  const onSuccess = (data) => {};
  const onError = (data) => {
    console.error({ onError: data });
  };

  const { isLoading, data } = useGet(
    "documents",
    GetAllDocuments,
    debouncedSearch,
    onSuccess,
    onError
  );
  const { data: documentTypes } = useGet(
    "document-type",
    GetAllDocumentTypes,
    "",
    onSuccess,
    onError
  );

  const btnClickHandler = () => {
    dispatch(
      getSelectedDocument({
        code: "",
        name: "",
        description: "",
        docType: "",
        status: "",
      })
    );
    setOpenModal(true);
  };

  return (
    <>
      <div>
        <PageTitle
          title="Setup"
          className="plr-15"
          breadCrumb={[
            {
              name: "Service Items",
            },
            {
              name: "Service Document",
            },
          ]}
        />
        <div className="plr-15">
          <div className="roe-card-style mtb-15">
            <div className="roe-card-header module-header">
              <div className="flex-1 mb-3">
                <span className="hash"># </span>{" "}
                <span style={{ fontWeight: 600 }}>Document Setup</span>
              </div>
              <div>
                <div className="mb-2 row">
                  <div className="col-sm-4">
                    <div className="search-box me-2 mb-2 d-inline-block">
                      <div className="position-relative">
                        <label for="search-bar-0" className="search-label">
                          <span id="search-bar-0-label" className="sr-only">
                            Search
                          </span>
                          <input
                            id="search-bar-0"
                            type="text"
                            aria-labelledby="search-bar-0-label"
                            class="form-control "
                            placeholder="Search"
                            value={text}
                            onChange={(e) => SetText(e.target.value)}
                            style={{ width: 400 }}
                          />
                        </label>
                        <i class="bx bx-search-alt search-icon"></i>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-8 ">
                    <div class="text-sm-end" style={{ float: "right" }}>
                      <button
                        type="button"
                        class="btn-rounded mb-2 me-2 btn btn-primary"
                        onClick={btnClickHandler}
                      >
                        <i class="mdi mdi-plus me-1"></i> Add New Document
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <DocumentSetupTable data={data} setOpenModal={setOpenModal} />
            </div>
          </div>

          <DocumentForm
            documentTypes={documentTypes}
            openModal={openModal}
            setOpenModal={setOpenModal}
            title={
              document.id
                ? `Service Document: ${document.name}`
                : "New Document"
            }
          />
        </div>
      </div>
    </>
  );
};

export default DocumentSetup;
