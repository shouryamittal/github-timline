function responseLogger (resposeCode){
    let message = '';
    switch(responseCode) {
        case 200: message = "Response OK";
        case 201: message = "User Logged in Successfully";
        case 404: message = "Page not Found";
        case 500: message = "Some Error Occurred. Please try later."
    }
}
export default  responseLogger;