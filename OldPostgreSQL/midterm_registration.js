"use strict";

const db = require('../db/queries.js');

const express = require('express');
const router  = express.Router();


module.exports = function (knex) {

  const saveUser = (user, callback) => {
    knex
    .returning('id')
    .insert({
      name:        user.name,
      email:       user.email,
      password:    user.password
    }).into('users')
    .then((idArr) => {
      user.id = idArr[0];
      console.log('user.id', user.id);
      callback(user);
    })
    .catch(function(err){
      console.log('Error', err.message);
    });
  };

  const getResourcesByUser = (userID, callback) => {
    knex
    .select('*')
    .from('resources')
    .where('user_id', userID)
    .then((resourcesFromDB) => {
      callback(resourcesFromDB.sort(sortNewest));
    });
  };


  //This is the Registration//
  router.post("/", (req, res) => {

    let user = {
      name: req.body.email,
      email: req.body.uname,
      password: req.body.pword,
    }

    saveUser(user, (userWithID) => {
      getResourcesByUser(userWithID.id, (resourcesFromDB) => {
        res.status(200).render("user_page", {resourcesFromDB: resourcesFromDB});
      });
    });

    // knex
    // .returning('id')
    // .insert({
    //   name:        user.name,
    //   email:       user.email,
    //   password:    user.password
    // })
    // .into('users')
    // .then((idArr) => {
    //   user.id = idArr[0];
    //   console.log('user.id', user.id);

    //   // Fetch user resources
    //   getResourcesByUser(user.id, function(resourcesFromDB) {
    //     res.status(200).render("user_page", {resourcesFromDB: resourcesFromDB});
    //   });
    // })
    // .catch(function(err){
    //   console.log('Error', err.message);
    // });

  })
  return router;
}

