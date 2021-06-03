import { createRequire } from "module";
const require = createRequire(import.meta.url);
const bookings =require("../data/data.cjs")
const { v4: uuidv4 } = require("uuid");


export const post = (req, res) => {
    const num = uuidv4();
    const newID = req.body.id;
    const newBoking = {
        id: typeof newID === "number" ? newID : parseInt(num) || faker.datatype.number(),
        roomid: req.body.roomid,
        firstname: req.body.firstname,
        surname:req.body.surname,
        email:req.body.email,
        checkindate: req.body.checkindate,
        checkoutdate: req.body.checkoutdate,
    };
    if (!newBoking.roomid || !newBoking.firstname || !newBoking.surname || !newBoking.email || !newBoking.checkindate || !newBoking.checkoutdate) {
        return res.status(400).json({ msg: "please make sure that you have all field." });
    }
    bookings.push(newBoking);
    res.status(200).json(newBoking);
};

export const remove = (req, res) => {
    let temp;
    for (let i = 0; i < bookings.length; i++) {
        if (bookings[i].name === req.params.id) {
            temp = bookings[i];
            bookings.splice(i, 1);
        }
    }
    if (temp === undefined) {
        console.log(temp);
        res.status(404);
        res.send(`The item ${req.params.id} is not exist`);
    } else {
        res.status(200);
        res.send(`The item ${req.params.id} has been deleted`);
    }
};

export const bookingbyid = (req, res) => {
    const found = bookings.some((booking) => booking.id === req.params.id);
    if (found) {
        res.json(bookings.filter((booking) => booking.id === req.params.id));
    } else {
        res.status(400).json({ msg: `No member with the name of ${req.params.id}` });
    }
};

export const allbookings = (req, res) => {
    if (bookings.length >= 0) {
        res.status(200).json(bookings.map((booking) => booking.id));
    } else {
        res.status(404);
    }
};

export const search = (req, res) => {
    let term = req.query.term.toLowerCase();
    let date = req.query.date.toLowerCase();
    if(date){
        const datefound = bookings.some(booking => booking.checkindate.toLowerCase().includes(date)
        || booking.checkoutdate.toLowerCase().includes(date))
        if(datefound){
            res.status(200).json(bookings.filter(booking => booking.checkindate.toLowerCase().includes(date)
             ||  booking.checkoutdate.toLowerCase().includes(date)))
          }else {
            res.status(400).json({ msg: `No booking with the date of ${date}`});
          }
    }

    if(term){
        const termfound = bookings.some(booking =>  booking.firstname.toLowerCase().includes(term)
        || booking.surname.toLocaleLowerCase().includes(term))
        if(termfound){
            res.json(bookings.filter(booking => booking.firstname.toLowerCase().includes(term) ||  booking.surname.toLowerCase().includes(term)))
          }else {
            res.status(400).json({ msg: `No booking with the term of ${term}`});
          }
    }
  }