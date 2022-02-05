const authorization = require("../middlewares/authorization");
const AuthController = require("../controllers/AuthController");
const CheckModeratorRole = require("../middlewares/CheckModeratorRole");
const Poi = require("../models/poi.model");
const PoiController = require("../controllers/PoiController");

module.exports = function(app) {
    //mainpage
    app.get(
        "/mainpage", [authorization, CheckModeratorRole],
        function(req, res) {
            res.render("mainpage.ejs");
        }
    );
    app.post("/mainpagetypes", async(req, res) => {
        const poiController = new PoiController();

        return await poiController.GetCoords(req, res);
    });

    //allagh stoixeiwn xrhsth
    app.get("/mainpage/profile_change", function(req, res) {
        res.render("profile_change.ejs");
    });
    app.post("/mainpage/profile_change", async(req, res) => {
        const authController = new AuthController();
        return await authController.EditAsync(req, res);
    });
    //dilosi krousmatos
    app.get("/mainpage/dilosi", function(req, res) {
        res.render("dilosi.ejs");
    });
    app.post("/mainpage/dilosi", async(req, res) => {
        const authController = new AuthController();
        return await authController.dilosi(req, res);
    });

    app.post("/maipagePopTimes", async(req, res) => {

        const poiController = new PoiController();
        return await poiController.GetPopTimes(req, res);

    })




};