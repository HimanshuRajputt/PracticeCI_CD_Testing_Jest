import express from "express";
import User from "../models/user.js";

const UserRoute = express.Router();

UserRoute.get("/users", async (req, res) => {
  try {
    const data = await User.find({});
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(400).send("Users Not Found length");
    }
  } catch (error) {
    res.status(400).send("Users Not Found");
  }
});

UserRoute.post("/add_user", async (req, res) => {
  try {
    // console.log("BODY:", req.body);
    const { name, age, city, email, status } = req.body;

    if (!name || !age || !city || !email) {
      res.status(400).send({ msg: "All fields are  required" });
      return;
    }

    const data = await User.findOne({ $or: [{ email }, { name }] });
    if (data) {
      res.status(400).send({ msg: "User already Exist" });
      return;
    }

    await User.create({ name, email, age, city, status });
    res.status(201).json({ msg: "User Created Succesfully" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Something went wrong on the server", Error: error });
  }
});


UserRoute.delete("/remove_user/:id", async (req,res)=>{
  try {
    const {id}= req.params
    const deletedData= await User.findOneAndDelete({_id:id})
    if(!deletedData){
      return res.status(400).json({msg:"User Not found"})
    }
    res.status(200).json({msg:"User Deleted Successfully", DeletedUser:deletedData})
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
})




export default UserRoute;
