const express=require('express')
const fs=require('fs')



const movies=JSON.parse(fs.readFileSync('./data/data.json','utf-8'))



exports.validateBody=(req,res,next)=>{
    if (!req.body.name) {
        res.status(400).send({
            status:'fail',
            message:'not a valid movie data'
        })
    }

}

exports.checkID=(req,res,next,value)=>{
    let movie=movies.find((el)=>el.id==value)
 
    
    console.log(movie);
    
    if (!movie) {
       return res.status(404).json({
            status:"not found",
            message:"movie with this id not found"
        })
    }
    next()
}
exports.getAllMovies=(req,res)=>{
    res.json(movies)
}
exports.addMovie=(req,res)=>{
    console.log(req.body);

   const newId=movies[movies.length-1].id+1

   const newMovie=Object.assign({id:newId},req.body)
   console.log(newMovie);

    movies.push(newMovie)
   
    fs.writeFile('./data/data.json', JSON.stringify(movies),(err)=>{
        res.status(201).json({
            newMovie:newMovie
        })
    })
   
   
    
}
exports.getMovieById=(req,res)=>{
    console.log(req.params);
    const id=req.params.id*1
    console.log(id);
    let movie=movies.find((el)=>el.id===id)
    res.status(200).json({
            status:"success",
            movie,
        })
    
    
    
    
}
exports.updateMovies=(req,res)=>{
   
    const id=req.params.id*1

    let movie=movies.find((el)=>el.id===id)
    console.log(movie);

   const index=movies.indexOf(movie)

   Object.assign(movie,req.body)
   movies[index]=movie

   fs.writeFile('./data/data.json',JSON.stringify(movies),(err)=>{
    
    res.status(200).send({
        status:'succcess',
        movie
    })


   })

    
    
    
    
}

exports.deleteMovies=(req,res)=>{
   console.log(req.params.id);
   
    const id=req.params.id*1

    let movie=movies.find((el)=>el.id===id)
    const index=movies.indexOf(movie)
    movies.splice(index,1)

    fs.writeFile('./data/data.json',JSON.stringify(movies),(err)=>{
        res.status(204).send({
              status:'success',
              movie:null
            })
    })








  

    
    
    
    
}