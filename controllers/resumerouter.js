const express=require("express")
const resumeModel=require("../models/resumemodel")
const bcrypt=require("bcryptjs")

const router=express.Router()

hashPasswordgenerator=async(pass)=>{
    const salt=await bcrypt.genSalt(10)
    return bcrypt.hash(pass,salt)
}

     router.post("/register",async(req,res)=>{
         let {data}={"data":req.body}
         let password=data.password  

    const hashedPassword=await hashPasswordgenerator(password)
    data.password=hashedPassword
    let user = new resumeModel(data)
    let result=await user.save()
                 res.json({
                     status:"success"})
                    })             

    router.post("/login",async(req,res)=>{
        let input= req.body
        let email=req.body.email
        let data=await signupModel.findOne({"email":email})
        if(!data)
        {
            return res.json({
                    status:"invalid email"
                })
        }

        console.log(data)
        let dbPassword=data.password
        let inputPassword=req.body.password
        console.log(dbPassword)
        console.log(inputPassword)

        const match =await bcrypt.compare(inputPassword,dbPassword)
        if(!match)
        {
            return res.json({
                    status:"invalid password"})
        }

        res.json({
            status:"success"
        })
    })
module.exports=router    