"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  Home,
  PhotoLibrary,
  Settings,
  ExitToApp,
  KeyboardArrowDown,
} from "@mui/icons-material";
import Logo from "../../public/Logo.png";
import { useAppContext } from "./context";

// planın free olup olmamasını event-keyi varsa dikkat et yoksa etme
const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const {setAuthToken, user} = useAppContext();

  const logoutUser = () => {
    Cookies.remove("auth_token");
    localStorage.removeItem("user");
    setAuthToken(null)
    router.push("/");
  };
  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <Image
          src={Logo}
          objectFit="contain"
          alt="PixxJoy"
          width={200}
          height={100}
        />
      </div>

      <nav className="sidebar__nav">
        <Link
          href="/dashboard"
          className={pathname === "/dashboard" ? "active" : ""}
        >
          <Home /> Ana Sayfa
        </Link>
        <Link href="/album" className={pathname === "/album" ? "active" : ""}>
          <PhotoLibrary /> Dijital Albüm
        </Link>
        <Link
          href="/create-event"
          className={pathname === "/create-event" ? "active" : ""}
        >
          <Settings /> Etkinlik Oluştur
        </Link>
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__event-switch">
          <span className="event-label" title={user?.fullname ? user.fullname : user?.email}>{user?.fullname ? user.fullname : user?.email}</span>
          <div style={{display:"flex"}}>
            <p>Değiştir veya yeni etkinlik oluştur</p>
            <KeyboardArrowDown fontSize="small" />
          </div>
        </div>
        {/* <Link href="#" className="sidebar__link">
          {" "}
          İletişime Geç{" "}
        </Link> */}
        <button className="sidebar__btn" onClick={logoutUser}>
          {" "}
          <ExitToApp /> Çıkış Yap{" "}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
