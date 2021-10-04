import models from '../models/index.js';

export const addSpeaker = (req, res) => {
    if (!req.body.name || !req.body.titles)
        return res.status(400)
            .json({ message: "'name' and 'titles' are required" });

    models.Speaker.create({
        name: req.body.name,
        titles: req.body.titles,
        bio: req.body.bio
    }).then(speaker => {
        speaker.thumbnailUrl = `/images/speakers/${speaker.id}.jpg`;
        speaker.save();
        res.status(201)
            .json({ data: speaker, message: "Speaker added successfully" });
    }).catch(error => {
        res.status(500).json({ message: "Error adding speaker" })
    })
}

export const fetchSpeaker = (req, res) => {
    getSpeakerById(req.params.id)
        .then(speaker => {
            res.status(200).json({ data: speaker, message: "Success" })
        }).catch(error => res.status(400).json({ message: "No speaker matching supplied id" }))
}

export const addAgenda = (req, res) => {
    if (!req.body.title || !req.body.start || !req.body.end)
        return res.status(400)
            .json({
                message: "'title', 'start' and 'end' both in YYYY/MM/DD HH:MM:SS format are required"
            });

    models.Agenda.create({
        title: req.body.title,
        startDatetime: req.body.start,
        endDatetime: req.body.end,
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

export const setMainSpeaker = async (req, res) => {
    try {
        const agenda = await getAgendaById(req.params.id);
        agenda.MainSpeakerId = req.body.speakerId;
        agenda.save();
        res.status(200)
            .json({ data: { agenda }, message: "Success" })
    } catch (error) { message: "No agenda matching supplied id" }
}

export const fetchAgenda = async (req, res) => {
    try {
        const agenda = await getAgendaById(req.params.id);
        const speakers = await agenda.getSpeakers();
        // remove useless sequelize association table from object
        speakers.map(result => result.dataValues).forEach(speaker => {
            speaker.AgendaSpeaker = undefined
        })
        res.status(200)
            .json({ data: { agenda, speakers }, message: "Success" })
    } catch (error) { message: "No agenda matching supplied id" }
}

export const fetchAgendas = (req, res) => {
    models.Agenda.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    }).then(agendas => {
        let arr = Array.from(agendas)
        arr.forEach(element => { // convert to unix timestamp
            let datum = Date.parse(element.startDatetime);
            element.startTimestamp = datum / 1000;
            let datum = Date.parse(element.endDatetime);
            element.endTimestamp = datum / 1000;
        });
        res.status(200)
            .json({
                data: agendas,
                message: "Success"
            })
    }).catch(error => {
        res.status(204)
            .json({ message: "No data to display" })
    });
}

export const updateAgenda = (req, res) => {
    try {
        const agendas = getAgendaById(req.params.id);
    } catch (error) { message: "No agenda matching supplied id" }
}

export const addSpeakerToAgenda = async (req, res) => {
    try {
        const speaker = await getSpeakerById(req.body.speakerId);
        let agenda = await getAgendaById(req.params.id);
        agenda.addSpeaker(speaker)
            .then(details => {
                res.status(200)
                    .json({ data: details, message: "Speaker added successfully" })
            })
    } catch (err) {
        res.status(400)
            .json({ message: "Invalid speaker or agenda" });
    }
}

const getAgendaById = (id) => {
    return models.Agenda.findOne({
        where: { id: id },
        attributes: { exclude: ["createdAt", "updatedAt"] }
    });
}

const getSpeakerById = (id) => {
    return models.Speaker.findOne({
        where: { id: id }
    });
}
