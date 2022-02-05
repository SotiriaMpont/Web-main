const authorization = require("../middlewares/authorization");
const AuthController = require("../controllers/AuthController");


module.exports = function (app) {
    // arxiki selida tou login 
    app.get('/login', function (req, res) {
        res.render('login.ejs')
    });

    app.get('/', function (req, res) {
        res.render('login.ejs')
    });

    app.get("/logout", authorization, (req, res) => {
        const authController = new AuthController();
        return authController.SignOut(res);
    });

    app.post('/login', async (req, res) => {
        const authController = new AuthController();
        return await authController.SignInAsync(req, res);
    });
    //selida tou register 

    app.get('/register', function (req, res) {
        res.render('register.ejs');
    })

    app.post('/register', async (req, res) => {
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({ errors: errors.array() });
            // }
            const authController = new AuthController();
            return await authController.SignUpAsync(req, res);
           
    });

    

  
    


    
};
