import { Pivot, PivotItem, Stack } from "@fluentui/react";
import HomeStyle from "./Home.style";
import { PivotKeysEnum } from "./write";
import todoAppString  from  "./String.json";
import TaskList from "./List/TaskList";
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import TodoProvider from "./todoProvider";
import TaskForm from "./TaskForm/TaskForm";
import { useState } from "react";
import TaskItemList from "./List/TaskItemList";
initializeIcons();
 
const Home = ()=>{

 const [editTaskid, setEditTaskId] = useState<string | null>(null);

 const editTask = (id: string)=>{
  setEditTaskId(id)
 }

  return  <Stack className={HomeStyle.todoContainer}>
    <TodoProvider>
    
    <header>
      <h2 className={HomeStyle.headerStyle}>{todoAppString.header}</h2>
    </header>
   <Stack className={HomeStyle.pivotContainer}>
    <Pivot 
    styles={{root: HomeStyle.pivotStyle}}>
        <PivotItem headerText={todoAppString.pivots.tasksTab} 
        itemKey={PivotKeysEnum.TaskList} >

          <TaskList setEditTask = {editTask}/>
          </PivotItem>
        <PivotItem headerText={todoAppString.pivots.tasksFormTab} 
        itemKey={PivotKeysEnum.TaskForm} >
          <TaskForm editTaskid = {editTaskid}/>
          </PivotItem>
        <PivotItem headerText={todoAppString.pivots.TasksItemTab} itemKey={PivotKeysEnum.TaskItem}
        >
       <TaskItemList/>

        </PivotItem>

      </Pivot>

 
</Stack>
</TodoProvider>
 </Stack>;
   
};

export default Home;