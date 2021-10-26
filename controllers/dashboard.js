import models, { sequelize } from "../models/index.js";

const fetchDashboard = (req, res) => {
    res.status(200)
        .json({
            data: {
                timestamp: 1637835316,
                agenda: [
                    {
                        id: 1,
                        title: "Opening prayer",
                        speaker: {
                            name: "Fr. Lienus Mbaka",
                            thumbnailUrl: "/images/Avatar.png"
                        },
                        startTimestamp: 1634948072,
                        endTimestamp: 1635034472,
                    },
                    {
                        id: 2,
                        title: "National anthem",
                        speaker: {
                            name: "Goodluck Jonathan",
                            thumbnailUrl: "/images/Avatar.png"
                        },
                        startTimestamp: 1634948072,
                        endTimestamp: 1635034472,
                    },
                    {
                        id: 3,
                        title: "HSE remarks",
                        speaker: {
                            name: "Bede Nwamuo",
                            thumbnailUrl: "/images/Avatar.png"
                        },
                        startTimestamp: 1634948072,
                        endTimestamp: 1635034472,
                    },
                    {
                        id: 4,
                        title: "Breaking of kolanut",
                        speaker: {
                            name: "Jide Ofor",
                            thumbnailUrl: "/images/Avatar.png"
                        },
                        startTimestamp: 1634948072,
                        endTimestamp: 1635034472,
                    },
                    {
                        id: 5,
                        title: "Closing prayer",
                        speaker: {
                            name: "Pastor Adebayo",
                            thumbnailUrl: "/images/Avatar.png"
                        },
                        startTimestamp: 1634948072,
                        endTimestamp: 1635034472,
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