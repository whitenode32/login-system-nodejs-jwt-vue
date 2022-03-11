// routes/router.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('../lib/db.js');
const userMiddleware = require('../middleware/users.js');


//Prevents us from passing a protected route as a pubilc one
///routeName is the name of the route
///auth = 'public' | 'protected'
const getRoute = (routeName, auth) => {
  const publicHome = '/login'
  const routes = {
    //pubilc routes
    'signUp': {name: '/sign-up', auth: 'public' },
    'login': { name: '/login', auth: 'public'},

    //protected routes
    'secretRoute': { name: '/secure', auth: 'protected'}
  }

  const route = routes[routeName];

  try {
    if(route.auth === auth){
      return route.name;
    }else{
      return publicHome;
    }
  } catch (error) {
    consolelog(error);
  }

  return routes.find();
}

router.post(getRoute('signUp', 'public'), userMiddleware.validateRegister, (req, res, next) => {
    console.log("/sign-up called");
    db.query(
      `SELECT * FROM LOGIN WHERE LOWER(username) = LOWER(${db.escape(
        req.body.username
      )});`,
      (err, result) => {
        if (result.length) {
          return res.status(409).send({
            msg: 'This username is already in use!'
          });
        } else {
          // username is available
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({
                msg: err
              });
            } else {
              // has hashed pw => add to database
              db.query(
                `INSERT INTO LOGIN (id, username, password, registered) VALUES ('${uuid.v4()}', ${db.escape(
                  req.body.username
                )}, ${db.escape(hash)}, now())`,
                (err, result) => {
                  if (err) {
                    throw err;
                    return res.status(400).send({
                      msg: err
                    });
                  }
                  return res.status(201).send({
                    msg: 'Registered!'
                  });
                }
              );
            }
          });
        }
      }
    );
  });

  router.post(getRoute('login', 'public'), (req, res, next) => {
      console.log("/login called");
    db.query(
      `SELECT * FROM LOGIN WHERE username = ${db.escape(req.body.username)};`,
      (err, result) => {
        // user does not exists
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err
          });
        }
        if (!result.length) {
          return res.status(401).send({
            msg: 'Username or password is incorrect!'
          });
        }
        // check password
        bcrypt.compare(
          req.body.password,
          result[0]['password'],
          (bErr, bResult) => {
            // wrong password
            if (bErr) {
              throw bErr;
              return res.status(401).send({
                msg: 'Username or password is incorrect!'
              });
            }
            if (bResult) {
              const token = jwt.sign({
                  username: result[0].username,
                  userId: result[0].id
                },
                'SECRETKEY', {
                  expiresIn: '7d'
                }
              );
              db.query(
                `UPDATE LOGIN SET last_login = now() WHERE id = '${result[0].id}'`
              );
              return res.status(200).send({
                msg: 'Logged in!',
                token,
                user: result[0]
              });
            }
            return res.status(401).send({
              msg: 'Username or password is incorrect!'
            });
          }
        );
      }
    );
  });

router.get(getRoute('secretRoute','public'), userMiddleware.hasAccess, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});

router.get('/hello', function (req, res, next) {
  res.send('hello')
})
 
module.exports = router;
 

/*

import express from 'express';
import Auth from '../middlewares/Auth';
import can from '../middlewares/canAccess';
import Constants from '../utils/constants';
import AdminController from "../controllers/AdminController";
import { sendSuccessResponse } from "../utils/sendResponse";

const router = express.Router();

router.get('/users', Auth, can(Constants.PERMISSION_VIEW_ALL_USERS), AdminController.users);
router.get('/dashboard', Auth, can(Constants.PERMISSION_VIEW_ADMIN_DASHBOARD), (req, res) => {
    return sendSuccessResponse(res, 200, '', 'Admin dashboard access allowed.')
});

export default router;

*/