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

// POST ===========================================================================================



// exports ========================================================================================

module.exports = router