const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');
const path=require("path")  
const Listing = require("./models/listing.js");
const ejsMate = require('ejs-mate');
const wrapAsync=require('./utils/wrapAsync.js')
const ExpressError=require('./utils/ExpressError.js')


app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));// for using patch in html
app.engine('ejs', ejsMate);
main()
  .then(() => {
    console.log("Connection Successful");  // Logs success if the connection works
  })
  .catch((err) => {
    console.log("Connection Error:", err);  // Logs any connection error
  });
    async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');  // Connects to the "test" database
  
  }

app.get('/', (req, res) => {
    console.log("Working");
    res.send("Server is running");
});

// Index Route
app.get('/listings', wrapAsync(async(req,res)=>{
    const allListings= await Listing.find({})
    //console.log(allListings);
    res.render("listings/index",{allListings})
}))


//New Route
app.get("/listings/new",(req,res)=>{
  res.render("listings/neww")

})

//Show Route
app.get('/listings/:id',wrapAsync(async (req,res)=>{
  let {id}=req.params
  let listing = await Listing.findById(id);
  res.render('listings/show',{listing})
}))

//new route
app.post('/listings', wrapAsync(async (req,res,next)=>{
  let {title,description,price,location,country}=req.body
   const newListing=new Listing({
    title:title,
    description:description,
    price:price,
    location:location,
    country:country
   })
  await newListing.save()
  res.redirect("/listings")
}))

//Edit ROUTE
app.get('/listings/:id/edit',wrapAsync(async (req,res)=>{
  let {id}=req.params
  let listing = await Listing.findById(id);
  res.render("listings/editt",{listing})
}))

app.patch('/listings/:id',async (req,res)=>{
  let {id}=req.params
  let {title,description,price,location,country}=req.body
  await Listing.findByIdAndUpdate(
    id,
    { title, description, price, location, country },
    { new: true, runValidators: true }
  );
 res.redirect('/listings')
})

//Delete Route

app.delete('/listings/:id', wrapAsync(async (req, res) => {
  let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
}));

// app.all("*",(req,res,next)=>{
//   next(new ExpressError(400,"Page Not Found!!"))
// })


// app.use((err,req,res,next)=>{
//   let {statusCode=500,message="error"}=err
//   res.status(statusCode).send(message)
//   // res.send("error")
 
// })

// 3. Catch-all route for undefined paths (404)
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!!"));
});

// 4. Error-handling middleware
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});


app.listen(8081, () => {
    console.log("Listening");
});