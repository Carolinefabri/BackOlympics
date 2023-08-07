const sports =  require ("./api/dbData.json")
console.log(sports.sports)
const Sports = require ('./models/Sport.model');

require ('./db')
Sports.insertMany(sports.sports)
.then (response =>{
    console.log(response)
})
.catch (error => {
    console.log(error)
})
