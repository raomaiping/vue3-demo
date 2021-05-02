const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();



//引入profiles.js
const profiles = require("./routes/api/profiles");

//DB confing
const db = require("./config/keys").mongoURI;


//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


mongoose.connect(db,{ useNewUrlParser: true,useUnifiedTopology: true })
.then( () => console.log('MongoDB Connected'))
.catch( err => console.log(err));

//避免使用findOneAndUpdate()更新数据库的时候出现警告信息
mongoose.set('useFindAndModify', false);

//使用routers
app.use("/api/profiles",profiles);

const port = process.env.PORT || 5000;

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
    
})