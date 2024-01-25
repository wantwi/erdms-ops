import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { hideLoader, showLoader, setResponse } from "redux/loader/Loader";
import { renderDocument } from "util/helper";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import { CustomAxios } from "util/customAxios";

export const CustomerActionTypes = {
  GET_ALL_CUSTOMERS: "GET_ALL_CUSTOMERS",
  ADD_NEW_CUSTOMER: "ADD_NEW_CUSTOMER",
  SET_CUSTOMER: "SET_CUSTOMER",
  GET_INDUSTRIES: "GET_INDUSTRIES",
  GET_POSITION: "GET_POSITION",
  IS_EDIT: "IS_EDIT",
  SET_SEARCH_RESULT: "SET_SEARCH_RESULT",
};


const {
  ADD_NEW_CUSTOMER,
  GET_ALL_CUSTOMERS,
  SET_CUSTOMER,
  GET_INDUSTRIES,
  GET_POSITION,
  IS_EDIT,
  SET_SEARCH_RESULT,
} = CustomerActionTypes;

let data = [];



// export const showLoader = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: SHOW_LOADER,
//     });
//   } catch (error) {
//     console.log({ error });
//   }
// };




export const toggleModal = () => async (dispatch) => {
  //   try {
  //     dispatch({
  //       type: SHOW_MODAL
  //     });
  //   } catch (error) {
  //     console.log({ error });
  //   }
};

export const setEditMode = (value) => async (dispatch) => {
  dispatch({
    type: IS_EDIT,
    payload: value,
  });
};

export const getIndustries = () => async (dispatch) => {
  try {
    const industries = await CustomAxios.get(
      `Customers/Industries`
    );

    console.log({ industries });

    dispatch({
      type: GET_INDUSTRIES,
      payload: industries.data,
    });
  } catch (error) {}
};

export const getPosition = () => async (dispatch) => {
  try {
    const positions = await CustomAxios.get(
      `Customers/Positions`
    );
    console.log({ positions });

    dispatch({
      type: GET_POSITION,
      payload: positions.data,
    });
  } catch (error) {}
};

export const getAllCustomers = () => async (dispatch) => {
  dispatch(showLoader());
  try {
    const customers = await CustomAxios.get(
      `Customers?results=1000`
    );
    console.log({ customers });
    dispatch({
      type: GET_ALL_CUSTOMERS,
      payload: customers.data.items,
    });
  } catch (error) {
    console.log({ error });
    dispatch(
      setResponse(
        error.response?.data?.errors[0]?.message || "Something went wrong",
        false
      )
    );
  }
  dispatch(hideLoader());
  setTimeout(() => dispatch(setResponse("", true)), 5500);
};

