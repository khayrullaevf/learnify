const express=require('express')
const fs=require('fs')

const router=express.Router()
const moviesController=require('../controllers/moviesController')


router.param('id',moviesController.checkID)





const movies=JSON.parse(fs.readFileSync('./data/data.json','utf-8'))




router.route('/')
.get(moviesController.getAllMovies)
.post(moviesController.addMovie)


router.route('/:id')
.get(moviesController.getMovieById)
.patch(moviesController.updateMovies)
.delete(moviesController.deleteMovies)

module.exports=router