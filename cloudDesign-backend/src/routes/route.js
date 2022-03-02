const express = require('express')
const controller= require('../controller/controller')

const router = express.Router()


// apis to perform crud operations in task 

router.post("/task", controller.createTask);
router.get("/task", controller.getTasks);
router.put("/task/:taskId", controller.updateTask);





module.exports = router;