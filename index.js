const mongoose=require ('mongoose')
const cors=require('cors')
const express=require('express')
// const port= require('port')
//  port = process.env.PORT || 2001;
const app =express()
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb+srv://kapoorabhay189:user123412@test.jl2td26.mongodb.net//crud')
.then(()=>console.log('connect'))
.catch((err)=>console.log(err))
// mongodb+srv://kapoorabhay189:user123412@test.jl2td26.mongodb.net/
const UserSchema=mongoose.Schema({
    name:String,
    age:Number,
    course:String
})
const UserModel=mongoose.model('clients',UserSchema)
// {
//     const send =new UserModel({
//            name:'akash',
//           age:20,
//            course:'React JS'

//         })
//         send.save()
//         .then(()=>console.log('data inserted'))
//         .catch((err)=>console.log(err))
// }
app.get("/",(req,res)=>{
    UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err))

})
app.post('/add',(req,res)=>{
    UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err))
})
app.get('/get/:id',(req,res)=>{
    var id=req.params.id
    UserModel.findById({ _id : id })
    .then((user) => res.json(user))
    .catch((err) => res.json(err))
})
app.put('/edit/:id',(req,res)=>{
    var id = req.params.id
    UserModel.findByIdAndUpdate({ _id: id },{
        name:req.body.name,age:req.body.age,course:req.body.course
    })
    .then(data => res.json(data))
    .catch(err => res.json(err))
})
app.delete('/delete/:id',(req,res)=>{
    var id=req.params.id
    UserModel.findByIdAndDelete({_id:id})
    .then(data => res.json(data))
    .catch(err => res.json(err))
})

app.listen(2001)