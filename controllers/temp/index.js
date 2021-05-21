const router =  require("express").Router()



router.post("/api/users", function(req,res){
    console.log("POST route",req.body)
    res.json({"val": "check"})
})




module.exports = router;
