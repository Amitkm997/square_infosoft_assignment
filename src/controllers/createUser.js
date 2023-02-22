
const userModel = require("../models/userModel");
const jwt=require("jsonwebtoken")

// -------- create User ---------------///

const isValid = function(value){
  if (typeof value ==='undefined' || value === null) return false
  if (typeof value === 'string' && value.trim().length === 0) return false
  return true
}

const createUser = async (req, res) => {
  try {
    let data = req.body;
    let { email, password, name, dob} = data;

    if (!isValid(email)) {
      return res.status(400).send({ msg: "email is required" });
    }
    //email unique
    const isEmailAlreadyUsed = await userModel.findOne({ email });
    if (isEmailAlreadyUsed) {
      return res.status(400).send({status: false,message:` ${email} address is already registered`,});
    }
   
    if (!isValid(password)) {
      return res.status(400).send({ msg: "password is required" });
    }

    if (!isValid(name)) {
      return res.status(400).send({ msg: "name is required" });
    }

    let validEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!validEmail.test(req.body.email)) {
      return res.status(400).send({ message: "invalid email address" });
    }
    let validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!validPassword.test(req.body.password)) {
      return res.status(400).send({ message: "invalid password" });
    }

    let validDob=/^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/;
    if(!validDob.test(req.body.dob)){
        return res.status(400).send({message:"invalid dob"})
    }
    
    await userModel.create(data);
    //token creation 
    let token =jwt.sign({email,name},"this is a secret key")
    res.status(201).send({ data: token, status: true });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};


// -------- get User ---------------///

const  getUser= async (req, res) => {
    try {
      let dataUser=await userModel.findOne()
      if(!dataUser.length==0) return res.status(404).send({message:"no data found"})
      return  res.status(201).send(dataUser)
      } catch (err) {
      res.status(500).send({ status: false, messege: err.message });
    }
  };

// -------- Get user by id---------------///

const getUserById=async (req, res) => {
    try {
      let userId=req.params.userId
      let dataUser=await userModel.findById({_id:userId})
      if(!dataUser.length==0) return res.status(404).send({message:"no data found"})
      return  res.status(201).send(dataUser)
      } catch (err) {
      res.status(500).send({ status: false, messege: err.message });
    }
  };


const  getAllUsers= async (req, res) => {
    try {
      let dataUser=await userModel.find()
      return  res.status(201).send(dataUser)
      } catch (err) {
      res.status(500).send({ status: false, messege: err.message });
    }
  };


 
    
const deleteUser = async (req, res) => {
    try {
      await userModel.findByIdAndDelete(req.params.userId);
      res.status(200).json("userModel has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
}

  module.exports={getUser,createUser,getUserById,getAllUsers,deleteUser}