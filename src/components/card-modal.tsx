"use client";

import { Modal } from "@mui/material";
import Pricing from "./pricing";
import CloseIcon from "@mui/icons-material/Close";
import { useAppContext } from "./context";
import { useState } from "react";
import { Plan } from "@/type";

const CardModal = () => {
  const { setPlanModal, planModal } = useAppContext();
  const [refPlans, setRefPlans] = useState<Plan[] | null>(null);

  return (
    <Modal
      open={planModal}
      onClose={() => {
        setPlanModal(false);
        setRefPlans(null);
      }}
      className="plan__modal"
    >
      <div className="plan__modal__wrapper" style={{ position: "relative" }}>
        <button
          onClick={() => {
            setPlanModal(false);
            setRefPlans(null);
          }}
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            zIndex: "99",
          }}
          aria-label="Close"
        >
          <CloseIcon style={{ fontSize: "30px", color: "#fff" }} />
        </button>
        {refPlans && refPlans.length > 0 && (
          <div className="plan__modal__title">
            <h2>Size Özel Paket Seçenekleriniz!</h2>
          </div>
        )}
        <Pricing refPlans={refPlans ?? undefined} setRefPlans={setRefPlans} />
      </div>
    </Modal>
  );
};

export default CardModal;
