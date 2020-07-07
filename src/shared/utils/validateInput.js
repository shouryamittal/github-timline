function validateInput (email, password, cnfPassword) {
    if(email === '' || password.length < 8 || cnfPassword.length < 8) {
        return {status: false, loginError: true, loginErrorMsg: 'Please fill all the feilds.'};
    }
    if(password ==! cnfPassword) {
        return {status: false, loginError: true, loginErrorMsg: 'Passwords does not match, try again.'};
    }
    return {status: true, loginError: false, loginErrorMsg: ''};
}
export default  validateInput;