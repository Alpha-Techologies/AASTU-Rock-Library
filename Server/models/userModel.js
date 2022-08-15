const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required:[true,'Please provide a First Name']
  },
  lastName: {
    type: String,
    required:[true,'Please provide a Last Name']

  },
  email: {
    type: String,
    unique:true,
    required:[true,'Please provide an   Email'],
    validate:[validator.isEmail,'Invalid Email format']
  },
  password: {
    type: String,
    validate:[validator.isAlphanumeric],
    minlength: 8,
    maxlength: 100,
    required:[true,'Please provide a Password'],
    select:false,
  },
  passwordConfirm: {
    type: String,
    required:[true,'Please provide a Password'],
    select:false,
    validate:{
      validator: function(val){
      return this.password === val
      },
      message:'Passwords that you entered donot match'
    }
  },
  passwordChangedAt: 
  {
    type: Date
  },
  photo:
  {type: String,
  default:"defaultImage.png" },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  role:{
    type:String,
    default: "editor",
    enum:['admin','editor']
  },
  notificationCount:{
    type:Number
  },
  messageCount:{
    type:Number
  },
  totalEdit:{
    type:Number
  }
});

userSchema.pre("save", function (next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
  if (this.passwordChangedAt){
    console.log(this.passwordChangedAt, JWTTimestamp)
  }
  return false;
}

const User = new mongoose.model("User", userSchema);

module.exports = User;
