const express  = require("express")
const { appointmentsModel } = require("../model/doctor.model")
const appoinmentRouter = express.Router()
const {auth} = require("../middleware/auth.middleware")

// appoinmentRouter.use(auth)

// Add adata
appoinmentRouter.post("/",async(req,res)=>{
    const {name,imageURL,specialization,experience,location,date,slots,fee} = req.body
    try {
        const appointmentPost = await appointmentsModel.create({name,imageURL,specialization,experience,location,date,slots,fee,creatorName:req.name,creatorId:req.userId})
        res.status(200).send({
            post:"Post added",
            newPost :appointmentPost
    })
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})

// Filter by Specialization 
appoinmentRouter.get("/filter",async(req,res)=>{
    const {specialization} = req.body
    try {
        const appp = await appointmentsModel.find({specialization})
        res.status(200).send({
            filter :appp
    })
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})
// Sort by date
appoinmentRouter.get("/sort",async(req,res)=>{
    // const {specialization} = req.body
    try {
        const appp = await appointmentsModel.find.sort().date({date:"asc"})
        res.status(200).send({
            sort :appp
    })
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})
// search by doctor
appoinmentRouter.get("/search",async(req,res)=>{
    const {docname} = req.query
    // console.log(req.query)
    try {
        const appp = await appointmentsModel.find({
            name : {$regex:new RegExp(docname,"i")}
        })
        res.status(200).send({
            search :appp
    })
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})

// delete
appoinmentRouter.delete("/:id",async(req,res)=>{
    const {id} = req.params
    try {
        const deletedapp = await appointmentsModel.findByIdAndDelete(id)
        res.status(200).send({msg:"Data has been deleted",deletedapp})
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})
// edit
appoinmentRouter.patch("/:id",async(req,res)=>{

    try {
        const updatedappp = await appointmentsModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).send({msg:"Data has been updated",updatedappp})
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})


module.exports={
    appoinmentRouter
}