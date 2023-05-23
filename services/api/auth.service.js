const { userHelper } = require("../../helper");
const User = require("../../models/User");
const bycrypt = require("bcryptjs");

const signIn = async (username, password) => {
    try {
        const user = await User.findOne({username:username});

        const isPasswordMatch =  bycrypt.compare(password, user.password);
        const token = userHelper.generateToken(user._id);

        if(user){
            if(isPasswordMatch)
            {
                return {
                    id:user.id,
                    name:user.name,
                    username:user.username,
                    token:token
                }
            }
        }
        else{
            throw new Error('Invalid email or password')
        }            
    } catch (error) {
        throw new Error(error)
    }
} 

module.exports = {
    signIn
}