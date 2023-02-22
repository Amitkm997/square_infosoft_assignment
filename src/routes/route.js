
const express =require('express');
const router=express.Router();
const {createUser,getUser,getUserById,getAllUsers,deleteUser}=require("../controllers/createUser.js")
const {verifyToken,authorization}=require("../middleware/auth.js")

router.post('/createUser',createUser);
router.get('/getUser',verifyToken,getUser)
router.get('/getUserById/:userId',verifyToken,getUserById)
router.get('/getAllUsers',verifyToken,getAllUsers)
router.delete('/deleteUser/:userId',verifyToken,authorization,deleteUser)

module.exports=router

