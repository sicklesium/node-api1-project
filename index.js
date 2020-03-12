// implement your API here

const express = require('express');
const server = express();
const db = require('./data/db.js');
const shortid = require('shortid');

console.log(shortid.generate());

server.listen(4000, () =>
    console.log('Server listening on port 4000!')
)

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello... is it me youre looking for?');
})

// POST request for /api/users
server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    const dbInfo = req.body;

    if (name && bio) {
        db.insert(dbInfo)
            .then((db) => {
                res.status(201).json({ success: true, db });
            })
            .catch((err) => {
                res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
            });
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }

});


// GET request for all Users
server.get('/api/users', (req, res) => {
    db.find()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The users information could not be retrieved." });
        });
});

// GET request for specific user
server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json({ success: true, user });
            } else {
                res.status(404).json({ errorMessage: "The user with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The user information could not be retrieved." });
        });
});

// PATCH request for specific user 
server.patch('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const userInfo = req.body;
    const { name, bio } = req.body;

    if (name && bio) {
        db.update(id, userInfo)
            .then(user => {
                if (user) {
                    res.status(200).json({ success: true, user });
                } else {
                    res.status(404).json({ errorMessage: "The user with the specified ID does not exist." });
                }
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "The user information could not be modified." });
            });
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
});

// PUT request just in case
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const userInfo = req.body;
    const { name, bio } = req.body;

    if (name && bio) {
        db.update(id, userInfo)
            .then(user => {
                if (user) {
                    res.status(200).json({ success: true, user });
                } else {
                    res.status(404).json({ errorMessage: "The user with the specified ID does not exist." });
                }
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "The user information could not be modified." });
            });
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
});

// DELETE request for a specific user
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
        .then(deletedUser => {
            if (deletedUser) {
                res.status(201).json({ success: true, deletedUser });
            } else {
                res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The user could not be removed." })
        })
})