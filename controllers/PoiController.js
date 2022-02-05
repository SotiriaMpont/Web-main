const PoiService = require("../Service/PoiService");

class PoiController {
    async findbyid(req, res) {
        const poiId = req.body.id;
        const poiService = new PoiService();
        const poi = await poiService.findbyid(poiId);
        res.send(poi);
    }

    async GetCoords(req, res) {
        const search = req.body.search;
        const poiService = new PoiService();

        const RespondePoi = await poiService.GetCoords(search);
        res.send(RespondePoi);
    }


    async GetPopTimes(req, res) {
        // na pairnei mera,wra kai lat,lng
        // const search = ;
        const poiService = new PoiService();

        const RespondePopTimes = await poiService.GetPopTimes(lat, lng, day, time);
        res.send(RespindePopTimes);

    }
}
module.exports = PoiController;