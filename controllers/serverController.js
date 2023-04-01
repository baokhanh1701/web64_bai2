const inventoriesModel = require("../models/inventories.schema");
const ordersModel = require("../models/orders.schema");

const getAllInventories = (req, res) => {
    inventoriesModel.find({}).then((data) => {
        res.status(200).json({
            msg: "Get all successfully",
            data: data
        })
    }).catch(() => {
        res.status(500).json({
            msg: "Internal server error",
            data: null
        })
    });
}

const getLowInventories = (req, res) => {
    inventoriesModel.find({ instock: { $lt: 100 } }).then((data) => {
        res.status(200).json({
            msg: "Get all successfully",
            data: data
        })
    }).catch(() => {
        res.status(500).json({
            msg: "Internal server error",
            data: null
        })
    })
}

const getOrders = (req, res)=>{
    const {item} = req.query;
    ordersModel.find({item: item}).then((data)=>{
        res.status(200).json({
            msg: "Get all successfully",
            data: data
        })
    }).catch(()=>{
        res.status(500).json({
            msg: "Internal server error",
            data: null
        })
    })
}

module.exports = [getAllInventories, getLowInventories, getOrders];