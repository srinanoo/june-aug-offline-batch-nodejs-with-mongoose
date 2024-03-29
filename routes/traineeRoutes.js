const traineesControllers = require('../controllers/traineeControllers');
const router = require('express').Router();
const multer = require('multer');
const DIR = "./uploads/";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix+'-'+fileName);
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// /readTrainees
router.get("/readTrainees", traineesControllers.readTrainees);

// /readTrainers
router.get("/readTrainers", traineesControllers.readTrainers);

// /readSpecificTrainee
router.get("/readSpecificTrainee/:id", traineesControllers.readSpecificTrainee);

// /readSpecificTrainer
router.get("/readSpecificTrainer/:id", traineesControllers.readSpecificTrainer);

// /createTrainee
router.post("/createTrainee", upload.single('photo'), traineesControllers.createTrainee);

// /updateTrainee
router.put("/updateTrainee", traineesControllers.updateTrainee);

// /deleteTrainee
router.delete("/deleteTrainee", traineesControllers.deleteTrainee);

module.exports = router;