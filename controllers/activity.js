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

const fetchSpeaker = (req, res) => {
    res.status(200)
        .json({
            data: {
                id: req.params.id,
                name: "Dr. Seus The Lorax",
                bio: "Seus is the director of the movie",
                agendas: null
            },
            message: "Success"
        })
}

const fetchAgenda = (req, res) => {
    res.status(200)
        .json({
            data: {
                id: req.params.id,
                title: "Opening prayers",
                startTimestamp: 1634948072,
                endTimestamp: 1635034472,
                description: "The opening prayers is a very important part of the event",
                speakers: [
                    { name: "Chief Dr. Willie Obiona", thumbnailUrl: "/images/Avatar.png" },
                    { name: "John Adams", thumbnailUrl: "/images/Avatar.png" },
                    { name: "Agape Williams", thumbnailUrl: "/images/Avatar.png" }
                ],
                youtubeLink: "youtube.com/watch?v=CQBV6cxeI40"
            },
            message: "Success"
        })
}

export { addSpeaker, fetchSpeaker, fetchAgenda }