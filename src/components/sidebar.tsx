"use client";
import React, { useState } from "react";
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
  CreditCard,
} from "@mui/icons-material";
import Logo from "../../public/Logo.png";
import { useAppContext } from "./context";
import {
  Menu,
  MenuItem,
  Button,
  ListItemIcon,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { setAuthToken, user, setGlobalSnackbar, userEvent } = useAppContext();
  console.log("userEvent",userEvent);
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutUser = () => {
    Cookies.remove("auth_token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("hasRedirected");
    setAuthToken(null);
    router.push("/");
    setTimeout(() => {
      setGlobalSnackbar({
        state: true,
        mess: "Oturum kapatıldı. Tekrar görüşmek üzere!",
        mode: "success",
      });
    }, 1000);
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
          <Settings /> {userEvent && (userEvent.title || userEvent.date) ? "Etkinliklerim" : "Etkinlik Oluştur"}
        </Link>
        <Link
          href="/user-plan"
          className={pathname === "/user-plan" ? "active" : ""}
        >
          <CreditCard /> Planlarım
        </Link>
      </nav>
      <div className="sidebar__footer">
        <div className="sidebar__event-switch">
          <span
            className="event-label"
            title={user?.fullname ? user.fullname : user?.email}
          >
            {user?.fullname ? user.fullname : user?.email}
          </span>
          <div style={{ display: "flex" }} onClick={handleClick}>
            <p>Değiştir veya yeni etkinlik oluştur</p>
            <KeyboardArrowDown fontSize="small" />
          </div>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              className: "event-toggle__menu",
              elevation: 4,
            }}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            transformOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <MenuItem
              onClick={handleClose}
              style={{ backgroundColor: "#fff3e0" }}
            >
              <Typography fontWeight={600} className="event-toggle__menu-text">
                {user?.fullname ? user.fullname : user?.email} - Organizer
              </Typography>
            </MenuItem>
             {/*<MenuItem onClick={handleClose}>
             <ListItemIcon>
                <AddIcon sx={{ color: "#f28500" }} fontSize="small" />
              </ListItemIcon>
               <Link href={"/create-event"}>
                <Typography
                  fontWeight={500}
                  className="event-toggle__menu-text"
                >
                  Etkinlik oluştur
                </Typography>
              </Link> 
            </MenuItem>*/}
          </Menu>
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
