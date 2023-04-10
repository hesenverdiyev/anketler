import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from 'validator';

const { Schema} = mongoose;

const freeEmailProviders = [
'edu.tr',
'gmail.com',
'googlemail.com',
'outlook.com',
'hotmail.com',
'live.com',
'msn.com',
'hotmail.de',
'windowslive.com',
'aol.com',
'aim.com',
'protonmail.com',
'protonmail.ch',
'zoho.com',
'zohomail.com',
'icloud.com',
'me.com',
'mac.com',
'yahoo.com',
'ymail.com',
'rocketmail.com',
'gmx.com',
'gmx.us',
'mail.ru',
'inbox.ru',
'list.ru',
'bk.ru',
'yandex.com',
'yandex.com.tr',
'mail.com',
'email.com',
'tutanota.com',
'tutanota.de',
'tutamail.com',
'web.de',
't-online.de',
'1und1.de'
];

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
        validate: [
          {
            validator: validator.isEmail,
            message: "Geçerli bir email giriniz",
          },
          {
            validator: (value) => {
              const domain = value.split("@")[1];
              return freeEmailProviders.includes(domain);
            },
            message: "Geçerli bir email giriniz (Örnek: Gmail, Outlook vs.",
          },
        ],
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