// regex from http://emailregex.com/
const validateEmail = (email) => {
    if (
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email,
        )
    ) {
        return true;
    }
    // invalid email
    return false;
};

export default validateEmail;
