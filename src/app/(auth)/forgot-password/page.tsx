"use client";
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase";
import { Snackbar, Alert } from "@mui/material";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage(
        "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi."
      );
      setOpenSnackbar(true);
    } catch (error: any) {
      let message = "Bilinmeyen bir hata oluştu.";
      if (error.code) {
        switch (error.code) {
          case "auth/user-not-found":
            message = "Bu e-posta adresine ait kullanıcı bulunamadı.";
            break;
          case "auth/invalid-email":
            message = "Geçerli bir e-posta adresi giriniz.";
            break;
          default:
            message = "Hata: " + error.message;
        }
      }
      setErrorMessage(message);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className="forgot-password">
      <div className="forgot-password__container">
        <h2 className="forgot-password__title">Şifremi Unuttum</h2>
        <form className="forgot-password__form" onSubmit={handleResetPassword}>
          <input
            type="email"
            name="email"
            placeholder="E-posta adresinizi giriniz"
            className="forgot-password__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="forgot-password__button">
            Şifre Sıfırlama Bağlantısı Gönder
          </button>
        </form>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={errorMessage ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {errorMessage || successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ForgotPasswordPage;
