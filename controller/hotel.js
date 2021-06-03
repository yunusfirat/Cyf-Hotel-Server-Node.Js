import { createRequire } from "module";
const require = createRequire(import.meta.url);
const bookings =require("../data/data.js")
const { v4: uuidv4 } = require("uuid");





export const post = (req, res) => {
    const num = uuidv4();
    const newID = req.body.id;
    const newBoking = {
        id: typeof newID === "number" ? newID : parseInt(num) || faker.datatype.number(),
        name: req.body.name,
        members: req.body.members,
    };
    if (!newBoking.name || !newBoking.members) {
        return res.status(400).json({ msg: "please make sure that you have added name and members." });
    }
    Lists.push(newBoking);
    res.status(200).json(newBoking);
    // res.redirect("/");
};