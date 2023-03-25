
const express = require('express');
const mongoose=require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const router = require('express').Router();

const app = express();

const { ensureAuth, ensureGuest } = require('./auth.js');

router.get('/', ensureGuest ,(req, res) => {
  res.render('login')
})

router.get('/log',ensureAuth, async(req,res)=>{
  res.render('index',{ userinfo:req.user })
})

router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }))

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/log')
  }
)

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})


module.exports = router;


