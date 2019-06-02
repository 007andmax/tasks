import {ADMIN_MODE,UPDATE_TASK} from "../constants/admin";

export function oninitAdminMode() {
    return { type: ADMIN_MODE};
}
export function updateTask(id,status,text) {
    return { type: UPDATE_TASK,id:id,status:status,text:text};
}