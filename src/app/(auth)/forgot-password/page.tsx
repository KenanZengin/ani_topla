"use client";
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase";
import { Snackbar, Alert } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../../public/Logo.png";
import { useAppContext } from "@/components/context";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {setGlobalSnackbar} = useAppContext();

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
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
      setGlobalSnackbar({
        state: true,
        mess: message,
        mode: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setErrorMessage("");
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__left">
          <h2 className="auth__title">Şifremi Unuttum</h2>

          <form className="auth__form" onSubmit={handleResetPassword}>
            <input
              type="email"
              name="email"
              placeholder="E-posta adresinizi giriniz"
              className="auth__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              className="auth__button"
              disabled={!email.trim()}
            >
              Şifre Sıfırlama Bağlantısı Gönder
            </button>
          </form>
        </div>

        <div className="auth__right">
          <div className="auth__brand">
            <Image src={Logo} alt="logo" width={200} height={200} />
          </div>
          <p className="auth__no-account">Hesabın var mı?</p>
          <Link href="/login" className="auth__register-button">
            Giriş Yap
          </Link>
        </div>
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
          {errorMessage
            ? errorMessage
            : "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi."}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ForgotPasswordPage;
