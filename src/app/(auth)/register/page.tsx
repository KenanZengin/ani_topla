"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../../firebase";
import Logo from "../../../../public/Logo.png";
import { Snackbar, Alert } from "@mui/material";
import { getRandomToken, sendLoginToBackend } from "@/utils";
import { useRouter } from "next/navigation";

const RegisterPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const signUpWithEmail = async (
    email: string,
    password: string
  ): Promise<string> => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const idToken = await user.getIdToken();
    return idToken;
  };

  const provider = new GoogleAuthProvider();

  const signUpWithGoogle = async (): Promise<string> => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const idToken = await user.getIdToken();
    return idToken;
  };

  const handleGoogleSignUp = async (): Promise<void> => {
    setLoading(true);
    try {
      const idToken = await signUpWithGoogle();
      const randomToken = await getRandomToken();
      if (randomToken) {
        const sendBack = sendLoginToBackend(idToken, randomToken);
        if (!sendBack) {
          setErrorMessage("Giriş İşlemi başarısız daha sonra tekrar deneyin.");
          setOpenSnackbar(true);
          return
        }
        router.push("/dashboard");
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    setLoading(true);
    e.preventDefault();
    const email = (e.currentTarget.email as HTMLInputElement).value;
    const password = (e.currentTarget.password as HTMLInputElement).value;

    try {
      const idToken = await signUpWithEmail(email, password);
      const randomToken = await getRandomToken();
      if (randomToken) {
        const sendBack = sendLoginToBackend(idToken, randomToken);
        if (!sendBack) {
          setErrorMessage("Giriş İşlemi başarısız daha sonra tekrar deneyin.");
          setOpenSnackbar(true);
          return
        }
        router.push("/dashboard");
      }
    } catch (err: any) {
      let message = "Bilinmeyen bir hata oluştu.";
      if (err.code) {
        switch (err.code) {
          case "auth/email-already-in-use":
            message = "Bu e-posta adresi zaten kullanılıyor.";
            break;
          case "auth/invalid-email":
            message = "Geçerli bir e-posta adresi giriniz.";
            break;
          case "auth/weak-password":
            message =
              "Şifreniz çok zayıf. Lütfen daha güçlü bir şifre belirleyin (en az 6 karakter).";
            break;
          case "auth/missing-password":
            message = "Lütfen bir şifre giriniz.";
            break;
          case "auth/missing-email":
            message = "Lütfen bir e-posta adresi giriniz.";
            break;
          default:
            message = "Bir hata oluştu: " + err.message;
        }
      }
      setErrorMessage(message);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="register">
      <div className="register__container">
        <div className="register__left">
          <h2 className="register__title">Kaydol</h2>
          <form className="register__form" onSubmit={handleSubmit}>
            <input
              name="fullname"
              type="text"
              placeholder="Tam Ad"
              className="register__input"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="E-posta"
              className="register__input"
              required
            />
            <div className="register__password-wrapper">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Şifre"
                className="register__input"
                required
              />
              <span
                className="register__eye-icon"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            <div className="register__agreement">
              <input
                type="checkbox"
                id="agreement"
                className="register__checkbox"
                required
              />
              <label htmlFor="agreement">
                <a href="#" className="register__link">
                  Kullanıcı Sözleşmesini
                </a>{" "}
                ve
                <a href="#" className="register__link">
                  {" "}
                  Kişisel Veriler
                </a>{" "}
                Hakkındaki Protokolü okudum, kabul ediyorum
              </label>
            </div>
            <button
              type="submit"
              className="register__button"
              disabled={loading}
              style={{ opacity: loading ? "0.7" : "1" }}
            >
              Kaydol
            </button>
            <button
              type="button"
              className="register__google-button"
              onClick={handleGoogleSignUp}
              disabled={loading}
              style={{ opacity: loading ? "0.7" : "1" }}
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                className="register__google-icon"
              />
              Google ile Kaydol
            </button>
          </form>
        </div>

        <div className="register__right">
          <div className="register__brand">
            <Image src={Logo} alt="logo" width={200} height={200} />
          </div>
          <p className="register__have-account">Zaten bir hesabın var mı?</p>
          <Link href="/login" className="register__login-button">
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
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RegisterPage;
