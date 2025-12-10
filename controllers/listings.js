// imports =======================================================================================

const express = require('express')
const router = express.Router()
const Listing = require('../models/listing')

// GET ============================================================================================

router.get('/', async (req,res)=>{
    try{
        const listings = await Listing.find()
        res.render('listings/index.ejs', {listings})
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

// POST ===========================================================================================

router.post('/', async (req,res)=>{
    
})

// exports ========================================================================================

module.exports = router