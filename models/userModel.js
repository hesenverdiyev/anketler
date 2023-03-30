import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from 'validator';

const { Schema} = mongoose;

const userSchema = new Schema(
    {
      cityfrom: {
        type: String,
        required: false,
        validate: {
          validator: (value) => validator.isAlpha(value, 'en-US', {ignore: ' ,'}),
          message: 'City name can only contain letters, spaces, and commas'
        }
      },
      email: {
        type: String,
        required: [true, "Email alanı gerekli"],
        unique: true,
        validate: [validator.isEmail, "Geçerli bir email giriniz"]
      },
      password: {
        type: String,
        required: [true, "Şifre alanı gerekli"],
        validate: [
          function (value) {
            return validator.isLength(value, { min: 4 });
          },
          "En az 4 karakter giriniz"
        ]
      },
      followingCandidate: {
        type: [String],
        validate: [
          function (value) {
            return value.length <= 1;
          },
          "Sadece bir defa oy kullanabilirsiniz"
        ]
      },
      followingPolls: {
        type: [String],
        default: []
      }
    },
    {
      timestamps: true
    }
  );
  


userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email });
  };
  
userSchema.methods.changePassword = async function(newPassword) {
    this.password = await newPassword;
    await this.save();
  };

  userSchema.pre('save', async function(next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
  });

const User = mongoose.model("User", userSchema);

export default User;