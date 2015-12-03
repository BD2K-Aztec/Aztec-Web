var ToolInfoViewModel = require('../viewmodels/tool-info-viewmodel.js');
var CreateViewModel = require('../viewmodels/tool/create-viewmodel.js');
var EditViewModel = require('../viewmodels/tool/edit-viewmodel.js');
var BD2K = require('../utility/bd2k.js');
var Tool = require('../models/tool.js');

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//  ToolController
//
function ToolController() {
    var self = this;

    this.show = function(req, res) { self._show(self, req, res) };
    this.create = function(req, res) { self._create(self, req, res) };
    this.filters = function(req, res) { self._filters(self, req, res); };
    this.edit = function(req, res) { self._edit(self, req, res); };
}

//--- filters ------------------------------------------------------------------
ToolController.prototype._filters = function (self, req, res){
    var filters = new Tool().filters();
    BD2K.json(res, filters);
};

//--- create ------------------------------------------------------------------
ToolController.prototype._create = function (self, req, res){
    var tool = new CreateViewModel(req.query.input);
    tool.load(function(i){
        if(req.isAuthenticated()) {
            i.email = req.user.email;
            res.render("tool/create", i);
        }
        else{
            i.email = "admin"; //change
            res.render("home/gologin"); //change
        }
    });
};

//--- edit ------------------------------------------------------------------
ToolController.prototype._edit = function (self, req, res){
    var tool = new EditViewModel(req.query.id);
    tool.load(function(i){
        if(req.isAuthenticated() && (i.preset.owners || req.user.isAdmin)){
            if(req.user.isAdmin || i.preset.owners.indexOf(req.user.email) > -1){
                i.email = req.user.email;
                res.render("tool/create", i);
            }
            else{
                res.render("tool/unedtiable", i);
            }
        }
        else {
<<<<<<< HEAD
            //res.render("tool/uneditable", i);
            i.email = "admin"; //change
            res.render("tool/create", i); //change to failure page later
=======
            res.render("tool/uneditable", i);
            //i.email = "admin"; //change
            //res.render("tool/create", BD2K.extend(i, {
            //    loggedIn: req.loggedIn,
            //    user: req.user
            //})); //change to failure page later
>>>>>>> aefdac2380fd884c15941b70698086208bdb91a4
        }
    });
};

//--- show -----------------------------------------------------------------------
ToolController.prototype._show = function (self,req,res){
    var info = new ToolInfoViewModel(req.query.id);

    info.load(function(i){

        i.resource.editable = false;
        if(req.isAuthenticated() && (i.resource.owners || req.user.isAdmin)){
            if(req.user.isAdmin || i.resource.owners.indexOf(req.user.email) > -1){
                i.resource.editable = true;
            }
        }

        res.render("tool/show", i);
    });
};

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

module.exports = new ToolController();