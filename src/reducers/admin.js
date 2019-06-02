
 import {ADMIN_MODE } from "../constants/admin";


 const initialState = {};
 const adminReducer = function(state = initialState, action) {
   switch (action.type) {
     case ADMIN_MODE:
       return { action: ADMIN_MODE };
     default:
       return null;
   }
   return state;
 };
 export default adminReducer;