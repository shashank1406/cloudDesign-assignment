const taskModel = require('../model/taskModel')
//  in line number first i require model to acces databse to perform curd operation in database



//  isvalid globelly function to  validate the string or value 

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}


// create task api to create a new task in database where we validat the all keys given by the user and after that we can 
// create the task in database
const createTask = async function (req, res) {
    try {

        let requestBody = req.body

        // use destructuring to easily acces the keys

        const { title, description, status } = requestBody


        // validation of kry given by user

        if (!isValid(title)) {
            res.status(400).send({ status: false, Message: "Please provide correct tittle" })
            return
        }

        if (!isValid(description)) {
            res.status(400).send({ status: false, Message: "Please provide valid decription " })
            return
        }

        if (!isValid(status)) {
            res.status(400).send({ status: false, Message: "Please provide valid status" })
            return
        }

        // sucesfullt create new task in database

        const taskDetail = taskModel.create(requestBody)


        // snd 201response with crated data to user 

        req.status(201).send({ status: true, msg: 'succefully create', data: taskDetail })

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: error.message })
    }
}

// getTasks api to fetch all the task data 

const getTasks = async function (req, res) {
    try {

        // here fetch all the data from database and sucessfullt send 
        const tasks = taskModel.find()

        res.status(200).send({ status: true, data: tasks })


    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: error.message })
    }
}



// updateTask api to update the existing data in database

const updateTask = async function (req, res) {
    try {

        let requestBody = req.body

        // use destructuring for easily access the key in api or block

        const { title, description, status } = requestBody


        // store the task id which wiil be given in path params 

        let uniqueTaskId = req.params.taskId


        // created object to update the values given by user if user give only title we can upat only title

        let updatableObject = {}

        // check the key is given by user or not if not we can procees further and if yes then we can validate the key 

        if (title) {
            if (!isValid(title)) {
                res.status(400).send({ status: false, Message: "Please provide correct tittle" })
                return
            }
            updatableObject.title = title
        }

        if (description) {
            if (!isValid(description)) {
                res.status(400).send({ status: false, Message: "Please provide valid decription " })
                return
            }
            updatableObject.description = description
        }

        if (status) {
            if (!isValid(status)) {
                res.status(400).send({ status: false, Message: "Please provide valid status" })
                return
            }
            updatableObject.status = status
        }

        // use findOneAndUpdate to updated a task data 
        const updateTask = await taskModel.findOneAndUpdate({ _id: uniqueTaskId }, updatableObject, { new: true })

        res.status(200).send({ status: true, message: `updated sucessfully `, data: updateTask });

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: error.message })
    }
}



module.exports.createTask = createTask
module.exports.getTasks = getTasks
module.exports.updateTask = updateTask
