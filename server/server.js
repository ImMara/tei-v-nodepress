const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const fs = require("fs");
const {ensureRoleAllowsSettings} = require("./config/security.config");
const {ensureRoleAllowsUsers} = require("./config/security.config");
const {ensureRoleAllowsMenu} = require("./config/security.config");
const {ensureRoleAllowsPage} = require("./config/security.config");
const {ensureRoleAllowsBlog} = require("./config/security.config");
const {ensureAuthenticated} = require("./config/security.config");
const {uploadBlogs} = require('./config/multer.config')

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        // Connect to database
        require('./database');

        // Create server express and export to use it in different files
        const server = express();
        exports.server = server;

        // Cookie parser to allow token in cookies
        server.use(cookieParser());

        // Setup token strategy  to connect
        require('./config/jwt.config');

        server.get('/np-admin/blog',ensureAuthenticated,ensureRoleAllowsBlog,(req, res, next) => {
            return handle(req, res, next);
        })

        server.get('/np-admin/page',ensureAuthenticated,ensureRoleAllowsPage,(req, res, next) => {
            return handle(req, res, next);
        })

        server.get('/np-admin/menu',ensureAuthenticated,ensureRoleAllowsMenu,(req, res, next) => {
            return handle(req, res, next);
        })

        server.get('/np-admin/users',ensureAuthenticated,ensureRoleAllowsUsers,(req, res, next) => {
            return handle(req, res, next);
        })

        server.get('/np-admin/settings',ensureAuthenticated,ensureRoleAllowsSettings,(req, res, next) => {
            return handle(req, res, next);
        })

        // Using security on all page under admin
        server.get('/np-admin/*' , ensureAuthenticated, (req,res,next)=>{
            return handle(req,res,next);
        })

        // All pages handle by nextJS
        server.get('*' , (req,res,next) =>{
            return handle(req,res,next);
        })

        // Post auth informations
        // To disable security connections to this specific path
        server.post('/api/auth/*', (req,res,next)=>{
            return handle(req,res,next);
        })

        // All route and handle by nextJS under security middleware
        server.post('*', ensureAuthenticated, (req,res,next)=>{
            return handle(req,res,next);
        })

        // All route and handle by nextJS under security middleware
        server.put('*', ensureAuthenticated, (req,res,next)=>{
            return handle(req,res,next);
        })

        // All patch route and handle by nextJS under security middleware
        server.patch('*', ensureAuthenticated, (req,res,next) =>{
            return handle(req,res,next);
        })

        // All delete route and handle by nextJS under security middleware
        server.delete('*' ,ensureAuthenticated, (req,res,next) =>{
            return handle(req,res,next);
        })

        // create server and listen the port
        // throw err if wrong configuration
        // url of server
        server.listen(3000, (err)=>{
            if (err) throw err;
            console.log('> Ready on http://localhost:3000');
        })
    })