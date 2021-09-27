const fetchDashboard = (req, res) => {
    res.status(200)
        .json({
            data: {
                timestamp: 1634982749,
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
        })
}

const setEventCountdown = (req, res) => { }

export { fetchDashboard, setEventCountdown }