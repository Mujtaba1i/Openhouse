// imports =======================================================================================
// PLEASEEEEE HELP MEEEEE!!!!!!!

const express = require('express')
const router = express.Router()
const Listing = require('../models/listing')

// GET ============================================================================================

router.get('/', async (req,res)=>{
    try{
        const populatedListings = await Listing.find().populate('owner')
        res.render('listings/index.ejs', {listings:populatedListings})
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
        const populatedListings = await Listing.findById(req.params.id).populate('owner')
        const userHasFavorited = populatedListings.favoritedByUsers.some((user)=>user.equals(req.session.user._id))
        res.render('listings/show.ejs',{listing:populatedListings,userHasFavorited})
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
        const listing = await Listing.findById(req.params.id)
        
        if (listing.owner.equals(req.session.user._id)) {
            await Listing.findByIdAndUpdate(req.params.id, req.body)
            res.redirect(`/listings/${req.params.id}`)
        }
        else{
            console.error('YOU DONT HAVE PERMISSION TO EDIT THIS LISTING')  
            res.redirect('/')  
        }
    } 
    catch (err) {
        console.error('Ran into an error: '+err)
        console.log('REDIRECTING')
        res.redirect('/')
    }
})

router.post('/:id/favorited-by/:userId', async (req,res)=>{
    try {
        await Listing.findByIdAndUpdate(req.params.id,{$push:{favoritedByUsers:req.params.userId}})
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
        const listing = await Listing.findById(req.params.id)

        if (listing.owner.equals(req.session.user._id)) {
            await Listing.deleteOne({_id: req.params.id})
            res.redirect('/listings')
        }
        else{
            console.error('YOU DONT HAVE PERMISSION TO DELETE THIS LISTING')  
            res.redirect('/')  
        }
    } 
    catch (err) {
        console.error('Ran into an error: '+err)
        console.log('REDIRECTING')
        res.redirect('/')
    }
})


router.delete('/:listingId/favorited-by/:userId', async (req, res) => {
  try {
    await Listing.findByIdAndUpdate(req.params.listingId, {$pull: { favoritedByUsers: req.params.userId }});
    res.redirect(`/listings/${req.params.listingId}`);
  } catch (err) {
        console.error('Ran into an error: '+err)
        console.log('REDIRECTING')
        res.redirect('/')
  }
});


// exports =======================================================================================

module.exports = router