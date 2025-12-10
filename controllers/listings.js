// imports =======================================================================================

const express = require('express')
const router = express.Router()
const Listing = require('../models/listing')

// GET ============================================================================================

router.get('/', async (req,res)=>{
    try{
        const populatedListings = await Listing.find().populate('owner')
        res.render('listings/index.ejs', {populatedListings})
    }
    catch(err){
        console.error('Ran into an error: '+err)
        console.log('REDIRECTING')
        res.redirect('/')
    }
})

router.get('/new', async (req,res)=>{
    res.render('listings/new.ejs')
})

router.get('/:id',async(req,res)=>{
    try {
        const listing = await Listing.findById(req.params.id)
        res.render('listings/show.ejs',{listing})
    } catch (err) {
        console.error('Ran into an error: '+err)
        console.log('REDIRECTING')
        res.redirect('/')
    }
})

router.get('/:id/edit', async (req,res)=>{
    try {
        const listing = await Listing.findById(req.params.id)
        res.render('listings/edit.ejs', {listing})
    } 
    catch (err) {
        console.error('Ran into an error: '+err)
        console.log('REDIRECTING')
        res.redirect('/')
    }
})

// POST ===========================================================================================

router.post('/', async (req,res)=>{
    try {
        req.body.owner = req.session.user._id
        const listing = await Listing.create(req.body)
        res.redirect('/listings')
    } 
    catch(err){
        console.error('Ran into an error: '+err)
        console.log('REDIRECTING')
        res.redirect('/')
  }  
})

// UPDATE (PUT) ==================================================================================

router.put('/:id', async (req,res)=>{
    try {
        const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.redirect(`/listings/${req.params.id}`)
    } 
    catch (err) {
        console.error('Ran into an error: '+err)
        console.log('REDIRECTING')
        res.redirect('/')
    }
})

// DELETE ========================================================================================

router.delete('/:id', async (req,res)=>{
    try {
        await Listing.findByIdAndDelete(req.params.id)
        res.redirect('/listings')
    } 
    catch (err) {
        console.error('Ran into an error: '+err)
        console.log('REDIRECTING')
        res.redirect('/')
    }
})

// exports =======================================================================================

module.exports = router