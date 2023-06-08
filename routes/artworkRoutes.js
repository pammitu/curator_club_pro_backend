const express = require('express');
const router = express.router();
const User = require('../models/user');
const Artwork = require('../models/artwork');
const Artwork = require('../models/artwork');

router.put('/:username/collection/add', async (req, res) => {
    const artworkId = req.body.artworkId;
    const username = req.params.username;

    const user = await User.findOne({ username: username });
    const artwork = await Artwork.findById(artworkId);

if (!user) {
    return res.status(404).json({ message: 'User not found' });
}

if (!artwork) {
    return res.status(404).json({ message: 'Artowrk not found' });
}

    user.findOneAndUpdate(
        { username: username },
        { $push: { collection: artworkId } },
        function(err, result) {
            if (err) {
                return res.status(500).json({ message:' An error occured', error: err});
            } else {
                return res.status(200).json(result);
            }
        }
    );
});

router.get('/search/met', (req, res) => {
    let query = req.query.q;
    axios.get('https://api.museum.com/artworks', {
        params: {
            q: query
        }
    })
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        res.status(500).send(error);
    });
});

router.get('/search/europeana', (req,res) => {
    let query = req.query.q;
    axios.get('https://api.europeana.eu/record/v@/search.son', {
        params: {
            query: query,
            wskey: process.env.EUROPEANA_API_KEY //the API key should be stored in env variable
        }
    })
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        res.status(500).send(error);
    });
});

module.exports = router;