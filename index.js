const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    origins: "localhost:8080 qiras-folk.herokuapp.com:*"
});
//space separate additional urls so that app can accept socket requests from where it is posted
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

// app.use(
//     cookieSession({
//         secret: "It'll be fiiiine",
//         maxAge: 1000 * 60 * 60 * 24 * 14
//     })
// );
//====allows socket to access session info===
const cookieSessionMiddleware = cookieSession({
    secret: `It'll be fiiiine.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

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
    if (req.session.userId && !resetPass) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    const first_name = req.body.first;
    const last_name = req.body.last;
    const email = req.body.email;
    const password = req.body.password;
    let user_id;

    if (!first_name || !last_name || !email || !password) {
        res.json({ success: false });
        return;
    }

    hash(password).then(hashpass => {
        db.addUser(first_name, last_name, email, hashpass)
            .then(results => {
                user_id = results.rows[0].id;
                req.session.userId = user_id;
                res.json({ success: true });
            })
            .catch(err => {
                console.log("err in addUser: ", err);
                res.json({ success: false });
            });
        return;
    });
}); //end of register route

app.post("/login", (req, res) => {
    const logemail = req.body.email;
    const logpassword = req.body.password;
    let user_id;

    if (!logemail || !logpassword) {
        res.json({ success: false });
        return;
    }

    db.getPassword(logemail).then(results => {
        let hashpass = results.rows[0].password;

        compare(logpassword, hashpass)
            .then(matchValue => {
                if (!matchValue) {
                    console.log("err in matchValue: ", err);
                    res.json({ success: false });
                    return;
                } else {
                    user_id = results.rows[0].id;
                    req.session.userId = user_id;
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
    const logemail = req.body.email;
    let email;
    let user_id;

    if (!logemail) {
        res.json({ success: false });
        return;
    }

    db.getPassword(logemail)
        .then(results => {
            user_id = results.rows[0].id;

            if (!user_id) {
                res.json({ success: false });
            } else {
                email = results.rows[0].email;

                // generate code
                const code = cryptoRandomString({
                    length: 6
                });

                //email user
                sendEmail(
                    email,
                    `The access code to reset your password is ${code}. This code will expire in 10 minutes.`
                );

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
    const incode = req.body.code;
    const password = req.body.password;
    const email = req.body.email;
    let code;

    db.checkCode()
        .then(results => {
            code = results.rows[0].code;
            if (code !== incode) {
                res.json({ success: false });
                return;
            } else {
                hash(password).then(hashpass => {
                    db.updateUser(hashpass, email)
                        .then(results => {
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
        let user_id = req.session.userId;

        let pic_url = config.s3Url + req.file.filename;

        if (!pic_url) {
            return;
        }

        db.archiveProfilePic(user_id, pic_url).then(results => {
            console.log("pic archive worked");
        });

        db.saveProfilePic(user_id, pic_url)
            .then(results => {
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

        bio = results.rows[0].bio;
        res.json({ bio: bio });
    } catch (err) {
        console.log("error in saveUserBio", err);
    }
}); //end of saveUserBio

app.get("/api/user/:id", async (req, res) => {
    let user_id = req.session.userId;
    let otherUserId = req.params.id;

    if (user_id == otherUserId) {
        res.json({ sameUser: true });
    } else {
        try {
            const results = await db.getOtherUser(otherUserId);

            if (!results.rows[0]) {
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
            console.log("error in api/user/:id", err);
        }
    }
}); // end of /user/:id route

app.get("/recentusers", async (req, res) => {
    try {
        const results = await db.getRecentUsers();

        const names = results.rows.filter(
            item => item.id !== req.session.userId
        );

        res.json(names);
    } catch (err) {
        console.log("error in getRecentUsers", err);
    }
}); //end of /recentusers route

app.get("/searchusers/:searchusers", async (req, res) => {
    let search = req.params.searchusers;
    try {
        const results = await db.getSearchUsers(search);

        search = results.rows.filter(item => item.id !== req.session.userId);

        res.json(search);
    } catch (err) {
        console.log("error in getSearchUsers", err);
    }
}); //end of /searchusers route

app.get("/friendstatus/:otherUserId", async (req, res) => {
    let receiverId = req.params.otherUserId;
    let senderId = req.session.userId;

    try {
        const results = await db.checkFriendship(senderId, receiverId);

        if (results.rows.length == 0) {
            res.json({ buttonText: "send friend request" });
        } else if (results.rows[0].accepted === true) {
            res.json({ buttonText: "unfriend" });
        } else {
            if (results.rows.sender_id !== req.session.userId) {
                res.json({ buttonText: "accept friend request" });
            } else {
                res.json({ buttonText: "cancel friend request" });
            }
        }
    } catch (err) {
        console.log("error in checkFriends", err);
    }
});

app.post("/updatefriendship/:otherUserId/:buttonText", (req, res) => {
    let buttonText = req.params.buttonText;
    let receiverId = req.params.otherUserId;
    let senderId = req.session.userId;

    if (buttonText == "send friend request") {
        db.makeFriendRequest(senderId, receiverId)
            .then(results => {
                res.json({ buttonText: "cancel friend request" });
            })
            .catch(err => {
                console.log("error in makeFriendRequest", err);
            });
    } else if (
        buttonText == "cancel friend request" ||
        buttonText == "unfriend"
    ) {
        db.cancelFriendship(senderId, receiverId)
            .then(results => {
                res.json({ buttonText: "send friend request" });
            })
            .catch(err => {
                console.log("error in cancelFriendship", err);
            });
    } else if (buttonText == "accept friend request") {
        //senderId is the other user in this case, logged in user is receiver of request
        db.confirmFriendship(receiverId, senderId)
            .then(results => {
                newFriendId = receiverId;

                res.json({
                    buttonText: "unfriend",
                    newFriendId
                });
            })
            .catch(err => {
                console.log("error in accept friendship", err);
            });
    }
});

app.get("/pendingfriends", async (req, res) => {
    let userId = req.session.userId;
    try {
        const results = await db.getFriends(userId);

        res.json({ allfriends: results.rows });
    } catch (err) {
        console.log("error in pendingfriends", err);
    }
});

app.post("/password/change/step1", (req, res) => {
    const current = req.body.current;
    let user_id = req.session.userId;

    if (!current) {
        res.json({ success: false });
        return;
    }

    db.checkPassword(user_id).then(results => {
        let hashpass = results.rows[0].password;

        compare(current, hashpass)
            .then(matchValue => {
                if (!matchValue) {
                    res.json({ success: false });
                    return;
                } else {
                    user_id = results.rows[0].id;
                    req.session.userId = user_id;
                    res.json({ success: true });
                }
            })
            .catch(err => {
                console.log("err in check pass compare: ", err);
                res.json({ success: false });
            });
        return;
    });
}); //end of change password step one

app.post("/password/change/step2", (req, res) => {
    const newpass = req.body.newpass;
    let user_id = req.session.userId;

    if (!newpass) {
        res.json({ success: false });
        return;
    }

    hash(newpass).then(hashpass => {
        db.changePassword(hashpass, user_id)
            .then(results => {
                res.json({ success: true });
            })
            .catch(err => {
                console.log("err in changepass 2: ", err);
                res.json({ success: false });
            });
    });
}); // end of change password step two

app.post("/deleteaccount", async (req, res) => {
    let userId = req.session.userId;

    try {
        const getPic = await db.getAllPics(userId);
        let delPics = getPic.rows;

        let picArray = [];

        let objects = delPics.map(item => {
            let object = {
                Key: item.pic_url
            };
            picArray.push(object);
        });

        picArray = picArray.map(item => {
            return {
                Key: item.Key.replace(
                    "http://lucy-msg-socialnet.s3.amazonaws.com/",
                    ""
                )
            };
        });

        s3.delete(picArray, function(err, data) {
            if (err) {
                console.log("index.js error in s3 delete: ", err, err.stack);
            }
        });

        Promise.all([
            db.deleteChat(userId),
            db.deleteFriend(userId),
            db.deleteProfpics(userId),
            db.deleteUser(userId)
        ]).then(() => {
            res.redirect("/logout");
        });
    } catch (err) {
        console.log("error in delete account", err);
    }
});

app.get("/logout", (req, res) => {
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
server.listen(process.env.PORT || 8080, function() {
    console.log("social network server running");
});

//________SOCKET CODE________________

io.on("connection", function(socket) {
    console.log(`socket with id ${socket.id} connected`);

    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    const userId = socket.request.session.userId;

    db.getLastTen()
        .then(data => {
            let lastTenChats = data.rows.reverse();
            io.sockets.emit("lastTenChats", lastTenChats);
        })
        .catch(err => {
            console.log("error in getLastTen", err);
        });

    socket.on("newChatMessage", newMsg => {
        db.addChat(userId, newMsg)

            .then(() => db.getLatest())
            .then(results => {
                let newChat = results.rows[0];
                io.sockets.emit("newChatMessage", newChat);
            })
            .catch(err => {
                console.log("error in addChat", err);
            });
    });
});
