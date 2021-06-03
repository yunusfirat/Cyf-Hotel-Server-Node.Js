import express from "express"
import cors from "cors"
import hotel from "./routes/hotel.js"

const app = express();
const PORT = process.env.PORT || 5000;
// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());


app.use("/", hotel)






app.listen(PORT, () => console.log(`Server started on port ${PORT}`));