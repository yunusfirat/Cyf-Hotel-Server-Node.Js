import { createRequire } from "module";
const require = createRequire(import.meta.url);
const bookings = require("../data/data.cjs")
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');
const validator = require("email-validator");


export const search = (req, res) => {
    let term = req.query.term;
    let date = req.query.date;
    if (date) {
        const datefound = bookings.some(booking => booking.checkindate.toLowerCase().includes(date)
            || booking.checkoutdate.toLowerCase().includes(date))
        if (datefound) {
            res.status(200).json(bookings.filter(booking => booking.checkindate.toLowerCase().includes(date)
                || booking.checkoutdate.toLowerCase().includes(date)))
        } else {
            res.status(400).json({ msg: `No booking with the date of ${date}` });
        }
    }

    if (term) {
        const termfound = bookings.some((booking) => booking.firstname.toLowerCase().includes(term)
            || booking.surname.toLocaleLowerCase().includes(term)
            || booking.email.toLocaleLowerCase().includes(term))
        if (termfound) {
            res.json(bookings.filter(booking => booking.firstname.toLowerCase().includes(term)
            || booking.surname.toLowerCase().includes(term)
            || booking.email.toLowerCase().includes(term)))
        } else {
            res.status(400).json({ msg: `No booking with the term of ${term}` });
        }
    }
}

export const post = (req, res) => {
    const num = uuidv4();
    let checkindate = req.body.checkindate
    let checkoutdate = req.body.checkoutdate
    const newBoking = {
        id: num,
        roomid: req.body.roomid,
        title: req.body.title,
        firstname: req.body.firstname,
        surname: req.body.surname,
        email: req.body.email,
        checkindate: checkindate,
        checkoutdate: checkoutdate,
    };
    let a = moment(checkoutdate);
    let b = moment(checkindate);
    let days = a.diff(b, "days")
    if (days < 1) {
        return res.status(400).json({ msg: "checkoutDate is not after checkinDate" });
    } else if (!newBoking.roomid || !newBoking.firstname
        || !newBoking.surname
        || !newBoking.email
        || !newBoking.checkindate
        || !newBoking.checkoutdate) {
        return res.status(400).json({ msg: "please make sure that you have all field" });
    } else if (!validator.validate(newBoking.email)) {
        return res.status(400).json({ msg: "check your email if that is in correct format" });
    }
    bookings.push(newBoking);
    res.status(200).json(newBoking);
};

export const remove = (req, res) => {
    let temp;
    for (let i = 0; i < bookings.length; i++) {
        if (bookings[i].id === req.params.id) {
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
        res.status(400).json({ msg: `No booking with the Id of ${req.params.id}` });
    }
};

export const allbookings = (req, res) => {
    if (bookings.length >= 0) {
        res.status(200).json(bookings);
    } else {
        res.status(404);
    }
};

