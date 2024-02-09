const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")

const resumerouter=require("./controllers/resumerouter")
const app=express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://sidharth:Aether12@sidharth.mbsztl5.mongodb.net/resumeDb?retryWrites=true&w=majority",
{
    useNewUrlParser:true
})

app.use("/api/resume",resumerouter)

app.listen(2005,()=>{
    console.log("localhost running")
})