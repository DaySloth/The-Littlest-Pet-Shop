const db = require("../models");

var petfinder = require("@petfinder/petfinder-js");
var client = new petfinder.Client({ apiKey: process.env.API_KEY, secret: process.env.SECRET_KEY });

let express = require("express");
let router = express.Router();

router.get("/", function(req, res){
    res.render("index");
});

router.get("/login", function(req, res){
    res.render("login");
});

router.get("/register", function(req, res){
    res.render("register");
});

router.get("/forgot-password", function(req, res){
    res.render("forgot-password");
});


router.get("/search-pet", function (req, res) {
    client.animal.search().then(function (response) {
        let petArr = [];

        response.data.animals.forEach(element => {
            let petObj = {
                name: element.name,
                url: element.url,
                species: element.species,
                age: element.age,
                gender: element.gender,
                photo_url: element.photos,
                organization_id: element.organization_id,
                email: element.contact.email,
                phone: element.contact.phone,
                address1: element.contact.address.address1,
                address2: element.contact.address.address2,
                city: element.contact.address.city,
                state: element.contact.address.state,
                zipcode: parseInt(element.contact.address.postcode),
                country: element.contact.address.country
            };

            petArr.push(petObj);
        });
        console.log(petArr);
        res.render("search-pet", {pet: petArr});
    });
    
});

router.get("/saved-pets", function(req, res){
    res.render("saved-pets");
});




module.exports = router;