import express from "express";
import * as pageController from "../controllers/pageController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(pageController.getIndexPage);
router.route("/about").get(pageController.getAboutPage);
// router.route("/secim-anketi").get(authMiddleware.authenticateToken, pageController.getSecimAnketiPage);
router.route("/anket-sonuclari").get(authMiddleware.authenticateToken, pageController.getAnketSonuclariPage);
router.route("/illere-gore-sonuclar").get(authMiddleware.authenticateToken, pageController.getIllereGoreSonuclarPage);
router.route("/il-anket-sonucu").get(authMiddleware.authenticateToken, pageController.getIlAnketSonucuPage);
router.route("/register").get(pageController.getRegisterPage);
router.route("/login").get(pageController.getLoginPage);
router.route("/logout").get(pageController.getLogout);
router.route("/contact").get(pageController.getContactPage);
router.route("/resetpassword").get(pageController.getResetPasswordPage);
router.route("/contact").post(pageController.sendMail);

export default router;