const UserModel = require("./model/User");

class Scheduler {
    updateUserStatus(id, time) {
        setTimeout(() => {
            UserModel.updateOne({ _id : id}, {active : false})
        }, time)
    }
}


module.exports = new Scheduler();