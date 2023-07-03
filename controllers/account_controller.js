class AccountController{

    static getUser = async (req, res) =>{
        res.send( {
            "user": "TestUser"
        });
    }

    static createUser = async (req, res) =>{
        res.send({
            "user": "Creating user"
        })
    }
}


export default AccountController