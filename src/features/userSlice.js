import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: { employees: [], role:['Admin', 'Employee'] },
  reducers: {
    addUser: (state, action) => {
      state.employees.push(
        {
          // serialNo: state.employees[state.employees.length-1].serialNo +1,
          id:Date.now(),
          fullName:action.payload.fullName,
          email:action.payload.email,
          role:action.payload.role
        }
        );
    },

    deleteUser: (state, action) => {
      state.employees = state.employees.filter((user) => user.id !== action.payload.id);
    },

    updateEmployeeStart: (state, action) => {
      state.employees.filter((user) => {
        return user.id === action.payload.id ? user.editStatus = true :  user.editStatus = false;
      });
    },
    updateEmployee: (state, action) => {

      const employee = state.employees.find((employee) => employee.id === action.payload.id)
      if(employee) {
        employee.fullName = action.payload.fullName;
        employee.email = action.payload.email;
        employee.role = action.payload.role;
        employee.editStatus = false;
      }
          // state.employees.push(action.payload)
    },
    cancelUpdate: (state, action) => {
      
      state.employees.filter((employee) => {
          if(employee.id === action.payload.id){
            return employee.editStatus = false
          }
          return 0;
      });
       
  
    },

  },
});

export const { 
  addUser,
  deleteUser,
  updateEmployeeStart,
  updateEmployee,
  cancelUpdate

  } 
  = userSlice.actions;
export default userSlice.reducer;