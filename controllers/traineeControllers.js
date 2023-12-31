const TraineeModel = require('../models/traineeModel');

// Read the file content using Async
async function readTrainees(req, res) {
    try {
        const obj = req.body;
        // const { name, id } = obj;
        // const data = `{$or: [{name: ${name}}, {id: ${id}}]}`;

        const results = await TraineeModel.find(obj);
        if(results.length > 0)
            res.json({"data": results, "msg": "success"});
        else
            res.json({"data": [], "msg": "Trainee not found!"});

        // console.log(obj);
        // TraineeModel.find(obj).then(results => res.json({"data": results, "msg": "success"}));
    
    } catch (err) {
        res.json({ "error": err.message });
    }
}

// Read the file content using Async
async function readSpecificTrainee(req, res) {
    try {
        const obj = req.body;
        const results = await TraineeModel.find(obj);
        if(results.length > 0)
            res.json({"data": results, "msg": "success"});
        else
            res.json({"data": [], "msg": "Trainee not found!"});
    } catch (err) {
        res.json({ "error": err.message });
    }
}

// Write the file content using Async
async function createTrainee(req, res) {
    try {
        const obj = req.body;
        if(JSON.stringify(obj) !== "{}") {
            const resultsArr = await TraineeModel.find({"name": obj.name});
    
            if(resultsArr.length > 0)
                res.json({"msg":"Trainee already Exists!"});
            else {
                const insertTrainee = new TraineeModel(obj);
                await insertTrainee.save();
                res.json({"msg":"Trainee has been created successfully!"});
            }
        } else
            res.json({"msg":"No Data to Create"});
    } catch (err) {
        res.json({ "error": err.message });
    }
}

async function deleteTrainee(req, res) {
    try {
        const obj = req.body;
        if(JSON.stringify(obj) !== "{}") {
            const resultsArr = await TraineeModel.find({"name": obj.name});
    
            if(resultsArr.length > 0) {
                const results = await TraineeModel.deleteOne(obj);
                console.log(results);
                if(results.deletedCount !== "")
                    res.json({"msg":"Trainee has been deleted successfully!"});
                else
                    res.json({"msg":"Unable to delete trainee"});
            } else {
                res.json({"msg":"No Data to Delete"});   
            }
        } else
            res.json({"msg":"No Data to Delete"});
    } catch (err) {
        res.json({ "error": err.message });
    }
}

async function updateTrainee(req, res) {
    try {
        const obj = req.body;
        if(JSON.stringify(obj) !== "{}") {
            const resultsArr = await TraineeModel.find({"name": obj.name});
    
            if(resultsArr.length > 0) {
                const opts = { runValidators: true };

                const results = await TraineeModel.updateOne({"name": obj.name}, {$set: obj}, opts);
                console.log(results);
                if(results.modifiedCount !== "")
                    res.json({"msg":"Trainee has been updated successfully!"});
                else
                    res.json({"msg":"Unable to update trainee"});
            } else {
                res.json({"msg":"No Data to Update"});   
            }
        } else
            res.json({"msg":"No Data to Update"});
    } catch (err) {
        res.json({ "error": err.message });
    }
}

module.exports = {
    readTrainees,
    readSpecificTrainee,
    createTrainee,
    updateTrainee,
    deleteTrainee
}