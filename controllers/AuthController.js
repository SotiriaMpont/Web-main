const UserService = require("../Service/UserService");



class AuthController {
    #UserService = new UserService();

    async SignInAsync(req, res) {
        const username = req.body.username;
        const password = req.body.password;

        
        const result = await this.#UserService.SignInAsync(username, password);

        if (!result
            || !result.success) {
            return res.status(404).send({ message: "User Not found." });
        }
       
            
        if(username=="admin")
            res
                .cookie("access_token", result.accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                })
                .redirect('/admin');
        else{
            res
                .cookie("access_token", result.accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                })
                .redirect('/mainpage')
        }
    }
    
    async EditAsync(req, res) {
        const Edituser = {
            username: req.body.username,
            new_username: req.body.new_username,
            password: req.body.password,
            psw_repeat: req.body.psw_repeat,
        }
        
    
        
        const result = await this.#UserService.EditAsync(Edituser);

        if (result == "Error1")
            return res.status(404).send({ message: "User already exists." });
        else if(result == "Error2")
            return res.status(404).send({ message: "Passwords don't match." });
        else if (result == "Error3")
            return res.status(404).send({ message: "Password has unvalid form." });
        else if (result == "Error4")
            return res.status(404).send({ message: "This username doesn't exist.Try again." });
        else {
            res   
                .redirect('/login');
        }


    }

    async SignUpAsync(req, res) {
        const user = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            psw_repeat: req.body.psw_repeat,
            roles: ["moderator"],
            krousma: ["no",0]
        }
        
        const success = await this.#UserService.SignUpAsync(user);

        if (success == "Error1")
            return res.status(404).send({ message: "User already exists." });
        else if (success == "Error2")
            return res.status(404).send({ message: "Email already exists." });
        else if (success == "Error3")
            return res.status(404).send({ message: "Passwords don't match." });
        else if (success == "Error4")
            return res.status(404).send({ message: "Password has unvalid form." });
        else {
            res   
                .redirect('/login');
        }
    }
    
    async dilosi(req,res){
        const username=req.body.username;
        const krousma = req.body.krousma;
        const date = req.body.date;
        console.log(username,krousma,date);
        const result = await this.#UserService.dilosi(username,krousma,date);
        if (result=='Error 1'){
            return res.status(404).send({ message: "Wrong username." });
        }
        else
            return res.status(404).send({ message: "Επιτυχής δήλωση κρούσματος" });

    }

    async SignOut(res) {
        res
            .clearCookie("access_token")
            .redirect('/login');
    }
}
module.exports = AuthController;