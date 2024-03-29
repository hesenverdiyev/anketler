import nodemailer from 'nodemailer';
import User from '../models/userModel.js';
import Candidate from '../models/candidateModel.js';
import Poll from '../models/pollModel.js';

const getIndexPage = async (req, res) => {
  let voted = false;
  const polls = await Poll.find({});

  if (res.locals.user) {
    const user = await User.findById(res.locals.user._id);
    voted = user && user.followingCandidate.length > 0;
  }

  res.render('index', {
    link: 'index',
    voted,
    polls
  });
};

const getSiteMapPage = (req, res) => {
  res.sendFile('/public/sitemap.xml');
};

const getAboutPage = (req, res) => {
  res.render('about', {
    link: 'about',
  });
};

const getPrivacyPolicyPage = (req, res) => {
  res.render('privacy-policy', {
    link: 'privacy-policy',
  });
};

const getTermsOfServicePage = (req, res) => {
  res.render('terms-of-service', {
    link: 'terms-of-service',
  });
};



// const getSecimAnketiPage = async (req, res) => {
//   const userId = res.locals.user._id;

//   const user = await User.findById(userId);
//   const voted = user.followingCandidate.length > 0;

//   res.render('secim-anketi', {
//     link: 'secim-anketi',
//     voted
//   });
// };


const getAnketSonuclariPage = async (req, res) => {
  const polls = await Poll.find({});
  await Candidate.find()
    .then(candidates => {
      candidates.sort((a, b) => b.followers.length - a.followers.length);
      res.render('anket-sonuclari', { candidates,
        polls,
        link: 'anket-sonuclari',
      });
    })
    .catch(err => console.log(err));
};

const getIllereGoreSonuclarPage = async (req, res) => {
  var cityName = req.query.cityName;
 await Candidate.find()
    .then(candidates => {
      candidates.sort((a, b) => b.followers.length - a.followers.length);
      res.render('illere-gore-sonuclar', { candidates, cityName,
        link: 'illere-gore-sonuclar',
      });
    })
    .catch(err => console.log(err));
};

const getIlAnketSonucuPage = async (req, res) => {
  const polls = await Poll.find({});
  var cityName = req.query.cityName;
 await Candidate.find()
    .then(candidates => {
      candidates.sort((a, b) => b.followers.length - a.followers.length);
      res.render('il-anket-sonucu', { candidates, cityName, polls,
        link: 'il-anket-sonucu',
      });
    })
    .catch(err => console.log(err));
};

const getRegisterPage = (req, res) => {
  if (res.locals.user) {
    return res.redirect('/');
  } else {
  res.render('register', {
    link: 'register',
  });}
};

const getLoginPage = (req, res) => {
  if (res.locals.user) {
    return res.redirect('/');
  } else{
  res.render('login', {
    link: 'login',
  })}
};

const getLogout = (req, res) => {
  res.cookie('jwt', '', {
    maxAge: 1,
  });
  res.redirect('/');
};

const getContactPage = (req, res) => {
  res.render('contact', {
    link: 'contact',
  });
};

const getResetPasswordPage = (req, res) => {
  res.render('resetpassword', {
    link: 'resetpassword',
  });
};

const sendMail = async (req, res) => {
  const htmlTemplate = `
  <!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Simple Transactional Email</title>
      <style>
        /* -------------------------------------
            GLOBAL RESETS
        ------------------------------------- */

        /*All the styling goes here*/

        img {
          border: none;
          -ms-interpolation-mode: bicubic;
          max-width: 100%;
        }

        body {
          background-color: #f6f6f6;
          font-family: sans-serif;
          -webkit-font-smoothing: antialiased;
          font-size: 14px;
          line-height: 1.4;
          margin: 0;
          padding: 0;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
        }

        table {
          border-collapse: separate;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          width: 100%; }
          table td {
            font-family: sans-serif;
            font-size: 14px;
            vertical-align: top;
        }

        /* -------------------------------------
            BODY & CONTAINER
        ------------------------------------- */

        .body {
          background-color: #f6f6f6;
          width: 100%;
        }

        /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
        .container {
          display: block;
          margin: 0 auto !important;
          /* makes it centered */
          max-width: 580px;
          padding: 10px;
          width: 580px;
        }

        /* This should also be a block element, so that it will fill 100% of the .container */
        .content {
          box-sizing: border-box;
          display: block;
          margin: 0 auto;
          max-width: 580px;
          padding: 10px;
        }

        /* -------------------------------------
            HEADER, FOOTER, MAIN
        ------------------------------------- */
        .main {
          background: #ffffff;
          border-radius: 3px;
          width: 100%;
        }

        .wrapper {
          box-sizing: border-box;
          padding: 20px;
        }

        .content-block {
          padding-bottom: 10px;
          padding-top: 10px;
        }


      </style>
    </head>
    <body>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
        <tr>
          <td>&nbsp;</td>
          <td class="container">
            <div class="content">

              <!-- START CENTERED WHITE CONTAINER -->
              <table role="presentation" class="main">

                <!-- START MAIN CONTENT AREA -->
                <tr>
                  <td class="wrapper">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <p>Email: ${req.body.email}</p>
                          <p>İsim: ${req.body.name}</p>
                          <p>Mesaj: ${req.body.message}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              <!-- END MAIN CONTENT AREA -->
              </table>
              <!-- END CENTERED WHITE CONTAINER -->


            </div>
          </td>
          <td>&nbsp;</td>
        </tr>
      </table>
    </body>
  </html>
  `;

  try {
     // create reusable transporter object using the default SMTP transport
     const transporter = nodemailer.createTransport({
       host: process.env.NODE_MAILHOST,
       port: 465,
       secure: true,
       auth: {
           user: process.env.NODE_MAIL,
           pass: process.env.NODE_PASS,
     },
   });

     // send mail with defined transport object
     await transporter.sendMail({
       from: `Anketler.info <${process.env.NODE_MAIL}>`,
       to: 'iletisim@anketler.info', // list of receivers
       subject: `İletişim formu ${req.body.email}`, // Subject line
       html: htmlTemplate, // html body
     });

    res.status(200).json({ succeeded: true });
  } catch (error) {
    res.status(500).json({
      succeeded: false,
      error,
    });
  }
};

export {
  getIndexPage,
  getAboutPage,
  getRegisterPage,
  getLoginPage,
  getLogout,
  getContactPage,
  getResetPasswordPage,
  sendMail,
  // getSecimAnketiPage,
  getAnketSonuclariPage,
  getIllereGoreSonuclarPage,
  getIlAnketSonucuPage,
  getPrivacyPolicyPage,
  getTermsOfServicePage,
  getSiteMapPage
};
