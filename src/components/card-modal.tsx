"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import Pricing from "./pricing";
import CloseIcon from "@mui/icons-material/Close";
import { useAppContext } from "./context";

const CardModal = () => {
    
  const { setPlanModal, planModal } = useAppContext();

  return (
    <Modal
      open={planModal}
      onClose={() => setPlanModal(false)}
      className="plan__modal"
    >
      <div className="plan__modal__wrapper" style={{ position: "relative" }}>
        <button
          onClick={() => setPlanModal(false)}
          style={{
            position: "absolute",
            top: "-7%",
            right: "-5%",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            zIndex: "99"
          }}
          aria-label="Close"
        >
          <CloseIcon style={{ fontSize: "35px", color: "#fff" }} />
        </button>
        <Pricing />
      </div>
    </Modal>
  );
};

export default CardModal;
