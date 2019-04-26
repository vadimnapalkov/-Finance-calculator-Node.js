const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../controllers/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "user[name]",
      passwordField: "user[pass]"
    },
    (name, password, done) => {
      User.getByName(name, user => {
        if (user.length == 0) {
          return done(null, false);
        }
        User.validatePassword(
          password,
          user[0].dataValues.hash,
          user[0].dataValues.salt,
          (err, validate) => {
            if (err) console.log(err);
            if (!validate) {
              return done(null, false);
            }
            return done(null, user[0].dataValues);
          }
        );
      });
    }
  )
);
