const { requireUserModel } = require('../../routes.js');
const userModel = requireUserModel();
class LoginController {

    loginUser(req, res) {
        const { email, password } = req.body;
      
        userModel.getUser(email, password, (err, user) => {
            if (err) {
                console.error(err);
                const returnResult = {
                "error": {
                    "code": 500,
                    "message": "Internal Server Error",
                    "details": "O servidor encontrou uma situação com a qual não sabe lidar."
                }
                }
                res.status(500).json(returnResult);
            } else if (!user) {
                const returnResult = {
                "error": {
                    "code": 401,
                    "message": "Unauthorized",
                    "details": "Não encontrado."
                }
                }
                res.status(401).json(returnResult);
            } else { 
        
                if(user.error.code !== 200){
                res.status(user.error.code).json(user.error);
                return null;
                }
                
                res.status(user.error.code).json(user)
        
            }
        });
      }
}

module.exports = new LoginController();