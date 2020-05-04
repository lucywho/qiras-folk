const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnet"
);

module.exports.addUser = (first_name, last_name, email, hashpass) => {
    return db.query(
        `INSERT INTO users (first_name, last_name, email, password)
        VALUES($1, $2, $3, $4) RETURNING id`,
        [first_name, last_name, email, hashpass]
    );
};

module.exports.updateUser = (hashpass, email) => {
    return db.query(
        `UPDATE users 
        SET password = $1 
        WHERE email = $2`,
        [hashpass, email]
    );
};

module.exports.getPassword = logemail => {
    return db.query(`SELECT * FROM users where email = $1`, [logemail]);
};

module.exports.saveCode = (email, code) => {
    return db.query(`INSERT INTO reset_codes (email, code) VALUES ($1, $2)`, [
        email,
        code
    ]);
};

module.exports.checkCode = () => {
    return db.query(
        `SELECT code FROM reset_codes WHERE CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes'
        ORDER BY id DESC
        LIMIT 1;`
    );
};
