const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./db.js");

const cookieSession = require("cookie-session");
const csurf = require("csurf");

const { hash, compare } = require("./bc.js");

const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("./ses");

const s3 = require("./s3");
const config = require("./config");

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

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "deny");
    next();
});

//==image upload boilerplate==//
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
//==end of boilerplate==

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
    //console.log("post register running");
    //console.log("req.body", req.body);
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
        //console.log("hashpass worked", hashpass);
        db.addUser(first_name, last_name, email, hashpass)
            .then(results => {
                //console.log("registration post worked");
                user_id = results.rows[0].id;
                req.session.userId = user_id;
                console.log("req.session.userId", req.session.userId);
                res.json({ success: true });
            })
            .catch(err => {
                console.log("err in addUser: ", err);
                //QUERY: how to catch specific error (i.e email already used) and return relevant error message?
                res.json({ success: false });
            });
        return;
    });
}); //end of register route

app.post("/login", (req, res) => {
    console.log("post login running");
    console.log("req.body", req.body);
    const logemail = req.body.email;
    const logpassword = req.body.password;
    let user_id;

    if (!logemail || !logpassword) {
        console.log("login: missing inputs");
        res.json({ success: false });
        return;
    }

    db.getPassword(logemail).then(results => {
        let hashpass = results.rows[0].password;
        console.log("get password results", hashpass);

        compare(logpassword, hashpass)
            .then(matchValue => {
                //console.log("matchValue login: ", matchValue);
                if (!matchValue) {
                    console.log("err in matchValue: ", err);
                    res.json({ success: false });
                    return;
                } else {
                    user_id = results.rows[0].id;
                    req.session.userId = user_id;
                    //console.log("login req.session.userId", req.session.userId);
                    res.json({ success: true });
                }
            }) //end of matchvalue
            .catch(err => {
                console.log("err in getPassword: ", err);
                res.json({ success: false });
            });
        return;
    });
}); //end of login route

app.post("/password/reset/step1", (req, res) => {
    console.log("post reset 1 running");
    //console.log("req.body", req.body);
    const logemail = req.body.email;
    let email;
    let user_id;

    if (!logemail) {
        console.log("reset: missing inputs");
        res.json({ success: false });
        return;
    }

    db.getPassword(logemail)
        .then(results => {
            user_id = results.rows[0].id;

            if (!user_id) {
                console.log("no user found");
                res.json({ success: false });
            } else {
                email = results.rows[0].email;

                // generate code
                const code = cryptoRandomString({
                    length: 6
                });
                console.log("secret code generated: ", code);

                //email user
                sendEmail(email, `Your reset code is ${code}`);

                //store code in reset_codes
                db.saveCode(email, code)
                    .then(results => {
                        res.json({ success: true, email: email });
                    })
                    .catch(err => {
                        console.log("err in saveCode: ", err);
                        res.json({ success: false });
                    });
            }
        })
        .catch(err => {
            console.log("err in getPassword: ", err);
            res.json({ success: false });
        });
}); //end of post step1

app.post("/password/reset/step2", (req, res) => {
    console.log("post reset 2 running");
    //console.log("req.body", req.body);

    const incode = req.body.code;
    const password = req.body.password;
    const email = req.body.email;
    let code;

    db.checkCode()
        .then(results => {
            //console.log("results checkcode", results.rows[0].code);
            code = results.rows[0].code;
            if (code !== incode) {
                console.log("codes don't match");
                res.json({ success: false });
                return;
            } else {
                //console.log("code matches");

                hash(password).then(hashpass => {
                    //console.log("hashpass worked", hashpass);

                    db.updateUser(hashpass, email)
                        .then(results => {
                            //console.log("password updated");
                            res.json({ success: true });
                        })
                        .catch(err => {
                            console.log("err in updateUser: ", err);
                            res.json({ success: false });
                        });
                });
            }
        })
        .catch(err => {
            console.log("err in matchValue: ", err);
            res.json({ success: false });
        })
        .catch(err => {
            console.log("err in checkCode: ", err);
            res.json({ success: false });
        });
}); //end of post step 2

app.get("/userinfo", (req, res) => {
    let user_id = req.session.userId;

    db.getUserInfo(user_id)
        .then(results => {
            //console.log("getuserinfo results", results.rows[0]);
            first = results.rows[0].first_name;
            last = results.rows[0].last_name;
            picUrl = results.rows[0].pic_url;
            bio = results.rows[0].bio;

            res.json({
                first: first,
                last: last,
                picUrl: picUrl,
                bio: bio
            });
        })
        .catch(err => {
            console.log("error in getUserInfo", err);
            res.json({ success: false });
        });
}); //end of getuserinfo

