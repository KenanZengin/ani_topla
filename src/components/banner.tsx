"use client";

import { useState } from "react";
import { useAppContext } from "./context";
import { Close, InfoOutlined } from "@mui/icons-material";
const Banner = () => {
  const { userPlan, setPlanModal } = useAppContext();
  const [visible, setVisible] = useState(true);
  return (
    <>
      {visible && userPlan?.id === "free" && (
        <div className="top-banner">
          <div className="top-banner__left">
            <InfoOutlined className="top-banner__icon" />
            <span className="top-banner__text">
              Şu anda sınırlı Ücretsiz üyelik planındasın. Anı Topla’nın daha
              gelişmiş özelliklerinden yararlanmak için diğer üyelik
              planlarımıza göz at!
            </span>
          </div>

          <div className="top-banner__right">
            <button
              className="top-banner__button"
              onClick={() => setPlanModal(true)}
            >
              Planı Yükselt
            </button>
            <Close
              className="top-banner__close"
              onClick={() => setVisible(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
