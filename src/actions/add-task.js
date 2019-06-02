import {ADD_TASK} from "../constants/add-task";

export function AddTask(task) {
    return { type: ADD_TASK, task:task};
}