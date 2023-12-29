import { FontIcon, TeachingBubble } from "@fluentui/react";
import TaskListStyle from "./TaskList.style";
import { useId } from "react";
import { ITask } from "../write";
import { useBoolean } from "@fluentui/react-hooks";

type Props = {

    task : ITask
}


const TaskDescription = ({task}: Props) =>{
    
   const buttonId = useId("targetButton");
   const [teachingBubbleVisible, {toggle: toggleteachingBubbleVisible}]  = useBoolean(false);
  

    return (
        <>
              <FontIcon id = {buttonId} iconName="Info" className={TaskListStyle.iconStyle} onClick={teachingBubbleVisible}/> 

              {teachingBubbleVisible && 

              <TeachingBubble
          target={`#${buttonId}`}

          headline={task.title}
        >
        </TeachingBubble>
  }  </>
    );
};

export default TaskDescription;