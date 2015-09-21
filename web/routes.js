// app/routes.js
var HomeController = require('./controllers/home-controller.js');
var ResourceController = require('./controllers/resource-controller.js');
var ToolController = require('./controllers/tool-controller.js');

module.exports = function(app, passport) {

    app.get('/', HomeController.index);
    app.get('/home/index', HomeController.index);
    app.get('/home/overview', HomeController.overview);
    app.get('/home/metadata', HomeController.metadata);
    app.get('/home/technologies', HomeController.technologies);
    app.get('/home/sources', HomeController.sources);

    app.get('/resource/raw', ResourceController.raw);
    app.get('/resource/advanced', ResourceController.advanced);
    app.get('/resource/search', ResourceController.search);
    app.get('/resource/update', ResourceController.update);
    app.get('/resource/stat', ResourceController.stat);
    app.get('/resource/add', ResourceController.add);

    app.get('/tool/filters', ToolController.filters);
    app.get('/tool/show', ToolController.show);
    app.get('/tool/create', ToolController.create);
    app.get('/tool/edit', ToolController.edit);


    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/home/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('home/login', { message: req.flash('loginMessage') });
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/home/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('home/signup', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/home/profile', isLoggedIn, function(req, res) {
        res.render('home/profile', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}