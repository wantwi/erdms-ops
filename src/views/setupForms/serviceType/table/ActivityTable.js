import React, { useState, useRef, useEffect } from "react";
// import {
//   ColumnDirective,
//   ColumnsDirective,
//   GridComponent,
//   Page,
//   Inject,
//   Toolbar,
//   Group,
//   Edit,
//   CommandColumn,
// } from "@syncfusion/ej2-react-grids";
import "../../../../components/tables/syncfussionTable/generic.style2.css";
import ActivityModalForm from "../modal/ActivityModalForm";
import { useDispatch, useSelector } from "react-redux";

import {
 
  ListItem,
  RemoveItem,
  Wrapper,
  WrapperH,
  BtnWarp,
 
  ListWrapper,
 
} from "../partials/styles";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DragHandle } from "../partials/DragHandle";
import * as FaIcons from "react-icons/fa"
import useCustomApi from "api/useCustomApi";
import { useGet } from "hooks/useQueryInfo";
import { setAllSeviceActivity } from "redux/serviceActivity/actions";


// const removeDuplicate =()=>{
//   return  [...new Set(array)]
// }



let grid;

const ActivityTable = ({ currData, setCurrData }) => {
  const dispatch = useDispatch()

  const customApi = useCustomApi();

  // const GetAllServiceActivities = async () => {
  //   let url = `Activities?results=1000`;
  //   const response = await customApi.get(url);
  //   return response.data.items;
  // };

  // const onServiceSuccess = (data) => {
  //   console.log({onServiceSuccess: data})
  //   dispatch(setAllSeviceActivity(data))
 
  //   //
    
  // }
 
  // const {isLoading,  data } = useGet(
  //   "sevice-activities",
  //   GetAllServiceActivities,
  //   "",
  //   onServiceSuccess
   
  // );
  
   const { serviceActities } = useSelector((state) => state.seviceActitvity);

 console.log({serviceActities})

  const gridInstance = useRef(null);
  const [show, setShow] = useState(false);
  const activityVal = useRef("");

  const [items, setItems] = useState([]);
  // const [selected, setSelected] = useState("");
  // const [textVal, setTextVal] = useState("");
  // const [favs, setfavs] = useState([]);

  const remove = (id) => {
   
    setItems((prev) => prev.filter((x) => x.activityId !== id));
  };

  const handleClickEvent = () => {
  
    setShow(false);
    setItems((prev) => [
      ...prev,
      {
        activityId: activityVal.current?.value,
        name: serviceActities.find((x) => x.id === activityVal.current?.value)
          .name,
      },
    ]);
    


  };

  // const actionBegin = (args) => {
  //   if (args.requestType === "add") {
  //     args.cancel = true;
  //     setShow(true);
  //   }
  // };

 
  
  useEffect(() => {
    currData.length > 0 ? setItems(currData.map((obj, i) => ({ activityId: obj.id, ...obj }))):setItems([])

    return ()=>{
      setItems([])
    }
  }, []);


  useEffect(() => {
    setCurrData(items.map((obj,i)=>({sequence:i+1,...obj})))
  }, [items]);

  return (
    <div className="p-4" style={{width:"100%"}}>
      <BtnWarp>
        <button type="button" className="btn btn-sm btn-primary"  onClick={()=> setShow(true)}><FaIcons.FaPlus/>  Add</button>
      </BtnWarp>
      <WrapperH>
        <div></div>
        <div>Sequence</div>
        <div>Name</div>
        <div>Action</div>
      </WrapperH>
      <DragDropContext
        onDragEnd={(props) => {
          const srcI = props.source.index;
          const desI = props.destination.index;
          items.splice(desI, 0, items.splice(srcI, 1)[0]);

          console.log("items state", items);
        }}
      >
        <Droppable droppableId="droppable-1">
          {(provided, snapshot) => (
            <ListWrapper
              ref={provided.innerRef}
              style={{
                backgroundColor: snapshot.isDraggingOver ? "" : "",
              }}
              {...provided.droppableProps}
            >
              {items
                ? items.map((item, i) => (
                    <Draggable
                      key={i + 1}
                      draggableId={`draggable-${i + 1}`}
                      index={i}
                    >
                      {(provided, snapshot) => (
                        <ListItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={{
                            ...provided.draggableProps.style,
                            boxShadow: snapshot.isDragging
                              ? "0 0 1 1 0.4rem #666"
                              : "none",
                          }}
                        > 
                          
                          <Wrapper>
                            <DragHandle {...provided.dragHandleProps} />
                            <div>{i + 1}</div>
                            <div> {item.name}</div>
                            <div><RemoveItem
                            title={"Remove " + item.name}
                            onClick={() => remove(item.activityId)}
                          >
                            <i className="fa fa-trash"></i>
                          </RemoveItem></div>
                          </Wrapper>
                        
                          
                        </ListItem>
                      )}
                    </Draggable>
                  ))
                : "You have no task"}
              {provided.placeholder}
            </ListWrapper>
          )}
        </Droppable>
      </DragDropContext>
     

      <ActivityModalForm
        data={serviceActities}
        activityVal={activityVal}
        handleClickEvent={handleClickEvent}
        showModal={show}
        setShowModal={setShow}
        title="Add Activity"
        currData={currData}
      />
    </div>
  );
};

export default ActivityTable;