export const addNewCustomer = (newdata) => async (dispatch) => {
  dispatch(showLoader());

  console.log({ newdata });

  // newdata.exemptionLetterPath = uuidv4();

  try {
    if (newdata.taxExempt) {
      let fd = new FormData();
      fd.append("file", newdata.fileValue);

      //file upload

      const exemptTaxDoc = await CustomAxios.post(
        `upload`,
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (exemptTaxDoc.data.fileId) {
        newdata.exemptionLetterPath = exemptTaxDoc.data.fileId;

        const customer = await CustomAxios.post(
          `Customers`,
          newdata
        );

        if (customer) {
          dispatch(setResponse("Customer added successfully", true));
          dispatch(getAllCustomers());
          dispatch(hideLoader());
        }
      }
    } else {
      let requestData = {
        name: newdata.name,
        industryId: newdata.industryId,
        taxExempt: false,
        exemptionLetterPath: " ",
        phone1: newdata.phone1,
        phone2: newdata.phone2,
        email: newdata.email,
        address: newdata.address,
        digitalAddress: newdata.digitalAddress,
        contactPerson: newdata.contactPerson,
      };

      const customer = await CustomAxios.post(
        `Customers`,
        requestData
      );
      dispatch(setResponse("Customer added successfully", true));
      dispatch(getAllCustomers());
      dispatch(hideLoader());
    }
  } catch (error) {
    console.log({ error });
    dispatch(
      setResponse(
        error.response?.data?.errors[0]?.message || "Something went wrong",
        false
      )
    );
  }
  dispatch(hideLoader());
  dispatch(setResponse("", true));
};

export const updateNewCustomer = (newdata) => async (dispatch) => {
  dispatch(showLoader());

  try {
    if (newdata.taxExempt) {
      let fd = new FormData();
      fd.append("file", newdata.fileValue);

      //file upload

      const exemptTaxDoc = await CustomAxios.put(
        `upload`,
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (exemptTaxDoc.data.fileId) {
        newdata.exemptionLetterPath = exemptTaxDoc.data.fileId;

        const customer = await CustomAxios.put(
          `Customers`,
          newdata
        );

        if (customer) {
          dispatch(setResponse("Customer updated successfully", true));
          dispatch(getAllCustomers());
          dispatch(hideLoader());
        }
      }
    } else {
      let requestData = {
        companyId: newdata.id,
        name: newdata.name,
        industryId: newdata.industryId,
        taxExempt: false,
        exemptionLetterPath: " ",
        phone1: newdata.phone1,
        phone2: newdata.phone2,
        email: newdata.email,
        address: newdata.address,
        digitalAddress: newdata.digitalAddress,
        contactPerson: newdata.contactPerson,
      };

      const customer = await CustomAxios.put(
        `Customers`,
        requestData
      );
      dispatch(setResponse("Customer updated successfully", true));
      dispatch(getAllCustomers());
      dispatch(hideLoader());
    }
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = '/lms-operation-host/login';
    }
    dispatch(
      setResponse(
        error.response?.data?.errors[0]?.message || "Something went wrong",
        false
      )
    );
    dispatch(hideLoader());
  }
  dispatch(hideLoader());
  dispatch(setResponse("", true));
};

export const setCustomer = (data) => async (dispatch) => {
    let currentObj = {
      id: data.id,
      name: data.name,
      industryId: data.industry.id,
      taxExempt: data.taxExempt,
      exemptionLetterPath: "",
      file: "",
      issuedAt: data.issuedAt.replace("T00:00:00", ""),
      expiredAt: data.expiredAt.replace("T00:00:00", ""),
      issuingAuthority: data?.issuingAuthority ||"",
      signedBy: data?.signedBy ||"",
      phone1: data?.phone1 ||"",
      phone2: data?.phone2 ||"",
      email: data?.email ||"",
      address: data?.address ||"",
      digitalAddress: data.digitalAddress ||"",
      isSignedUp:data?.isSignedUp ||"",
      contactPerson: {
        name: data?.contactPerson?.name ||"",
        firstName: data?.contactPerson?.firstName ||"",
        lastName: data?.contactPerson?.lastName ||"",
        positionId: data?.contactPerson?.position?.id ||"",
        phone1: data?.contactPerson?.phone1 ||"",
        phone2: data?.contactPerson?.phone2 || "",
        email: data?.contactPerson?.email ||"",
        address: "",
      },
    };

    dispatch({
      type: SET_CUSTOMER,
      payload: currentObj,
    });
};


export const getCustomer = (newdata) => async (dispatch) => {
  dispatch(showLoader());

  try {
    const request = await CustomAxios.get(
      `Customers/${newdata.id}`
    );

    const data = request.data;
    let currentObj = {
      id: data.id,
      name: data.name,
      industryId: data.industry.id,
      taxExempt: data.taxExempt,
      exemptionLetterPath: "",
      file: "",
      issuedAt: data.issuedAt.replace("T00:00:00", ""),
      expiredAt: data.expiredAt.replace("T00:00:00", ""),
      issuingAuthority: data?.issuingAuthority ||"",
      signedBy: data?.signedBy ||"",
      phone1: data?.phone1 ||"",
      phone2: data?.phone2 ||"",
      email: data?.email ||"",
      address: data?.address ||"",
      digitalAddress: data.digitalAddress ||"",
      isSignedUp:data?.isSignedUp ||"",
      contactPerson: {
        name: data?.contactPerson?.name ||"",
        firstName: data?.contactPerson?.firstName ||"",
        lastName: data?.contactPerson?.lastName ||"",
        positionId: data?.contactPerson?.position?.id ||"",
        phone1: data?.contactPerson?.phone1 ||"",
        phone2: data?.contactPerson?.phone2 || "",
        email: data?.contactPerson?.email ||"",
        address: "",
      },
    };

    dispatch({
      type: SET_CUSTOMER,
      payload: currentObj,
    });

    setTimeout(() => {
      dispatch(setEditMode(true));

      dispatch(hideLoader());
    }, 2000);
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = '/lms-operation-host/login';
    }
    dispatch(
      setResponse(
        error.response?.data?.errors[0]?.message || "Something went wrong",
        false
      )
    );
  }
  // dispatch(hideLoader());
  dispatch(setResponse("", true));
};

export const findCustomer = (option) => async () => {};

export const handleSearch = (textValue) => async (dispatch) => {
  const Search = debounce(async () => {
    const result = await CustomAxios.get(
      `Customers?filter=${textValue}`
    );
    dispatch({
      type: SET_SEARCH_RESULT,
      payload: result.data.items,
    });
    console.log({ result });
  }, 200);
  Search();
};

export const getSelectedCustomer = (data) => async (dispatch) => {
  dispatch(showLoader());

  dispatch({
    type: SET_CUSTOMER,
    payload: data,
  });

  dispatch(hideLoader());
  dispatch(setResponse("", true));
};

export const getSelectedCustomer2 = (data) => async (dispatch) => {
  console.log({ data });

  try {
    const res = await CustomAxios.get(`Customers/${data.id}`);

    if (res) {
      const { data } = res;
      console.log({ data });
    }

  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = '/lms-operation-host/login';
    }
  }
};
export const deleteCustomer = (data) => async (dispatch) => {
  dispatch(showLoader());

  try {
    const docs = await CustomAxios.delete(
      `Customers`,
      { data: { companyId: data.id } },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (docs) {
      dispatch(setResponse("Customer deleted successfully", true));
      dispatch(getAllCustomers());
      dispatch(hideLoader());
    }
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = '/lms-operation-host/login';
    }

    dispatch(
      setResponse(
        error.response?.data?.errors[0]?.message || "Something went wrong",
        false
      )
    );
  }
  dispatch(hideLoader());
  dispatch(setResponse("", true));
};


export const createCustomerAccount = (customerId) => async (dispatch) =>{
  dispatch(showLoader());
  try {

    const request = await CustomAxios.post(`Customers/SignUp`, {customerId})

    if(request){

      dispatch(setResponse("Customer login credential sent.", true));
      dispatch(setResponse("", true));
    
      dispatch(hideLoader());
    }

    
  } catch (error) {
     if (error.response.status === 401) {
      window.location.href = '/lms-operation-host/login';
    }
    dispatch(hideLoader());

    dispatch(
      setResponse(
        error.response?.data?.errors[0]?.message || "Something went wrong",
        false
      )
      
    );
  
    dispatch(setResponse("", true));
  }

}