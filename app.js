if(process.env.NODE_ENV!="production")
{
require('dotenv').config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');
const path=require("path")  
const ejsMate = require('ejs-mate');
const ExpressError=require('./utils/ExpressError.js')
const listingRouter=require("./routes/listing.js")
const reviewsRouter=require("./routes/review.js")
const userRouter=require("./routes/user.js")
const session=require("express-session")
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport=require("passport")
const User=require("./models/user.js")
const LocalStrategy=require("passport-local")

const dburl=process.env.ATLASDB_URL

const store=MongoStore.create({
  mongoUrl:dburl,
  crypto: {
    secret: process.env.SECRET
  },
  touchAfter:24*3600
})

store.on("error",()=>{
  console.log("Error in mongo Session",err)
})

const sessionOptions={
  store,
  secret:process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,//after one week from now
    maxAge:7*24*60*60*1000 ,
    httpOnly:true
}
}



app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(express.json()); // <-- needed for raw JSON
app.use(methodOverride('_method'));// for using patch in html
app.engine('ejs', ejsMate);

app.use(session(sessionOptions))
app.use(flash()); 

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



main()
  .then(() => {
    console.log("Connection Successful");  // Logs success if the connection works
  })
  .catch((err) => {
    console.log("Connection Error:", err);  // Logs any connection error
  });
    async function main() {
    await mongoose.connect(dburl);  // Connects to the "test" database
  
  }

app.get('/', (req, res) => {
    console.log("Working");
    res.send("Server is running");
});


app.use((req,res,next)=>{
  res.locals.msg=req.flash("success")
  res.locals.err=req.flash("error")
  res.locals.currUser=req.user; //becuase we cannot directly use user object in ejs // This gives the info of user in a current session
  next();
})


app.get("/demouser",async(req,res)=>{
  let fakeuser=new User({
    email:"student1@gmail.com",
    username:"Student1"
  })

  let userRegistered=await User.register(fakeuser,"helloworld")
  res.send(userRegistered)
})

app.use("/listings",listingRouter)
app.use("/listings/:id/reviews",reviewsRouter)
app.use("/",userRouter)




// Error is comming bye this(idk whyyyyyyyyy)
app.all('/{*any}', (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!!"));
});

// 4. Error-handling middleware
app.use((err, req, res, next) => {
const { status = 500, message = "Something went wrong" } = err;
 res.status(status).render("error.ejs",{err})
});

app.listen(8081, () => {
    console.log("Listening");
});