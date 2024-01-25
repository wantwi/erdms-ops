import { EquipmentSetupActionTypes } from "./action";



const {GET_ALL_EQUIPMENT,SET_EQUIPMENT,SET_SEARCH_RESULT,SHOW_MODAL, } = EquipmentSetupActionTypes;

const initEquipment = {
    code: "",
    name: "",
    description: "",
    status: true,
    equipmentTypeId:""
  };

const initialState = {
    equipments: [],
  showModal: false,
  equipment:initEquipment,
 
 
};

const EquipmentSetupReducer = function (state = initialState, action) {
  switch (action.type) {
   
    case SHOW_MODAL:
      {
        return {
          ...state,
          showModal: action.payload
        };
      }
  
    case GET_ALL_EQUIPMENT:
      {
        return {
          ...state,
          equipments: [...action.payload],
          showModal: false,
       
        };
      }
   
    case SET_SEARCH_RESULT:

      {
        return {
          ...state,
          equipments: [...action.payload],
        };
      }

      case SET_EQUIPMENT:

        {
          return {
            ...state,
            equipment: action.payload,
           
          };
        }


    default: {
      return {
        ...state,
      };
    }
  }
};

export default EquipmentSetupReducer;
