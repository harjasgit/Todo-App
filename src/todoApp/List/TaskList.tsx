import { Checkbox, FontIcon, Stack, mergeStyleSets } from "@fluentui/react";
import TaskListStyle from "./TaskList.style";
import { useContext } from "react";
import { ActionTypeEnum, ITask } from "../write";
import { TodoContext } from "../todoProvider";
import todoAppString from '../String.json';
import TaskDescription from "./TaskTitle";


type Props = {
  setEditTask : (taskId : string)=> void
 }

const TaskList = ({setEditTask}: Props)=>{


    const {activeTasks, dispatch} = useContext(TodoContext)
    const onTaskDelete = (id : string) => {
     if(window.confirm(todoAppString.deleteConfirm)){

     dispatch({type: ActionTypeEnum.Delete, data :{id}});
    };
  }

   const onFavoriteClick = (id: string)=>{
    dispatch({type : ActionTypeEnum.ToggleFavorite, data : {id}});
   }

     
   const checkboxClickHandler = (id: string)=>{
     dispatch({type: ActionTypeEnum.TaskItem, data: {id}});
   };

    const onRenderCell = (task : ITask)=>{
        return (
        
        <Stack horizontal key = {task.id} className={TaskListStyle.taskItem}>
            <Stack horizontal style={{width:"85%"}}>
           <Checkbox  onChange={()=>{
            checkboxClickHandler(task.id)
           }}/> 
            {task.title}
          </Stack>

            <Stack  horizontal style={{width:"15%"}}>
             <TaskDescription task={task}/>
            <FontIcon iconName={task.isFav? "FavoriteStarFill" : "FavoriteStar"} 
            className={ 
              task.isFav 
              ? mergeStyleSets(TaskListStyle.iconStyle, {color: "blue"})
              :TaskListStyle.iconStyle
              } 
              onClick={()=> onFavoriteClick(task.id)}/> 
            <FontIcon iconName="EditNote" className={TaskListStyle.iconStyle}
            onClick={() =>{
              setEditTask(task.id)
            }}
            /> 
            <FontIcon iconName="Delete" className={TaskListStyle.iconStyle} onClick={()=>onTaskDelete(task.id)}/> 
            </Stack>
            </Stack>
   );
    };

   return (
   <div> 
    {activeTasks.map(onRenderCell)}</div>
   );
};

export default TaskList;