
import express,{Request,Response}  from 'express';
import cors from 'cors'

const app = express();
app.use(cors({origin:"*"}))
app.use(express.json())

app.use('/api',require('./routes/index'))   


app.get('/',(req:Request,res:Response)=>{   
    res.status(200).json({
        status:true,
        message:"hello from Server"
    })
})

app.get('*',(req:Request,res:Response)=>{
    res.status(404).json({
        error:"page not found"
    })


})
app.listen(8001,()=>{console.log("server is running on port 8001")})
