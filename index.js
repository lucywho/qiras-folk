const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./db.js");

const cookieSession = require("cookie-session");
//const csurf = require("csurf"); //might need later?

const { hash, compare } = require("./bc.js");

//_____MIDDLEWARE______
app.use(compression());

app.use(
    cookieSession({
        secret: "It'll be fiiiine",
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

app.use(express.static("public"));

app.use(express.json());

app.use(
    express.urlencoded({
        extended: false
    })
);

//app.use(csurf()); //might need later

app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "deny");
    //     res.locals.csrfToken = req.csrfToken();
    next();
});

//_____ROUTES_______

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    console.log("post register running");
    console.log("req.body", req.body);
    const first_name = req.body.first;
    const last_name = req.body.last;
    const email = req.body.email;
    const password = req.body.password;
    let user_id;

    if (!first_name || !last_name || !email || !password) {
        console.log("register: missing inputs");
        res.json({ success: false });
        return;
    }

    hash(password).then(hashpass => {
        console.log("hashpass worked", hashpass);
        db.addUser(first_name, last_name, email, hashpass)
            .then(results => {
                console.log("registration post worked");
                user_id = results.rows[0].id;
                req.session.userId = user_id;
                console.log("req.session.userId", req.session.userId);
                res.json({ success: true });
            })
            .catch(err => {
                console.log("err in addUser: ", err);
            });
        return;
    });
});

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

//_________SERVER LISTENING_______
app.listen(8080, function() {
    console.log("social network server running");
});
