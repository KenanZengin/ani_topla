"use client";

import { useAppContext } from "@/components/context";
import {  Alert } from "@mui/material";

const CurrentPlan = () => {
  const { userPlan, setPlanModal } = useAppContext();

  return (
    <div className="current-plan">
      <h2 className="current-plan__title">Mevcut Plan Bilgileriniz</h2>

      {userPlan ? (
        <div className="current-plan__card">
          <h3 className="current-plan__name">{userPlan.name}</h3>
          <p className="current-plan__price">{userPlan.formattedPrice}</p>

          <div className="current-plan__benefits">
            <h4>Plan Özellikleri:</h4>
            <ul>
              {userPlan.benefits?.map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="current-plan__rules">
            <h4>Kurallar:</h4>
            <ul>
              <li>Maksimum Dosya: {userPlan.rules?.maxFile}</li>
              <li>
                Dosya Geçerlilik Süresi: {userPlan.rules?.maxFileDuration} gün
              </li>
              <li>
                Yükleme Süresi: Etkinlik sonrası{" "}
                {userPlan.rules?.maxUploadDuration} gün
              </li>
              <li>
                Etkinlikten önce yükleme sınırı:{" "}
                {userPlan.rules?.maxFileUploadBeforeEvent}
              </li>
            </ul>
          </div>
          {userPlan.id === "free" && (
            <div className="current-plan__upgrade">
              <button
                className="current-plan__upgrade-button"
                onClick={() => setPlanModal(true)}
              >
                Planımı Yükselt
              </button>
            </div>
          )}
        </div>
      ) : (
        <Alert severity="info">Henüz bir plana sahip değilsiniz.</Alert>
      )}
    </div>
  );
};

export default CurrentPlan;
