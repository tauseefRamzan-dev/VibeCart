import { message } from 'antd';
import axios from 'axios';
import { createContext, useContext, useEffect, useReducer, useState } from 'react'

const AuthContext=createContext();
const initialState={isAuth: false, user:{}}
const reducer = (state,action) => {
    const {type,payload}=action;
    const {user}=payload;
switch (type) {
    case "SET_LOGIN":
        return {isAuth:true,user}
        break;
    case "SET_LOGOUT":
        return {isAuth:false,user:{}}
        break;
    default:
        return state;
}

  
}
const Auth =({children}) =>{
   const [state,dispatch]=useReducer(reducer,initialState);
   const [isLoading,setIsLoading]=useState(true)

    const readProfile = async (token) => {

        if (!token) { setIsLoading(false); return; }
        axios.get(`${import.meta.env.VITE_apiURL}/auth/user`, { headers: { Authorization: `Bearer ${token}` } })
            .then(({ status, data }) => {
                if (status === 200) {
                    const { user } = data
                    // console.log('user', user)
                    dispatch({ type: "SET_LOGIN", payload: { user } })
                }
            })
            .catch(error => {
                console.error("error", error.response)
                if (error.response.data.message === "Invalid or expired token.")
                    localStorage.removeItem("token")
            })
            .finally(() => { setIsLoading(false) })
    }

useEffect(()=>{
  const token =localStorage.getItem("token")
readProfile(token);
},[])

   const handleLogout = async () => {
        try {
            localStorage.removeItem("token")
            dispatch({ type: "SET_LOGOUT", payload: {} })
            message.success("Logout successful")
        } catch (error) {
            console.error(error)
            message.error("Something went wrong while logging out user.")
        }
    }
return (
    <AuthContext.Provider value={{...state,dispatch, isLoading,readProfile,handleLogout}}>
        {children}
    </AuthContext.Provider>
  );
}
export const useAuth=()=> useContext(AuthContext);
export default Auth