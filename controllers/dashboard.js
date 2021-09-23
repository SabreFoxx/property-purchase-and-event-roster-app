const fetchDashboard = (req, res) => {
    res.status(200)
        .json({
            data: {
                timestamp: 0400,
                agenda: [
                    {
                        id: 1,
                        title: "Opening prayer",
                        speaker: "Jide Ofor",
                        startTimestamp: 1634948072,
                        endTimestamp: 1635034472,
                        thumbnailUrl: "/images/Avatar.png"
                    },
                    {
                        id: 2,
                        title: "National anthem",
                        speaker: "Goodluck Jonathan",
                        startTimestamp: 1634948072,
                        endTimestamp: 1635034472,
                        thumbnailUrl: "/images/Avatar.png"
                    },
                    {
                        id: 3,
                        title: "HSE remarks",
                        speaker: "Bede Nwamuo",
                        startTimestamp: 1634948072,
                        endTimestamp: 1635034472,
                        thumbnailUrl: "/images/Avatar.png"
                    },
                    {
                        id: 4,
                        title: "Breaking of kolanut",
                        speaker: "Jide Ofor",
                        startTimestamp: 1634948072,
                        endTimestamp: 1635034472,
                        thumbnailUrl: "/images/Avatar.png"
                    },
                    {
                        id: 5,
                        title: "Opening prayer",
                        speaker: "Jide Ofor",
                        startTimestamp: 1634948072,
                        endTimestamp: 1635034472,
                        thumbnailUrl: "/images/Avatar.png"
                    },
                ]
            },
            message: "Ok"
        })
}

export { fetchDashboard }