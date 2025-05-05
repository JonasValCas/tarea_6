const User=require('../models/userModel')
class UserService{
    constructor(){}
    async getAll(){
        const users=await User.find({})
        return users
    }

    async filterById(id){
        const user=await User.find({_id:id})
        return user
    }
    async create(data){
        const user=new User(data)
        return await user.save()
    }

    async updateUser(id, data) {
        return await User.findByIdAndUpdate(id, data, { new: true });
    }
    
    async deleteUser(id) {
        return await User.findByIdAndDelete(id);
    }
}
module.exports=UserService