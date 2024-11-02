import mongoose from "mongoose";

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log("success")
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const fruitSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Please check your name, no name specified!"]
    },
    rating: Number,
    review: String
});

const Fruit = mongoose.model('Fruit', fruitSchema);

const fruit = new Fruit({ 
    rating: 5,
    review: 'not so convinient to eat'
});
// fruit.save();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
});

const Person = mongoose.model('Person', personSchema);





const kiwi = new Fruit({ 
    name: 'kiwi',
    rating: 5,
    review: 'not so convinient to eat'
});

Fruit.insertMany([kiwi])
.then(function () {
            console.log("Successfully saved defult items to DB");
        })
        .catch(function (err) {
            console.log(err);
        });

const watermelon = new Fruit({ 
    name: 'watermelon',
    rating: 8,
    review: 'great when you are thirsty'
});

const apple = new Fruit({ 
    name: 'apple',
    rating: 8,
    review: 'always good to eat'
});

// Fruit.insertMany([kiwi,watermelon,apple])
//     .then(function () {
//         console.log("Successfully saved defult items to DB");
//     })
//     .catch(function (err) {
//         console.log(err);
//     });

// Fruit.find(function(err,fruits){
//     if(err){
//         console.log(err);
//     }else{
//         fruits.forEach(function(fruit){
//             console.log(fruit.name);
//         });
//     }
// });

async function myfruits() {
    const fruits= await Fruit.find({});
    fruits.forEach(function(fruit){
        console.log(fruit.name);
    });
}
// myfruits();

// await Fruit.deleteOne({ name: 'kiwi' });

// await Person.deleteMany({ name: /John/ }); 


const person = new Person({ 
    name: 'John',
    age: 30,
    favoriteFruit: kiwi
});

// console.log(person.name);
person.save();

