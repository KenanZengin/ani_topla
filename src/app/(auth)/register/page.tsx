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
import { getRandomToken, sendLoginToBackend } from "@/utils";
import { useAppContext } from "@/components/context";

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthToken, setGlobalSnackbar } = useAppContext();
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
      const idToken = await signUpWithEmail(email, password);
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
          <h2 className="auth__title">Kaydol</h2>
          <form className="auth__form" onSubmit={handleSubmit}>
            <input
              name="fullname"
              type="text"
              placeholder="Tam Ad"
              className="auth__input"
              required
            />
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

            <div className="auth__agreement">
              <input
                type="checkbox"
                id="agreement"
                className="auth__checkbox"
                required
              />
              <label htmlFor="agreement" style={{ marginLeft: "8px" }}>
                <a href="#" className="auth__link">
                  Kullanıcı Sözleşmesini
                </a>{" "}
                ve
                <a href="#" className="auth__link">
                  {" "}
                  Kişisel Veriler
                </a>{" "}
                Hakkındaki Protokolü okudum, kabul ediyorum
              </label>
            </div>

            <button
              type="submit"
              className="auth__button"
              disabled={loading}
              style={{ opacity: loading ? "0.7" : "1" }}
            >
              Kaydol
            </button>

            <button
              type="button"
              className="auth__google-button"
              onClick={handleGoogleSignUp}
              disabled={loading}
              style={{ opacity: loading ? "0.7" : "1" }}
            >
              <Image src={"/google.png"} alt="google" width={24} height={24} />
              Google ile Kaydol
            </button>
          </form>
        </div>

        <div className="auth__right">
          <div className="auth__brand">
            <Image src={Logo} alt="logo" width={200} height={200} />
          </div>
          <p className="auth__no-account">Zaten bir hesabın var mı?</p>
          <Link href="/login" className="auth__register-button">
            Giriş Yap
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
