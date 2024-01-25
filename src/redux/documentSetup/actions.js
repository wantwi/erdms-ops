import axios from "axios";
import {
  hideLoader,
  showLoader,
  setResponse,
  setEditMode,
} from "redux/loader/Loader";
import { renderDocument } from "util/helper";
import { debounce } from "lodash";
import { CustomAxios } from "util/customAxios";

export const DocumentSetupActionTypes = {
  GET_ALL_DOCUMENT: "GET_ALL_DOCUMENT",
  ADD_NEW_DOCUMENT: "ADD_NEW_DOCUMENT",
  SHOW_MODAL: "SHOW_MODAL",
  GET_DOCUMENT_TYPE: "GET_DOCUMENT_TYPE",
  SHOW_LOADER: "SHOW_LOADER",
  SET_SEARCH_RESULT: "SET_SEARCH_RESULT",
  SET_DOCUMENT: "SET_DOCUMENT",
};

const {
  GET_ALL_DOCUMENT,
  ADD_NEW_DOCUMENT,
  SHOW_MODAL,
  GET_DOCUMENT_TYPE,
  SHOW_LOADER,
  SET_SEARCH_RESULT,
  SET_DOCUMENT,
} = DocumentSetupActionTypes;

let data = [];



export const toggleModal = () => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_MODAL,
    });
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = "/lms-operation-host/login";
    }
  }
};

export const getAllDocumentTypes = () => async (dispatch) => {
  try {
    // dispatch(showLoader())
    //https://psl-webapps
    const docTypes = await CustomAxios.get(`Documents/DocumentTypes`);

    dispatch({
      type: GET_DOCUMENT_TYPE,
      payload: docTypes.data,
    });
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = "/lms-operation-host/login";
    }
  }
  dispatch(hideLoader());
};

export const getAllDocuments = () => async (dispatch) => {
  dispatch(showLoader());
  try {
    const docs = await CustomAxios.get(`Documents?results=1000`);

    dispatch({
      type: GET_ALL_DOCUMENT,
      payload: renderDocument(docs.data.items),
    });
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = "/lms-operation-host/login";
    }
    dispatch(setResponse(error.message, false));
  }
  dispatch(hideLoader());
  setTimeout(() => dispatch(setResponse("", true)), 5500);
};

export const addNewDocument = (newdata) => async (dispatch) => {
  dispatch(showLoader());
  let newDoc = {};
  newDoc.code = newdata.code;
  newDoc.name = newdata.name;
  newDoc.description = newdata.description;
  newDoc.documentTypeId = newdata.docType;
  newDoc.status = newdata.status === "1" ? true : false;

  try {
    const docs = await CustomAxios.post(`Documents`, newDoc);
    console.log({ docs });

    if (docs) {
      dispatch(toggleModal());
      dispatch(setResponse("Document added successfully", true));
      dispatch(getAllDocuments());
      dispatch(hideLoader());
    }
  } catch (error) {
    dispatch(setResponse(error.response.data.errors[0].message, false));
  }
  dispatch(hideLoader());
  dispatch(setResponse("", true));
};

export const handleSearch = (textValue) => async (dispatch) => {
  const Search = debounce(async () => {
    const result = await CustomAxios.get(`Documents?filter=${textValue}`);

    dispatch({
      type: SET_SEARCH_RESULT,
      payload: renderDocument(result.data.items),
    });

    console.log({ result });
  }, 200);

  Search();
};

export const getSelectedDocument = (data) => async (dispatch) => {
  console.log({ data });

  dispatch(setEditMode());

  dispatch({
    type: SET_DOCUMENT,
    payload: data,
  });
};

export const updateDocument = (newdata) => async (dispatch) => {
  dispatch(showLoader());
  let newDoc = {};
  newDoc.code = newdata.code;
  newDoc.name = newdata.name;
  newDoc.description = newdata.description;
  newDoc.documentTypeId = newdata.docType;
  newDoc.status = newdata.status === "1" ? true : false;
  newDoc.documentId = newdata.id;
  try {
    const docs = await CustomAxios.put(`Documents`, newDoc);

    if (docs) {
      dispatch(toggleModal());
      dispatch(setResponse("Document updated successfully", true));
      dispatch(getAllDocuments());
      dispatch(hideLoader());
    }
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = "/lms-operation-host/login";
    }
    dispatch(setResponse(error.response.data.errors[0].message, false));
  }
  dispatch(hideLoader());
  dispatch(setResponse("", true));
};

export const deleteDocument = (newdata) => async (dispatch) => {
  dispatch(showLoader());
  let newDoc = {};

  newDoc.documentId = newdata.id;

  // console.log({newDoc})

  // return
  try {
    const docs = await CustomAxios.delete(
      `Documents`,
      { data: { documentId: newdata.id } },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (docs) {
      dispatch(setResponse("Document deleted successfully", true));
      dispatch(getAllDocuments());
      dispatch(hideLoader());
    }
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = "/lms-operation-host/login";
    }

    dispatch(setResponse(error.response.data.errors[0].message, false));
  }
  dispatch(hideLoader());
  dispatch(setResponse("", true));
};
