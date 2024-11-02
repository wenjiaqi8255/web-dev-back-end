//jshint esversion:6
import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
// import _ from "lodash";
import mongoose from "mongoose";
// import encrypt from "mongoose-encryption";

// import md5 from 'md5';

// import bcrypt, { hash } from "bcrypt";
// const saltRounds=10;

import passport from 'passport';
import passportlocalmongoose from 'passport-local-mongoose';
import session from 'express-session';

// import GoogleStrategy from 'passport-google-oauth2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import findOrCreate from 'mongoose-find-or-create'

/////////////init and use session/////////////

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true})); //注意，这里需要加这句
app.use(session({
    secret:"ourlittlesecret.",
    resave:false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

/////////////link to database/////////////

main().catch(err => console.log(err));
// mongoose.set("useCreateIndex",true); 教程里有现在不用了好像

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/userDB');
//   await mongoose.connect('mongodb+srv://admin-wenjiaqi:Test123@cluster0.k7haycd.mongodb.net/?retryWrites=true&w=majority/userDB');

  console.log("success")
}

/////////////database setting/////////////

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        // required:[true,"Please check your input, should be a title"]
    },
    password:{
        type:String,
    //   required:[true,"Please check your input, should be some content"]
    },
    googleId:{
        type:String
    },
    secret:{
        type:String
    }
});


// userSchema.plugin(encrypt,{
//     secret:process.env.SECRET,
//     encryptedFields: ["password"]
// })
//在save()时会加密，在find()时会解密

userSchema.plugin(passportlocalmongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



passport.use(new GoogleStrategy({
    clientID:     process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    passReqToCallback   : true,
    proxy:true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      console.log(profile);
        return done(err, user);
    });
  }
));
/////////////routes/////////////



app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/auth/google',
  passport.authenticate('google', { 
    scope:["profile"] }
));

app.get( '/auth/google/secrets', //这里是谷歌认证后导向的route
    passport.authenticate( 'google', {
        successRedirect: '/secrets',
        failureRedirect: '/login'
}));

app.get('/secrets',(req,res)=>{
    User.find({"secret":{$ne:null}})
    .then((foundUser)=>{
        res.render('secrets',{
            userWithSecrets:foundUser
        })
    })
    .catch((err)=>{
        console.log(err);
    })
});

app.route('/login')
.get((req,res)=>{
    res.render('login')
})
.post((req,res)=>{
//     bcrypt.hash(req.body.password, saltRounds)
//     .then((hash)=>{
//     const inputUsername=User.findOne({email:req.body.username});
//     const inputPassword=User.findOne({password:hash});
//     Promise.all([inputUsername,inputPassword]) //注意这里，Promise.all接受的是一个array
//     .then((response)=>{
//         if(response!=null){
//             console.log("exact user");
//             res.render('secrets');
//         }else{
//             console.log("no found");
//         }
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
//     })
//     .catch((err)=>{
//         console.log(err)
// })

    //另一个更友好的写法，由chatGPT提供
    // bcrypt.hash(req.body.password, saltRounds)
    // .then((hash) => {
    //     // 使用 Promise.all 同时查询用户名和密码是否匹配
    //     Promise.all([
    //         //这里也不用预先定义（从示例里学的）
    //         User.findOne({ email: req.body.username }),
    //         User.findOne({ password: hash })
    //     ])
    //     .then(([inputUsername, inputPassword]) => {
    //         //一个我不知道的Promise写法，原来，返回的东西也是一个array
    //         if (inputUsername !== null && inputPassword !== null) {
    //             console.log("Exact user");
    //             res.render('secrets');
    //         } else {
    //             console.log("User not found");
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    // })
    // .catch((err) => {
    //     console.log(err);
    
    const user = new User({
        username:req.body.username,
        password:req.body.password
    });
    req.login(user, (err) => {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect('/secrets');
            });
        }
    });
    //这里不能用.then，因为这个函数不返回Promise
    //因此无法使用 .then() 链式地处理
    // req.login(user)
    // .then(()=>{
    //     passport.authenticate("local")
    //这里passport.authenticate() 也不返回一个 Promise，
    //所以不能使用 .then() 来处理它。
    //     .then(()=>{
    //         res.redirect('/secrets')
    //     })
    //     .catch((err)=>{
    //     console.log(err);
    //     })
    // })
    // .catch((err)=>{
    //         console.log(err);
    //     })

});

app.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
})

app.route('/register')
.get((req,res)=>{
    res.render('register')
})
.post((req,res)=>{
    // bcrypt.hash(req.body.password, saltRounds)
    // .then((hash)=>{
    // const newUser=new User({
    //         email:req.body.username,
    //         password:hash
    //     });
    // newUser.save()
    // .then(()=>{
    //     console.log("successfully register");
    //     res.render('secrets');
    // })
    // .catch((err)=>{
    //     console.log(err);
    // })
        
    // })
    // .catch((err)=>{
    //     console.log(err);
    // })
    // console.log(req.body);
    User.register({username:req.body.username},req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.redirect('/register');
        }else{
            passport.authenticate('local')(req,res, function(){
                res.redirect('/secrets')
            })
        }
    })
//     User.register({username:req.body.username},req.body.password)
//     .then(()=>{
//         passport.authenticate('local')((req,res, function(){
//             res.redirect('/secrets')
//         })
//     )
//     .catch((err)=>{
//         console.log(err);
//         res.redirect('/register');
//     })
// })
});

app.get('/submit',(req,res)=>{
    res.render('submit')
})
app.post('/submit',(req,res)=>{
    if(req.isAuthenticated){
        User.findById(req.user.id)
        .then((foundUser)=>{
            foundUser.secret=req.body.secret;
            foundUser.save()
            .then(()=>{
                res.redirect('/secrets')
            })
            .catch((err)=>{
                console.log(err);
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }else{
        res.redirect('/login')
    }
})

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));





app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  