const express=require("express");
const router=express.Router();
const Movie=require("../../db/schemas/movieSchema");

router.get("/:id",async(req,res)=>{
    try{
        const movieId=req.params.id;
        console.log("handling the get by id request");
        const movie=await Movie.findById(movieId);
        res.json(movie); 
    }catch(error){
        if(error.kind==="ObjectId")
        {
            res.status(484).json({message:'Movie not found'});
        }
        else{
            res.status(500).json({message:"Internal server error"});
         }
        }
});

router.post("/",async (req,res) => {
    try{
        const moviesData = req.body;
        const newMovie = new Movie(moviesData);
        await newMovie.save();
        res.json(
            {
                message : 'Movies Added successfully',
            }
        );
    } catch(error){
        console.log(error);
        res.statusMessage(500).json({
            message : "Internal server error",
        });
    }
});

router.put("/:id",async(req,res)=>
{
    try{
        const movieId=req.params.id;
        const updateMovieData=req.body;
        await Movie.findByIdAndUpdate(movieId,updateMovieData);
        res.json({
            message : "Movie Updated successfully",
        });
    } catch(error)
    {
        console.log(error);
        res.status(500).json
({
    message : "Internal server error",
});    }
});
router.delete("/:id",async(req,res)=>
    {
        try{
            const movieId=req.params.id;
            const deleteMovieData=req.body;
            await Movie.findByIdAndDelete(movieId,deleteMovieData);
            res.json({
                message : "Movie deleted successfully",
            });
        } catch(error)
        {
            console.log(error);
            res.status(500).json
    ({
        message : "Internal server error",
    });    }
    });
router.get("/",async(res,req)=>{
    const queryParams=req.query;
    const filters={};
    if(queryParams.name){
        filters.name={
            $regex:`${queryParams.name}`,
            $option: "i",
        };
    }
    if(queryParams.rating){
        filters.rating={
            $gte:parseFloat(queryParams.rating),
        };
    }
    const movies=await Movie.find(filters);
    res.json(movies);
});


module.exports=router;