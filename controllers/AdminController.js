const AdminService = require("../Service/AdminService");




class AdminController {
    #AdminService = new AdminService();

    async Uploadfiles(req, res) {
        const file = req.files.myFile;
        
        const fileData = JSON.parse(file.data);
    
        const theNewPoi = fileData.map(theNewPoi => {
            return {
                id: theNewPoi.id,
                name: theNewPoi.name,
                types: theNewPoi.types,
                address: theNewPoi.address,
                coordinates: theNewPoi.coordinates,
                populartimes: theNewPoi.populartimes,
            }
        })
    
        console.log(theNewPoi);
        //gia na perastoun oi eggrafes
        const result = await this.#AdminService.Uploadfiles(theNewPoi);

        res.send(result);
        

    }

    async Deletefiles(res){
        const result = await this.#AdminService.Deletefiles();
        res.send(result);
    }
    

    async SignOut(res) {
        res
            .clearCookie("access_token")
            .redirect('/login');
    }


}

module.exports = AdminController;