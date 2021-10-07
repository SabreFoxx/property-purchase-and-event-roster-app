import models from '../models/index.js';

export const fetchProperty = (req, res) => {
    models.PropertyCategory.findAll({ include: models.Property })
        .then(properties => {
            res.status(200)
                .json({ data: properties, message: "Success" })
        });
    return;

    res.status(200)
        .json({
            data: [
                {
                    categoryName: "Detached Plots",
                    description: "This plot of land is situated at the heart of GVE."
                        + "It features a very comfortable view and fresh wind.",
                    plots: [
                        {
                            id: 1,
                            size: 600,
                            price: 400000,
                            unit: "sqm",
                            plotId: "Plot 567",
                            thumbnailUrl: "/images/land.jpeg"
                        },
                        {
                            id: 2,
                            size: 600,
                            price: 500000,
                            unit: "sqm",
                            plotId: "Plot 568",
                            thumbnailUrl: "/images/land.jpeg"
                        },
                        {
                            id: 3,
                            size: 600,
                            price: 457300,
                            unit: "sqm",
                            plotId: "Plot 569",
                            thumbnailUrl: "/images/land.jpeg"
                        },
                    ]
                },
                {
                    categoryName: "Terrace",
                    description: "This plot of land is situated at the heart of GVE."
                        + "It features a very comfortable view and fresh wind.",
                    plots: [
                        {
                            id: 4,
                            size: 1200,
                            price: 566000,
                            unit: "sqm",
                            plotId: "Plot 570",
                            thumbnailUrl: "/images/land.jpeg"
                        },
                        {
                            id: 5,
                            size: 1200,
                            price: 880000,
                            unit: "sqm",
                            plotId: "Plot 571",
                            thumbnailUrl: "/images/land.jpeg"
                        },
                        {
                            id: 6,
                            size: 600,
                            price: 354800,
                            unit: "sqm",
                            plotId: "Plot 572",
                            thumbnailUrl: "/images/land.jpeg"
                        },
                        {
                            id: 10,
                            size: 600,
                            price: 872000,
                            unit: "sqm",
                            plotId: "Plot 573",
                            thumbnailUrl: "/images/land.jpeg"
                        },
                        {
                            id: 11,
                            size: 600,
                            price: 3400000,
                            unit: "sqm",
                            plotId: "Plot 574",
                            thumbnailUrl: "/images/land.jpeg"
                        },
                        {
                            id: 12,
                            size: 600,
                            price: 6433000,
                            unit: "sqm",
                            plotId: "Plot 575",
                            thumbnailUrl: "/images/land.jpeg"
                        },
                    ]
                },
                {
                    categoryName: "Luxury",
                    description: "This plot of land is situated at the heart of GVE."
                        + "It features a very comfortable view and fresh wind.",
                    plots: [
                        {
                            id: 7,
                            size: 600,
                            price: 200000000,
                            unit: "sqm",
                            plotId: "Plot 576",
                            thumbnailUrl: "/images/land.jpeg"
                        },
                        {
                            id: 8,
                            size: 600,
                            price: 450000000,
                            unit: "sqm",
                            plotId: "Plot 577",
                            thumbnailUrl: "/images/land.jpeg"
                        },
                        {
                            id: 9,
                            size: 600,
                            price: 76400000,
                            unit: "sqm",
                            plotId: "Plot 578",
                            thumbnailUrl: "/images/land.jpeg"
                        },
                        {
                            id: 10,
                            size: 600,
                            price: 58430000,
                            unit: "sqm",
                            plotId: "Plot 579",
                            thumbnailUrl: "/images/land.jpeg"
                        },
                    ]
                }
            ],
            message: "Success"
        });
}

export const addProperty = (req, res) => {
    models.Property.create({
        plotId: req.body.plotId,
        size: req.body.size,
        unit: req.body.unit,
        price: req.body.price,
        thumbnailUrl: req.body.thumbnailUrl,
        PropertyCategoryId: req.body.category
    }).then(property => {
        res.status(201)
            .json({
                data: property,
                message: "Property added successfully"
            })
    }).catch(() => {
        res.status(400)
            .json({
                message: "Property inclusion failed"
            })
    });
}

export const addPropertyCategory = (req, res) => {
    models.PropertyCategory.create({
        categoryName: req.body.categoryName,
        description: req.body.description
    }).then(category => {
        res.status(201)
            .json({
                data: category,
                message: "Category created successfully"
            })
    }).catch(() => {
        res.status(400)
            .json({
                message: "Category creation failed"
            })
    });
}