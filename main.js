const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');

const app = express();

app
.use(bodyParser.json())
.post("/createFile",(request,response)=>{
    
    let dateTime = new Date()
    let dateString = dateTime.toString()
    let fileName = dateTime.getDate()+" "+dateTime.getMonth()+" "+dateTime.getFullYear()+"-"+dateTime.getHours()+" "+dateTime.getMinutes()+" "+dateTime.getSeconds();
    fs.mkdir(request.body.folderName, 
  { recursive: true }, (err) => { 
    if (err) { 
        response.status(500).json({status:"failed creating folder",error:err})
       throw err; 
    } 
    fs.writeFile(__dirname+'/'+request.body.folderName+'/'+fileName+'.txt', dateTime.toString(), function (err) {
        if (err)  {response.status(500).json({status:"failed creating file",error:err});throw err;}
       else{ response.json({status:"success",message:"file with name "+dateString+" inside folder "+ request.body.folderName+" successfully created!"})}
      });
  }); 

 
    
})
.get("/files/:folder",(request,response)=>{

    fs.readdir(request.params.folder,(error,files)=>{
        response.json({status:"success",folderName:request.params.folder,files:files})
    })



})
app.listen(process.env.PORT || 5000)
