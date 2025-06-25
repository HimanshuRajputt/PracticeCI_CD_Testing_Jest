import supertest from "supertest";
import dotenv from "dotenv"
import mongoose  from "mongoose";
import app from "../config";
import User from "../models/user";

dotenv.config()

const request = supertest(app);

// console.log("mongo",process.env.MONGO_URI)
beforeAll(async ()=>{
  await mongoose.connect(process.env.MONGO_URI)
})

// afterEach(async () => {
//   await User.deleteMany({ email: "john@example.com" }); // Adjust if needed
// });


afterAll( async ()=>{
  await User.deleteMany({ email: "john@example.com" }); // Adjust if needed
  await mongoose.disconnect();
})

describe("User API", () => {

  let userID;
  
  it("should return all users (empty or not)", async () => {
    const res = await request.get("/API/users");
    expect(res.statusCode).toBe(200)
  });

  it("should fail when required fields are missing", async () => {
    const res = await request.post("/API/add_user").send({
      name: "Test",
      // email: "test@example.com",
      // missing fields
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe("All fields are  required");
  });

  it("should create a user successfully", async () => {
    const res = await request.post("/API/add_user").send({
      name: "John",
      age: 25,
      city: "Delhi",
      email: "john@example.com",
      status: "active",
    });

    const user= await User.findOne({name:"John"})
   
    userID = user._id.toString();
    expect(res.statusCode).toBe(201);
    expect(res.body.msg).toBe("User Created Succesfully");
  });

  it("should delete a user successfully",async ()=>{
    const res = await request.delete(`/API/remove_user/${userID}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("User Deleted Successfullys");
  })




});
