"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../../firebase";
import Logo from "../../../../public/Logo.png";
import { Snackbar, Alert } from "@mui/material";
import { getRandomToken, sendLoginToBackend } from "@/utils";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/components/context";

const LoginPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const {setAuthToken} = useAppContext();

  const signInWithEmail = async (
    email: string,
    password: string
  ): Promise<string> => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const idToken = await user.getIdToken();
    return idToken;
  };

  const provider = new GoogleAuthProvider();

  const signInWithGoogle = async (): Promise<string> => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const idToken = await user.getIdToken();
    return idToken;
  };

  const handleGoogleLogin = async (): Promise<void> => {
    setLoading(true);
    try {
      const idToken = await signInWithGoogle();
      const randomToken = await getRandomToken(); 
      if(randomToken){
        const user_token = await sendLoginToBackend(idToken, randomToken);
        if(!user_token){
          setErrorMessage("Giriş İşlemi başarısız daha sonra tekrar deneyin.");
          setOpenSnackbar(true);
          return
        }
        setAuthToken(user_token)
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
      const idToken = await signInWithEmail(email, password);
      const randomToken = await getRandomToken(); 
      if(randomToken){
        const user_token= await sendLoginToBackend(idToken, randomToken);
        if(!user_token){
          setErrorMessage("Giriş İşlemi başarısız daha sonra tekrar deneyin.");
          setOpenSnackbar(true);
          return
        }
        setAuthToken(user_token)
        
      }
      console.log("randomToken", randomToken);
    } catch (err: any) {
      let message = "Bilinmeyen bir hata oluştu.";
      console.log("err.code",err.code);
      
      if (err.code) {
        switch (err.code) {
          case "auth/user-not-found":
            message = "Böyle bir kullanıcı bulunamadı.";
            break;
          case "auth/invalid-credential":
            message = "Kullanıcı bilgileri hatalı. Lütfen tekrar deneyin.";
            break;
          case "auth/invalid-email":
            message = "Geçerli bir e-posta adresi giriniz.";
            break;
          case "auth/missing-password":
            message = "Lütfen bir şifre giriniz.";
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
    <div className="login">
      <div className="login__container">
        <div className="login__left">
          <h2 className="login__title">Giriş Yap</h2>
          <form className="login__form" onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder="E-posta"
              className="login__input"
              required
            />
            <div className="login__password-wrapper">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Şifre"
                className="login__input"
                required
              />
              <span
                className="login__eye-icon"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            <div className="login__forgot">
              Şifreni mi{" "}
              <Link href={"forgot-password"} className="login__link">
                unuttun?
              </Link>
            </div>
            <button
              type="submit"
              className="login__button"
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              Giriş Yap
            </button>
            <button
              type="button"
              className="login__google-button"
              onClick={handleGoogleLogin}
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                className="login__google-icon"
              />
              Google ile Giriş Yap
            </button>
          </form>
        </div>

        <div className="login__right">
          <div className="login__brand">
            <Image src={Logo} alt="logo" width={200} height={200} />
          </div>
          <p className="login__no-account">Hesabın yok mu?</p>
          <Link href="/register" className="login__register-button">
            Kayıt Ol
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

export default LoginPage;
