
 import {ADMIN_MODE,UPDATE_TASK } from "../constants/admin";


 const initialState = {};
 const adminReducer = function(state = initialState, action) {
   switch (action.type) {
     case ADMIN_MODE:
       return { action: ADMIN_MODE };
      case UPDATE_TASK:
       return { action: UPDATE_TASK,id:action.id,status:action.status,text:action.text };
     default:
       return null;
   }
   return state;
 };
 export default adminReducer;