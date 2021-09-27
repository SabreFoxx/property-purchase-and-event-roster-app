import models, { sequelize } from '../models/index.js';

const addSpeaker = (req, res) => {
    if (!req.body.name || !req.body.titles)
        return res.status(400)
            .json({ message: "'name' and 'titles' are required" });

    models.Speaker.create({
        name: req.body.name,
        titles: req.body.titles,
        bio: req.body.bio,
        thumbnailUrl: req.body.thumbnailString
    }).then(speaker => {
        
    })
}

