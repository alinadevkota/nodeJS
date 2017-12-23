/**
 * Created by sazack on 8/11/17.
 */
'use strict';
//************************************************************************
// USE COLLECT LIBRARY in lib folder to collect DATA from the request body
//************************************************************************
let collect = require('../lib/collect');
let user=require('../models/user.model')

module.exports = {

    //*********************************************************************
    //SAMPLE FUNCTION TO COLLECT DATA AND STORE IN VARIABLE
    //*********************************************************************
    collectForUsers: (req, res, next) => {
        let collectInstance = new collect();
        collectInstance.setBody([
            'firstName',
            'middleName',
            'lastName',
            'city',
            'state',
            'country',
            'email',
            'username',
            'password',
            'passwordSalt',
            'phone',
            'deleted',
            'userRole'

        ])
        collectInstance.setFiles(['image'])

        collectInstance.setMandatoryFields({
            firstName: 'First Name not provided',
            // lastName: 'Last Name not provided',
            // email: 'Email not provided',
            // username: 'Username not provided',
            // password: 'Password not provided',
            // city: 'City not provided',
            // country: 'Country not provided',
            // phone: 'Phone not provided'

        })
        collectInstance.collect(req).then((data) => {
            req.userData = data
            next();
        }).catch((err) => {
            err.status = 400
            next(err)
        })
    },
    create: (req,res,next)=>{
        console.log(req.userData);
        let newUser=new user(req.userData)
        newUser.save((err,data)=>{
            //console.log(data);
            
            if(data){
                console.log(data);
                req.cdata={
                    success:1,
                    message: "user added successfully"
                }
                next()
            }
            else if(err){
                console.log(err);
            }
        })
    },
    get:(req,res,next)=>{
        user.find((err,data)=>{
            if(err) return next(new Error('error saving to database'))
            console.log(user);
            if(data){
                req.cdata = {
                    success:1,
                    message: 'user data retrieved',
                    data:data
                }
            next();

            }
        })
    },
    update:(req,res,next)=>{
        //console.log(req.body.firstName);
        if(req.body.id){
            console.log(req.body.firstName);
            user.findOneAndUpdate({_id:req.body.id},{firstName:req.body.firstName,lastName:req.body.lastName},{upsert:true},(err,data)=>{
                if(err){
                    return next(new Error('error occured while updating data'));
                    //console.log(err);
                }
                else if(data){
                    console.log(data);
                    req.cdata={
                        success:1,
                        message: 'user data updated successfully'
                        

                    }
                    next();
                }
            })
        }
    }

}