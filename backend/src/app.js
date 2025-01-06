import express from "express";
import cors from "cors";
// import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
const app = express();

// Configuring CORS
app.use(cors({
    origin: "*", 
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true // Allow cookies
}));

app.use(express.json({
    limit: "20kb"
}));


app.use(bodyParser.json());

// When recieving data through URL, url encodes data in different format, so while receiving it, we need to tell app, the it is url encoded
// app.use(express.urlencoded({
//     extended: true,
//     limit: "20kb" 
// }));


app.get("/", (req, res) => {
    res
    .send("Working fine");
});


// ------------ Routes -----------------

export default app;