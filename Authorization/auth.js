const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("../Models/persons");
passport.use(
  new LocalStrategy(async (username, password, done) => {
    //Authentication
    try {
      //console.log("Received the credential : ", username, password);
      const user = await Person.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const isPassword = await user.comparePassword(password);
      if (isPassword) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (err) {
      return done(err);
    }
  }),
);

module.exports = passport;
