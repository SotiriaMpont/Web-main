const PoiRepository = require("../Infastracture/PoiRepository");

class PoiService {

    #
    repo = new PoiRepository();

    async GetCoords(search) {
        //kalw thn findBy me to value pou exw parei apo to search
        const query = {
            //me ayto ton tropo ousiastika kanw to select
            $or: [{
                    name: search,
                },
                {
                    types: { $eq: search },
                },
            ],
        };
        const fields = {
            _id: 0,
            coordinates: 1,
        };

        const coords = await this.#repo.findBy(query, fields);
        return coords;
    }

    //Bgazei noima 

    async GetPopTimes(day, time, lat, lgn) { // einai mazi to latlng giati tha to pairnw ws e apo mainpage?

        const query = {

            $and: [{
                    'coordinates.lat': lat,
                    'coordinates.lng': lgn
                },
                {
                    'populartimes.name': day,
                    'populartimes.data': { $slice: [time, time + 2] } // 
                    //$slice: [ <number to skip>, <number to return> ]
                }

            ]
        }

        const fields = {

            name: 1, //den 3erw an einai aparaithto 
            populartimes: 1 // ola tou populartimes 

        }

        const PopTimes = await this.#repo.findBy(query, fields);
        return PopTimes;

    }

}
module.exports = PoiService;