import { createContext, useReducer } from "react";
import { ActionTypeEnum, IAddAction, IDeleteAction, IReducerAction, ITask, ITaskItemAction, IToggleFavoriteAction, IUpdateAction } from "./write";
import { ITodoContext } from "./write";
import { ITodoState } from "./write";
import { clone } from "./utility";



export const TodoContext = createContext<ITodoContext>({
    activeTasks:[],
    tasksItem: [],
    dispatch: ()=> {}});

type Props = {
    children: React.ReactNode
}


const addTaskAction = (state : ITodoState, action : IAddAction)=>{
    const {data}= action;
    data.id = new Date().toJSON();
    return [action.data, ...state.activeTasks]
}

const deleteTaskAction = (state : ITodoState, action : IDeleteAction)=>{
    const activeTasks: ITask[] = clone( state.activeTasks);
    const filteredData = activeTasks.filter(tasks => tasks.id!== action.data.id);
   return filteredData;
}

const toggleFavoriteAction = (state: ITodoState, action: IToggleFavoriteAction)=>{
    const cloneActiveTasks: ITask[] = clone(state.activeTasks);
    const index = cloneActiveTasks.findIndex(x => x.id === action.data.id);
    if(index >=0){
      cloneActiveTasks[index].isFav  = !cloneActiveTasks[index].isFav;
    }
    return state.activeTasks;
};

const updateTaskAction = (state: ITodoState , action : IUpdateAction)=>{
    const cloneActiveTasks: ITask[] = clone(state.activeTasks);
    const index = cloneActiveTasks.findIndex(x => x.id === action.data.id);
    if(index >=0){
      cloneActiveTasks[index]  = action.data;
    }
    return state.activeTasks;
};

const TaskItemAction = (state : ITodoState, action : ITaskItemAction)=>{
    const activeTasks: ITask[] = clone( state.activeTasks);
    const completedTaskData = activeTasks.find(task => task.id === action.data.id)
    const filteredData = activeTasks.filter(tasks => tasks.id!== action.data.id);

   const completedTask = completedTaskData?[completedTaskData, ...state.tasksItem] :
    {...state.tasksItem}
   return {
    activeTasks : filteredData,
    completedTask
   }
}



const reducer = (state: ITodoState , action : IReducerAction)=>{

    switch(action.type){
        case ActionTypeEnum.Add: 
        return{...state , activeTasks: addTaskAction(state, action)}

        case ActionTypeEnum.Delete: 
        return {...state, activeTasks: deleteTaskAction(state, action)}
        
        case ActionTypeEnum.ToggleFavorite:
        return {...state , activeTasks : toggleFavoriteAction(state, action)}
   
         case ActionTypeEnum.Update:
            return {...state , activeTasks : updateTaskAction(state, action)}
   
          case ActionTypeEnum.TaskItem : 
          const data = TaskItemAction(state, action)
          return {...state , activeTasks: data.activeTasks, tasksItem: data.completedTask}

    }


    return {...state};
};



const TodoProvider = (props:Props)=>{
    const tasks: ITask[]= [{

        id : "1",
        title: "Task 1",
        isFav : true
    
     },
     {
        id : "2",
        title: "Task 2",
        isFav: false
    
     },
     {
      id : "3",
      title: "Task 3",
      isFav: true
    
    },
    
    ];
  const data: ITodoState= {activeTasks:tasks , tasksItem:[]}
    const [state, dispatch] = useReducer(reducer, data);

    return (
        <TodoContext.Provider value={{activeTasks: state.activeTasks, tasksItem: state.tasksItem, dispatch}}>
            {props.children}
        </TodoContext.Provider>
    );
};

export default TodoProvider;