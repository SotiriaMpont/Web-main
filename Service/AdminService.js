const PoiRepository = require("../Infastracture/PoiRepository");

class AdminService {
    #repo = new PoiRepository();

    async Uploadfiles(theNewPoi){


        if(await this.#repo.PoiExists(theNewPoi.name)){
            console.log("Some positions already exist");
            return "false";
        }
        else{ 
            const upload = await this.#repo.Upload(theNewPoi);
            return "true";
        }
    }

    async Deletefiles(){
        const deleteall = await this.#repo.Delete();
        return deleteall;
    }
    
}
module.exports = AdminService;