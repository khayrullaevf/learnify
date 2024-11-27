const express=require('express')
const fs=require('fs')

const router=express.Router()
const moviesController=require('../controllers/moviesController')


router.param('id',moviesController.checkID)






router.route('/')
.get(moviesController.getAllMovies)
.post(moviesController.validateBody,moviesController.addMovie)


router.route('/:id')
.get(moviesController.getMovieById)
.patch(moviesController.updateMovies)
.delete(moviesController.deleteMovies)

module.exports=router