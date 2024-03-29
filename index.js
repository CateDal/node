const express = require('express')
const UserModel = require ('./server/User')

const app = express()
const port = 3001

app.use(express.json())

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    contactno: {
        type: String,
    },
    School: {
        type: String,
    },
    College: {
        type: String,
    },
    Course: {
        type: String,
    },
});

/*const UserModel = mongoose.model('User', userSchema);*/

module.exports = UserModel;

const dbURI = 'mongodb://localhost:27017/nodeexpressdb';

/*mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, userFindAndModify: false });*/

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
     });
  

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});


/*mongoose.connect('mongodb://127.0.0.1/nodeexpressdb',{
    useUrlParser: true,
    useUnifiedTopology: true, 
})
.then(db => console.log('DB is connected'))
.catcher(err =>console.log(err));*/


app.get('/', (req, res) => {
  UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/get/:id', (req,res) =>{
    const id = req.params.id
    UserModel.findById({_id:id})
        .then(post => res.json(post))
        .catch(err => console.log(err))
})

app.post('/create', (req,res) =>{
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err))
})

app.put('/update/:id',(req,res) =>{
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id: id},{
        name:req.body.name,
        email: req.body.email,
        address: req.body.address,
        age: req.body.age,
        contactno: req.body.contactno,
        School: req.body.School,
        College: req.body.College,
        Course: req.body.Course,

    }).then(user => res.json(user))
        .catch(err => res.json(err))
})

app.delete('/deleteuser/:id', (req, res) => {
    const id = req.params.id;

    console.log('Deleting user with ID:', id);

    UserModel.findByIdAndDelete(id)
        .then(response => {
            console.log('Deletion response:', response);

            if (!response) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json(response);
        })
        .catch(err => {
            console.error('Deletion error:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});



/*app.delete('/deleteuser/:id', (req, res) =>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
        .then(response => res.json(response))
        .catch(err => res.json)
})*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})