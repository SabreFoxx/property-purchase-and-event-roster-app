import models, { sequelize } from "../models/index.js";

const fetchDashboard = (req, res) => {
    res.status(200)
        .json({
            data: {
                timestamp: 1639983600,
                agenda: [
                    {
                        id: 1,
                        title: "Opening prayer",
                        speaker: {
                            name: `
                                The event will begin with the opening prayer said by 
                                Nnamdi Azikiwe`,
                            thumbnailUrl: "/images/nnamdi.png"
                        },
                        startTimestamp: 1639985400,
                        endTimestamp: 1639986300,
                    },
                    {
                        id: 2,
                        title: "National anthem",
                        speaker: {
                            name: `
                                The talented artist Phyno will lead us as we take the 
                                National Anthem`,
                            thumbnailUrl: "/images/phyno.png"
                        },
                        startTimestamp: 1639986300,
                        endTimestamp: 1639987200,
                    },
                    {
                        id: 3,
                        title: "HSE remarks",
                        speaker: {
                            name: `
                                The HSE remark will be taken by the Chief HSE Officer for Green 
                                Valley Estate, Mr Bede`,
                            thumbnailUrl: "/images/bede.png"
                        },
                        startTimestamp: 1639987200,
                        endTimestamp: 1639990800,
                    },
                    {
                        id: 4,
                        title: "Breaking of kolanut",
                        speaker: {
                            name: `
                                The Igwe of Smart kingdom, HRH. Igwe Green Valley Estate 1 
                                of Awka will break the Kolanut`,
                            thumbnailUrl: "/images/avatar.png"
                        },
                        startTimestamp: 1639990800,
                        endTimestamp: 1639992600,
                    },
                    {
                        id: 5,
                        title: "Closing prayer",
                        speaker: {
                            name: `
                                The event will come to an end with the final prayer by 
                                Native Doctor Etel`,
                            thumbnailUrl: "/images/etel.png"
                        },
                        startTimestamp: 1639992600,
                        endTimestamp: 1639994400,
                    },
                ]
            },
            message: "Ok"
        });
}

const paymentLog = async (req, res) => {
    const [data, metadata] = await sequelize.query(
        `SELECT "plotId", "size", "price", "unit", "thumbnailUrl", 
        "Sale"."createdAt" AS "purchaseDate", "name", "phone", "email" 
        FROM "Property" INNER JOIN "Sale" ON "Property"."id" = "Sale"."PropertyId" 
        INNER JOIN "Persona" ON "Sale"."PersonaId" = "Persona"."id"
        WHERE "isTaken" = true AND "webhookHasConfirmedPayment" = true`,
        { raw: true }
    );
    res.status(200)
        .json({ data, message: "Success" });
}

const setEventCountdown = (req, res) => { }

export { fetchDashboard, setEventCountdown, paymentLog }