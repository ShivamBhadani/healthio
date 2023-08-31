const express = require('express');
const mongoose = require('mongoose');
const {Gym,Cx,Attendance,Passwd,FeesSubmitted,Otp} = require('./db');
const { getSystemErrorMap } = require('util');

const app = express();

mongoose.connect('mongodb+srv://sbhad:aaaaa111@cluster0.reeu8cc.mongodb.net/healthio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'healthio'
});

app.use(express.json());

app.get('/',(__request,response)=>{
    return response.json({message:'Hello World'});
});

app.post('/gyms',async(request,response)=>{
    const gym=new Gym(request.body);
    try{
        await Gym.create(gym);
        return response.json(gym);
    }catch(error){
        return response.json({error:error.message});
    }
}
);

app.post('/cx',async(request,response)=>{
    const cx=new Cx(request.body);
    const passwd=request.headers.passwd;
    try{
        await Cx.create(cx);
        const cx_id=cx._id;
        await Passwd.create({cx_id,password:passwd});
        await Attendance.create({cx_id:cx_id,gym_id:cx.gym_id});
        await FeesSubmitted.create({cx_id:cx_id,gym_id:cx.gym_id});
        return response.json(cx);
    }catch(error){
        return response.json({error:error.message});
    }
}
);

// app.post('/attendance',async(request,response)=>{
//     const attendance=new Attendance(request.body);
//     try{
//         await Attendance.create(attendance);
//         return response.json(attendance);
//     }catch(error){
//         return response.json({error:error.message});
//     }
// }
// );

app.put('/feessubmitted/:id',async(request,response)=>{
   const id=request.params.id;
    const feesSubmitted=await FeesSubmitted.findById(id);
    if(feesSubmitted){
        feesSubmitted.last_fees_submit_details=request.body.last_fees_submit_details;
        await feesSubmitted.save();
        return response.json({message:'Fees Submitted'});
    }
    else{
        return response.json({error:'FeesSubmitted not found'});
    }
}
);

app.put('/attendance/:id',async(request,response)=>{
    const id=request.params.id;
    const attendance=await Attendance.findById(id);
    if(attendance){
        attendance.present=attendance.present+1;
        await attendance.save();
        return response.json(attendance);
    }else{
        return response.json({error:'Attendance not found'});
    }
}
);

app.listen(3333,()=>{
    console.log('Server started on port 3333');
});



