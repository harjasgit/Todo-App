import { Checkbox, FontIcon, Stack, mergeStyleSets } from "@fluentui/react";
import { ITask } from "../write";
import TaskListStyle from "./TaskList.style";
import TaskDescription from "./TaskTitle";
import { useContext } from "react";
import { TodoContext } from "../todoProvider";




const TaskItemList = () =>{

    const {tasksItem} = useContext(TodoContext);


    const onRenderCell = (task : ITask)=>{
    
        return (
        
        <Stack horizontal key = {task.id} className={TaskListStyle.taskItem}>
            <Stack horizontal style={{width:"85%"}}>
           <Checkbox /> 
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
             /> 
            <FontIcon iconName="Delete" className={TaskListStyle.iconStyle} ></FontIcon>
            </Stack>
            </Stack>
   );
    };

    return (

        <div>
   {tasksItem.map(onRenderCell)}
        </div>
    );
};

export default TaskItemList;