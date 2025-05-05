const UserService=require('../services/userService')
const userService=new UserService()

exports.getAllUsers=async(req,res)=>{
    const users = await userService.getAll()
    res.status(200).send(users)
}

exports.getUser=async(req,res)=>{
    const id=req.params.id
    const user=await userService.filterById(id)
    if(!user){
        return res.status(400).json({'Mensaje':"usuario no encontrado"})
    }
    
    res.status(200).send(user)
}

exports.createUser=async(req,res)=>{
    try{
    let data=req.body
        await userService.create(data)
        res.status(201).send('se registro correctamente')
    } catch(error){
        res.status(500).json({"error":error.message})
    }
}

exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedUser = await userService.updateUser(id, data);

        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await userService.deleteUser(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};