import User from "../modals/User.js";
import bcrypt from "bcryptjs";
// a [ User ] is a COVER for this file 
// means its an Object and has access to all the properties and method in file.
/**
 * In User.js, you are directly exporting the result of mongoose.model("User", userSchema); using export default. 
 * This means that when you import User in another file (app.js in this case), 
 * you are importing the model itself, not just the schema (userSchema).
 */
export const getAllUsers = async (req, res, next) => {
    let users
    try {
        users = await User.find()
    } catch (err) {
        console.log(err)
    }
    if(!users || users.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No User data in the database"
        })
    }
    return res.status(200).json({
        success: true,
        message: "The list of all users is provided.",
        usersList: users
    })
}

export const signUp = async (req, res, next) => {
    const { name, email, password } = req.body
    // If email exist 404 uest
    let existingUser
    try{
        existingUser = await User.findOne({email})
    } catch (err){
        return console.log(err);
    }
    if(existingUser) {
        return res.status(400).json({
            success: false,
            message: "User already exist with this email ID. Go for Login"
        })
    }
    // If user EMail not exist Create one User
    const hashedPassword = bcrypt.hashSync(password)
    // || the above code will encrypt the password and this password is stored in DB
    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs:[],
    })
    try{
        await user.save()
    } catch (err){
        return console.log(err);
    }
    return res.status(201).json({
        success:true,
        message:"User Created",
        user: user
    })
}

export const login = async (req, res, next) => {
    const { email, password } = req.body
    let existingUser
    try{
        existingUser = await User.findOne({email})
    } catch (err){
        return console.log(err);
    }
    if(!existingUser) {
        return res.status(400).json({
            success: false,
            message: "Could not find the User with this email ID"
        })
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
    if(!isPasswordCorrect){
        return res.status(400).json({
            success:false,
            message:"Incorrect Password"
        })
    }
    return res.status(200).json({
        success:true,
        message:"Login successfull"
    })

}