app.post(
    "/uploadProfilePic",
    uploader.single("file"),
    s3.upload,
    (req, res) => {
        //console.log("upload profpic req file", req.file);
        let user_id = req.session.userId;
        // console.log(
        //     "config.s3Url + req.file.filename",
        //     config.s3Url + req.file.filename
        // );
        let pic_url = config.s3Url + req.file.filename;

        if (!pic_url) {
            console.log("no file sent");
            return;
        }

        db.saveProfilePic(user_id, pic_url)
            .then(results => {
                console.log("upload profile pic results:", results.rows[0]);
                picUrl = results.rows[0].pic_url;
                res.json({ picUrl: picUrl });
            })
            .catch(err => {
                console.log("error in upload pic", err);
            });
    }
); //end upload pic

app.post("/saveUserBio", async (req, res) => {
    let user_id = req.session.userId;
    let bio = req.body.bio;

    try {
        const results = await db.saveUserBio(user_id, bio);
        //console.log("saveUserBio results", results.rows[0]);
        bio = results.rows[0].bio;
        res.json({ bio: bio });
    } catch (err) {
        console.log("error in saveUserBio", err);
    }
}); //end of saveUserBio

app.get("/api/user/:id", async (req, res) => {
    console.log("/api/user route hit");
    let user_id = req.session.userId;
    let otherUserId = req.params.id;
    //console.log("user_id and otherUserId", user_id, otherUserId);

    if (user_id == otherUserId) {
        console.log("same user caught");
        res.json({ sameUser: true });
    } else {
        try {
            const results = await db.getOtherUser(otherUserId);
            //console.log("getOtherUser results", results.rows[0]);
            if (!results.rows[0]) {
                console.log("user doesn't exist");
                res.json({ noUser: true });
            } else {
                const first = results.rows[0].first_name;
                const last = results.rows[0].last_name;
                const picUrl = results.rows[0].pic_url;
                const bio = results.rows[0].bio;
                res.json({
                    first: first,
                    last: last,
                    picUrl: picUrl,
                    bio: bio
                });
            }
        } catch (err) {
            console.log("error in api/user/:id");
        }
    }
}); // end of /user/:id route

app.get("/recentusers", async (req, res) => {
    console.log("/recentusers route hit");
    try {
        const results = await db.getRecentUsers();
        //console.log("getRecentUsers results", results.rows);
        //returns array of objects
        const names = results.rows;
        res.json(names);
    } catch (err) {
        console.log("error in getRecentUsers", err);
    }
}); //end of /recentusers route

app.get("/searchusers/:searchusers", async (req, res) => {
    console.log("/searchusers route hit");
    //console.log("req.params", req.params.searchusers);
    let search = req.params.searchusers;
    try {
        const results = await db.getSearchUsers(search);
        //console.log("getSearchUsers results", results.rows);
        search = results.rows;
        res.json(search);
    } catch (err) {
        console.log("error in getSearchUsers", err);
    }
}); //end of /searchusers route

app.get("/friendstatus/:otherUserId", async (req, res) => {
    console.log("/friend status route hit");
    let receiverId = req.params.otherUserId;
    let senderId = req.session.userId;
    console.log("receiver and sender", receiverId, senderId);
    try {
        const results = await db.checkFriendship(senderId, receiverId);
        console.log("check friendship results", results.rows);
        if (results.rows.length == 0) {
            res.json({ buttonText: "Send Friend Request" });
        } else if (results.rows[0].accepted === true) {
            res.json({ buttonText: "Unfriend" });
        } else {
            if (results.rows.sender_id !== req.session.userId) {
                res.json({ buttonText: "Accept Friend Request" });
            } else {
                res.json({ buttonText: "Cancel Friend Request" });
            }
        }
    } catch (err) {
        console.log("error in checkFriends", err);
    }
});

app.post("/updatefriendship/:otherUserId/:buttonText", (req, res) => {
    console.log("/updatefriendship route hit");
    let buttonText = req.params.buttonText;
    let receiverId = req.params.otherUserId;
    let senderId = req.session.userId;

    if (buttonText == "Send Friend Request") {
        db.makeFriendRequest(senderId, receiverId)
            .then(results => {
                console.log("pending id", results.rows[0]);
                res.json({ buttonText: "Cancel Friend Request" });
            })
            .catch(err => {
                console.log("error in makeFriendRequest", err);
            });
    } else if (
        buttonText == "Cancel Friend Request" ||
        buttonText == "Unfriend"
    ) {
        db.cancelFriendship(senderId, receiverId)
            .then(results => {
                console.log("cancel results", results.rows);
                res.json({ buttonText: "Send Friend Request" });
            })
            .catch(err => {
                console.log("error in cancelFriendship", err);
            });
    } else if (buttonText == "Accept Friend Request") {
        //senderId is the other user in this case, logged in user is receiver of request
        db.confirmFriendship(receiverId, senderId)
            .then(results => {
                console.log("confirm results", results.rows);
                res.json({ buttonText: "Unfriend" });
            })
            .catch(err => {
                console.log("error in cancelFriendship", err);
            });
    }
});

app.get("/logout", (req, res) => {
    console.log("logout");
    req.session = null;
    res.redirect("/");
    return;
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
