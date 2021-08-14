const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  phone: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }
},
{ timestamps: true }
);

// Encrypt the password before Saving it
UserSchema .pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
  next();
});
 
// Static method to Login User
UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if(user) {
    const auth = await bcrypt.compare(password, user.password);

    if(auth) {
      return user
    }

    throw Error('Incorrect password');
  }
  throw Error('Enter a registered Email');
};
User = mongoose.model("user", UserSchema);
module.exports = User;