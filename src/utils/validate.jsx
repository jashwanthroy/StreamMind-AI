export const checkValidData = (email,pswd) =>{
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPswdValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(pswd);

    if(!isEmailValid){
        return "Enter Valid Email Id";
    }
    if(!isPswdValid){
        return "Use Alphanumeric (Min. 8 characters)";
    }
    return null
}