import models, { sequelize } from '../models/index.js';
import { strToTime } from '../utilities/time.js';

const addSpeaker = (req, res) => {
    if (!req.body.name || !req.body.titles)
        return res.status(400)
            .json({ message: "'name' and 'titles' are required" });

    models.Speaker.create({
        name: req.body.name,
        titles: req.body.titles,
        bio: req.body.bio
    }).then(speaker => {
        res.status(201)
            .json({ data: speaker, message: "Speaker added successfully" });
    }).catch(error => {
        res.status(500).json({ message: "Error adding speaker" })
    })
}

const fetchSpeaker = (req, res) => {
    models.Speaker.fetchOne({
        where: { id: req.params.id }
    }).then(speaker => {
        res.status(200).json({ data: speaker, message: "Success" })
    }).catch(error => res.status(400).json({ message: "No speaker matching supplied id" }))
}

const addAgenda = (req, res) => {
    if (!req.body.title || !req.body.start || !req.body.end)
        return res.status(400)
            .json({
                message: "'title', 'start' and 'end' both in YYYY/MM/DD HH:MM:SS format are required"
            });
    let start, end = null;
    try {
        start = strToTime(req.body.start);
        end = strToTime(req.body.end)
    } catch (err) {
        return res.status(400)
            .json({ message: "'start' and 'end' should both be in YYYY/MM/DD HH:MM:SS format" })
    }

    models.Agenda.create({
        title: req.body.title,
        startTimestamp: start,
        endTimestamp: end,
        description: req.body.description,
        youtubeLink: req.body.youtubeLink,
        MainSpeakerId: req.body.speakerId
    }).then(agenda => {
        agenda.MainSpeakerId = undefined;
        res.status(201)
            .json({
                data: agenda,
                message: "Agenda created successfully"
            })
    }).catch(error => {
        res.status(400).json({ message: "Error creating agenda" });
    })
}

const getAgenda = (id) => {
    return models.Agenda.fetchOne({
        where: { id: id },
        attributes: { exclude: [MainSpeakerId, createdAt, updatedAt] }
    })
}

const fetchAgenda = async (req, res) => {
    try {
        const agendas = getAgenda(req.params.id);
        const speakers = agendas.getSpeakers();
        res.status(200)
            .json({ data: { agendas, speakers }, message: "Success" })
    } catch (error) { message: "No agenda matching supplied id" }
    // .json({
    //     data: {
    //         id: req.params.id,
    //         title: "Opening prayers",
    //         startTimestamp: 1634948072,
    //         endTimestamp: 1635034472,
    //         description: "The opening prayers is a very important part of the event",
    //         speakers: [
    //             { name: "Chief Dr. Willie Obiona", thumbnailUrl: "/images/Avatar.png" },
    //             { name: "John Adams", thumbnailUrl: "/images/Avatar.png" },
    //             { name: "Agape Williams", thumbnailUrl: "/images/Avatar.png" }
    //         ],
    //         youtubeLink: "youtube.com/watch?v=CQBV6cxeI40"
    //     },
    //     message: "Success"
    // })
}

const fetchAgendas = (req, res) => {
    models.Agenda.findAll({
        exclude: [MainSpeakerId, createdAt, updatedAt]
    }).then(agendas => {
        res.status(200)
            .json({
                data: agendas,
                message: "Success"
            })
    }).catch(error => {
        res.status(204)
            .json({ message: "No data to display" })
    })
}

const updateAgenda = (req, res) => {
    try {
        const agendas = getAgenda(req.params.id);
    } catch (error) { message: "No agenda matching supplied id" }
}

export { addSpeaker, fetchSpeaker, addAgenda, fetchAgendas, fetchAgenda, updateAgenda }