import { Dispatch } from "react";

export enum PivotKeysEnum {
    TaskList = " TaskList",
    TaskForm = "TaskForm",
    TaskItem = "TaskItem"
}

export interface ITask {
    id : string;
  title : string;
  isFav : boolean
}

export interface ITodoContext {
  activeTasks: ITask[];
  dispatch : Dispatch<any> 
  tasksItem :  ITask[];
}

export interface ITodoState {
  activeTasks : ITask[];
  tasksItem :  ITask[];
 }

 export enum ActionTypeEnum {
  Add,
  Delete,
  ToggleFavorite,
  Update,
  TaskItem
 }
 export type IReducerAction = IAddAction | IDeleteAction | IToggleFavoriteAction | IUpdateAction | ITaskItemAction

 export interface IAddAction {
  type : ActionTypeEnum.Add,
  data: ITask
 }

 export interface IDeleteAction{
  type : ActionTypeEnum.Delete,
  data : {id: string}
 }

 export interface IToggleFavoriteAction{
   type: ActionTypeEnum.ToggleFavorite,
   data: {id: string}
 }

 export interface IUpdateAction{
  type : ActionTypeEnum.Update,
  data : ITask
 }

 export interface ITaskItemAction {
  type : ActionTypeEnum.TaskItem,
  data : {id: string}
 }