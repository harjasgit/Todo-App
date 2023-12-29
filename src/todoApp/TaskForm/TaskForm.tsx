import { MessageBar, MessageBarType, PrimaryButton, Stack, TextField } from "@fluentui/react";
import useInput from "./useInputs";
import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../todoProvider";
import { ActionTypeEnum, ITask } from "../write";
import todoAppString from "../String.json";

type Props = {
   editTaskid : string | null
}

const TaskForm = ({editTaskid} : Props)=>{

    const { activeTasks,dispatch} = useContext(TodoContext);
    const title = useInput("");
   
      useEffect(()=>{
    if(editTaskid){
      const taskData = activeTasks.find(task => task.id === editTaskid)

      title.set(taskData?.title || "");

    }


      }, [editTaskid]);

const [showMessage , setShowMessage] = useState<{type:MessageBarType , message: string}>({type: MessageBarType.success, message: ""})    


useEffect(()=>{
if(showMessage.message){
   setTimeout(() => {
       setShowMessage({type: MessageBarType.success, message: ""});
   } , 1000);
}
}, [showMessage.message])

const addTaskAction = () =>{
    const data: ITask = {
        title: title.value,
        id: "",
        isFav: false
    };
    dispatch({type: ActionTypeEnum.Add , data});
  setShowMessage({type: MessageBarType.success ,message: "Task Added"});
  title.set("");
}

const updateTaskAction = ()=>{

    const taskData = activeTasks.find(task => task.id === editTaskid)
    if(taskData){
    const data: ITask = {
        title: title.value,
        id: taskData.id || "",
        isFav: taskData.isFav || false,
    }; 

    dispatch({type : ActionTypeEnum.Update , data})
    setShowMessage({type: MessageBarType.success ,message: "Task Updated"});

    }
    else {
    setShowMessage({type: MessageBarType.error, message : "Error while updating the task"});
};
}
const onFormSubmit = (event: React.FormEvent) => {
  event.preventDefault();

  editTaskid? updateTaskAction() : addTaskAction();


};

    return (
        <><form onSubmit={onFormSubmit}>
            <TextField label="Task" required  {...title}/>
           <Stack horizontal tokens={{childrenGap:20}}style={{marginTop: 20}}>
                <Stack style={{width: "80%"}}>
                    {showMessage.message&&( <MessageBar messageBarType={MessageBarType.success}>
                    {showMessage.message}
                </MessageBar>)}
            
                </Stack>

                <Stack style={{width: "20%"}}>
                    <PrimaryButton type = "submit" text={editTaskid? todoAppString.updateTaskBtn : todoAppString.addTaskBtn }/>
                </Stack>
            </Stack>
        </form>
    
</>
    );
};                       
    export default TaskForm;

                    

