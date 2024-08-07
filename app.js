var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors")

var app = express();
var port = 4000;

var constr = "mongodb://127.0.0.1:27017"

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());

// This is Home route 
app.get("/", (req, res)=>{
    res.send("<h1>Welcome to Node JS</h1>")
})

//this is admin rote
app.get("/admin", (req, res)=>{
    mongoClient.connect(constr).then((clientObject)=>{
        var database = clientObject.db("reactdb");
        database.collection("tbladmin").find({}).toArray().then(doc=>{
            res.send(doc)
        })
    })
})
app.get("/users", (req, res)=>{
    mongoClient.connect(constr).then((clientObject)=>{
        var database = clientObject.db("reactdb");
        database.collection("tbluser").find({}).toArray().then(doc=>{
            res.send(doc)
        })
    })
})
app.get("/categories", (req, res)=>{
    mongoClient.connect(constr).then((clientObject)=>{
        var database = clientObject.db("reactdb");
        database.collection("tblcategories").find({}).toArray().then(doc=>{
            res.send(doc)
        })
    })
})
app.get("/category/:id", (req, res)=>{
    var id = parseInt(req.params.id)
    mongoClient.connect(constr).then((clientObject)=>{
        var database = clientObject.db("reactdb");
        database.collection("tblcategories").find({Category_Id:id}).toArray().then(doc=>{
            res.send(doc)
            console.log(dec)
        })
    })
})
app.get("/videos", (req, res)=>{
    mongoClient.connect(constr).then((clientObject)=>{
        var database = clientObject.db("reactdb");
        database.collection("tblvideos").find({}).toArray().then(doc=>{
            res.send(doc)
        })
    })
})
app.get("/videos/:id", (req, res)=>{
    var id = parseInt(req.params.id)
    mongoClient.connect(constr).then((clientObject)=>{
        var database = clientObject.db("reactdb");
        database.collection("tblvideos").find({VideoId:id}).toArray().then(doc=>{
            res.send(doc)
            console.log(doc)
        })
    })
})

app.post("/adduser", (req, res)=>{
    var user = {
        UserId : req.body.UserId,
        UserName:req.body.UserName,
        Password:req.body.Password,
        Email:req.body.Email,
        Mobile:req.body.Mobile
    }

    mongoClient.connect(constr).then((clientObject)=>{
        var database = clientObject.db("reactdb")
        database.collection("tbluser").insertOne(user).then(()=>{
            console.log("User details Inserted")
            res.end();
        })
    })
})
app.post("/addcategory", (req, res)=>{
    var category = {
        Category_Id:parseInt(req.body.Category_Id),
        CategoryName: req.body.CategoryName
    }

    mongoClient.connect(constr).then((clientObject)=>{
        var database = clientObject.db("reactdb")
        database.collection("tblcategories").insertOne(category).then(()=>{
            console.log("Category Inserted")
            res.redirect("/category")
            res.end();
        })
    })
})
app.post("/addvideo", (req, res)=>{
    var video = {
        VideoId:parseInt(req.body.VideoId),
        Title: req.body.Title,
        Url : req.body.Url,
        Comments:req.body.Comments,
        Likes:parseInt(req.body.Likes),
        Category_Id : parseInt(req.body.Category_Id)
    }

    mongoClient.connect(constr).then((clientObject)=>{
        var database = clientObject.db("reactdb")
        database.collection("tblvideos").insertOne(video).then(()=>{
            console.log("Video Inserted")
            res.end();
        })
    })
})

app.put("/editvideo/:id", (req, res)=>{
    var id = parseInt(req.params.id)

    mongoClient.connect(constr).then((clientObject)=>{
        var database = clientObject.db("reactdb")
        database.collection("tblvideos").updateOne({VideoId:id},{$set:{
            VideoId:parseInt(req.body.VideoId),
            Title: req.body.Title,
            Url : req.body.Url,
            Comments:req.body.Comments,
            Likes:parseInt(req.body.Likes),
            Category_Id : parseInt(req.body.Category_Id)
        }}).then(()=>{
            console.log("Video Updated")
        })
    })
})

app.delete("/deletevideo/:id", (req, res)=>{
    var id = parseInt(req.params.id);
    mongoClient.connect(constr).then(clientObject=>{
        var database = clientObject.db("reactdb");
        database.collection("tblvideos").deleteOne({VideoId:id}).then(()=>{
            console.log("Video Deleted Successfully")
            
        })
    })
})


app.listen(port, ()=>{
    console.log(`
        http://localhost:${port} Created
    `)
})