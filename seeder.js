const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({path: "./config/config.env"});

// Load models
const bootcamp = require('./models/Bootcamp');
const Bootcamp = require('./models/Bootcamp');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Read the JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

// Import into DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        console.log('Data imported...');
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

// Delete all data
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        console.log('Data destroyed...');
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

// Arguments will be passed in from command line
// e.g node seeder -i
if(process.argv[2] === '-i'){
    importData();
} else if(process.argv[2] === '-d'){
    deleteData();
}