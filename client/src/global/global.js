
export const isEmailValid=(email)=>{
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(email)) {
        return true;
    } 
    else
         {
        return false;
    }
}

