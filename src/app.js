// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm

import $ from "jquery"
window.jQuery = $;
window.$ = $;
require('bootstrap');

import angular from 'angular';
var ForerunnerDB = require("forerunnerdb");

import env from './env';
console.log('Loaded environment variables:', env);

var electron_app = remote.app;
var appDir = jetpack.cwd(electron_app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
console.log('The author of this app is:', appDir.read('package.json', 'json').author);


var app = angular.module('PersonalDashboard', []); 

app.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['**']);
});

app.controller("MainCtrl", function($scope, $timeout) { 
    $scope.menus =  [{
        "nome": "owncloud",
        "titulo": "Owncloud",
        "icone": "",
        "url": "http://owncloud.org"
    },{
        "nome": "gdrive",
        "titulo": "Google Drive",
        "icone": "",
        "url": "http://drive.google.com"
    }];
    $scope.open_menus= [{
        "nome": "homepage",
        "titulo": "Homepage",
        "icone": "",
        "url": "homepage.html"
    }],
    $scope.iframeUrl= '';
    $scope.iframeHeight= 0;

    $scope.abrirMenu = function (menu) {

        var els = $scope.open_menus.filter(function(el) {
            console.log(menu);
            return el.nome === menu.nome;
        });

        if (els.length == 0) {
            $scope.open_menus.push(menu);
            $scope.iframeHeight = (($(window).height() - $(".navbar-static-top").outerHeight()) );
        }

        $timeout(function () {
            $('.nav-tabs a[href="#' + menu.nome + '"]').tab('show');
        });
    };

    $scope.fecharMenu = function(menu) {
        $scope.open_menus.map(function(el, index) {
            if (el.nome === menu.nome) {
                $scope.open_menus.splice(index, 1);
            }
        });
    };
    
    $scope.addHash = function(url) {
        return "#" + url;
    }
});

app.controller("CfgWebsitesCtrl", function($scope) {

    $scope.greeting= "Hello";
    $scope.websites= [];
    $scope.current_website= false;
    $scope.fdb= '';

    $scope.fbd = new ForerunnerDB();
    var db = $scope.fbd.db("personal-dashboard");
    $scope.fdb = db.collection("websites", {primaryKey: "name"}),

    $scope.openNewWebsite = function() {
        $scope.current_website = {
            "name": "site_name",
            "title": "Site Title",
            "icon": "",
            "url": "http://siteurl.com"
        }
    };
    $scope.openWebsite = function(website) {
        $scope.current_website = website;
    };
    $scope.saveWebsite = function() {
        $scope.fdb.insert(this.current_website);
        $scope.refreshList();
    };
    $scope.removeWebsite = function(website) {
        this.fdb.remove({
            name: website.name
        });
        this.refreshList();
    };
    $scope.refreshList = function(){
        this.websites = this.fdb.find();
    };

    $scope.refreshList();

});

app.directive("configuracoes", function() {
    return {
        restrict: "E",
        templateUrl: "parts/Configuracoes.html",
    };
});

app.directive("cfgwebsites", function() {
    return {
        restrict: "E",
        templateUrl: "parts/Configuracoes/Websites.html",
        controller: 'CfgWebsitesCtrl'
    };
});


document.addEventListener('DOMContentLoaded', function () {
    
    require("sb-admin-2/vendor/metisMenu/metisMenu.min.js");
    require("sb-admin-2/dist/js/sb-admin-2.js");
    
});
