const domain = require('../../../config/cqrs-conf/cqrs').domain;
const clientModel = require('../models/clients');
const uuid4 = require('uuid4');
const axios = require('axios')
//Fs reads a file to later write it to user
const fs = require('fs');



function commandHandler(data,command){
    domain.handle({
       id: uuid4(),
       command: command,
       aggregate: {
       name: 'clients'
       },
       payload: data
    }, err => {
       if(err){
          console.log(err)
       }
  }) ;
}


module.exports = {
   /*
*********COMANDS*********

*/
//Creates a new client with name and cc
 create: async(req, res, next) => {
     console.log("Create")
     data = {name: req.body.name, cc: req.body.cc }
     commandHandler(data,'createClient')
     return res.json({status:"success"})
 },

 //Updates a client CC and name via its cc
 update: async(req, res, next) => {
   
   clientModel.find({cc:req.body.cc}, (err,result) => 
   { 
      console.log("Update")
      data = {cc:req.body.cc,name:req.body.newName, id:result[0].id}
      commandHandler(data,'updateClient')
      return res.json({status:"success"})
   }) 
},

//Deletes a client via its cc
delete: async(req, res, next) => {
   clientModel.find({cc:req.body.cc}, (err,result) => 
   { 
      console.log("Delete")
      data = {cc:req.body.cc, id:result[0].id}
      commandHandler(data,'deleteClient')
      return res.json({status:"success"})
   }) 
 },

 getClientProducts: async(req, res, next) => {
   axios.post('http://10.25.244.135:4000/clients/findByClient', {
   cc: req.body.cc
   })
.then((res) => {
   console.log(res)
   return res.json(res)
})
 },


 /*

*********QUERIES*********

*/

 //Returns the clients found   
 findOne: async(req, res, next) => {
   clientModel.find({cc:req.body.cc}, (err,result) => 
   { 
      console.log("findOne")
      return res.json(result)
   }) 
},

 //Returns the clients found   
 findAll: async(req, res, next) => {
   clientModel.find((err,result) => 
   { 
      console.log("findAll")
      return res.json(result)
   }) 
  },

//If user logged previously : redirects to UserPage
//If user has not log in the system, loads registration page.
loadRegister: function(req, res, next) {
      fs.readFile('./app/views/create.html',function (err, data){
         res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
         res.write(data);
         res.end();
       })
    },

    loadDelete: function(req, res, next) {
      fs.readFile('./app/views/delete.html',function (err, data){
         res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
         res.write(data);
         res.end();
       })
    },

    loadUpdate: function(req, res, next) {
      fs.readFile('./app/views/update.html',function (err, data){
         res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
         res.write(data);
         res.end();
       })
    }
} 
