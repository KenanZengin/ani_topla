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
import { useAppContext } from "@/components/context";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthToken,setGlobalSnackbar } = useAppContext();

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
      if (randomToken) {
        const user_token = await sendLoginToBackend(idToken, randomToken);
        if (!user_token) {
          setGlobalSnackbar({
            state: true,
            mess: "Giriş İşlemi başarısız daha sonra tekrar deneyin.",
            mode: "error",
          });
          return;
        }
        setAuthToken(user_token);
        setTimeout(() => {
          setGlobalSnackbar({
            state: true,
            mess: "Giriş başarılı. Hoş geldiniz!",
            mode: "success",
          });
        }, 1000);
      }
    } catch (error: any) {
      setGlobalSnackbar({
        state: true,
        mess: "Giriş İşlemi başarısız daha sonra tekrar deneyin.",
        mode: "error",
      });
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
      if (randomToken) {
        const user_token = await sendLoginToBackend(idToken, randomToken);
        if (!user_token) {
          setGlobalSnackbar({
            state: true,
            mess: "Giriş İşlemi başarısız daha sonra tekrar deneyin.",
            mode: "error",
          });
          return;
        }
        setAuthToken(user_token);
        setTimeout(() => {
          setGlobalSnackbar({
            state: true,
            mess: "Giriş başarılı. Hoş geldiniz!",
            mode: "success",
          });
        }, 1000);
      }
      console.log("randomToken", randomToken);
    } catch (err: any) {
      let message = "Bilinmeyen bir hata oluştu.";
      console.log("err.code", err.code);

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
      setGlobalSnackbar({
        state: true,
        mess: message,
        mode: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__left">
          <h2 className="auth__title">Giriş Yap</h2>
          <form className="auth__form" onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder="E-posta"
              className="auth__input"
              required
            />
            <div className="auth__password-wrapper">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Şifre"
                className="auth__input"
                required
              />
              <span
                className="auth__eye-icon"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            <div className="auth__forgot">
              Şifreni mi{" "}
              <Link href={"forgot-password"} className="auth__link">
                unuttun?
              </Link>
            </div>
            <button
              type="submit"
              className="auth__button"
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              Giriş Yap
            </button>
            <button
              type="button"
              className="auth__google-button"
              onClick={handleGoogleLogin}
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                className="auth__google-icon"
              />
              Google ile Giriş Yap
            </button>
          </form>
        </div>

        <div className="auth__right">
          <div className="auth__brand">
            <Image src={Logo} alt="logo" width={200} height={200} />
          </div>
          <p className="auth__no-account">Hesabın yok mu?</p>
          <Link href="/register" className="auth__register-button">
            Kayıt Ol
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
