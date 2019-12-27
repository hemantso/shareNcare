const User = require('./../models/User.js');
const UserController = {};


UserController.create = function(req, res){
    var data =req.body;
    console.log(data.orgname);
      let flag = false;
    User.find({username:req.body.username},function(err,res){
      if(err){
          
        return res.status(500).send({
            status: false,
            message: "failed to store",
            error: error

        })
      }
      else{
        flag = true;

      }

    })
    User.find({email:req.body.email},function(err,res){
      if(err){
        return res.status(500).send({
            status: false,
            message: "failed to store",
            error: error

        })
      }
      else{
        flag = true;
        

      }

    })

      if(!flag){
        if(req.body.org="yes"){
        User.create({
            
            org: data.org,
            orgname: data.orgname,
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            mobile: data.mobile,
            state: data.state,
            city: data.city,
            email: data.email,
            birth: data.birth,
            gender: data.gender,
            password: data.password,
            confirmpassword: data.confirmpassword,
           

            
        },function(error, response){
            console.log("storing data ", response);
            if(error){
                res.render('signup.hbs', { 
                    alert: "Invalid Credentials", 
                    title: 'shareNcare - Signup',
                    style: 'signup.css',
                    user: req.session.loggedIn
                })
            }else {
                res.render('login',{
                    title: 'shareNcare - Login',
                    style: 'login.css',
                    user: req.session.loggedIn
            });
        }
        });

      } else{
        User.create({
            
            
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            mobile: data.mobile,
            state: data.state,
            city: data.city,
            email: data.email,
            birth: data.birth,
            gender: data.gender,
            password: data.password,
            confirmpassword: data.confirmpassword,
           

            
        },function(error, response){
            console.log("storing data ", response);
            if(error){
                res.render('signup.hbs', { 
                    alert: "Invalid Credentials", 
                    title: 'shareNcare - Signup',
                    style: 'signup.css',
                    user: req.session.loggedIn
                })
            }else {
                res.render('login',{
                    title: 'shareNcare - Login',
                    style: 'login.css',
                    user: req.session.loggedIn
            });
        }
        });

      }}
      else{
        res.redirect('/');
      }

}

module.exports = UserController;