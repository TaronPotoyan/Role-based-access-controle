function validateEmail(req, res, next) {
    console.log('valid email' , req.body)
    const email = req.body.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    
    next();
}

function validatePassword(req, res, next) {
    const password = req.body.password;
    
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!password || !passwordRegex.test(password)) {
        return res.status(400).json({
            message: "Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character."
        });
    }

    next();
}

export default {
    validateEmail,
    validatePassword,
};

