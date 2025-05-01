"use client";
import { QRCode } from "antd";
import React, { useEffect, useState } from "react";
import Logo from "../../../../public/Logo.png";
import Gif from "../../../../public/sew.gif";

import { useAppContext } from "@/components/context";
import Link from "next/link";
import { Alert, Snackbar,Slide } from '@mui/material';
import type { SlideProps } from '@mui/material';


const DashboardPage = () => {
  const { qrURL } = useAppContext();

  // const handleDownloadQR = async () => {
  //   const qrWrapper = document.getElementById("qr-code");
  //   if (!qrWrapper) return;

  //   const qrCanvas = qrWrapper.querySelector("canvas") as HTMLCanvasElement;
  //   if (!qrCanvas) return;

  //   const padding = 40;
  //   const qrSize = qrCanvas.width;
  //   const totalSize = qrSize + padding * 2;

  //   // Yeni canvas
  //   const finalCanvas = document.createElement("canvas");
  //   finalCanvas.width = totalSize;
  //   finalCanvas.height = totalSize;
  //   const ctx = finalCanvas.getContext("2d");
  //   if (!ctx) return;

  //   // 1. Beyaz zemin
  //   ctx.fillStyle = "#fff";
  //   ctx.fillRect(0, 0, totalSize, totalSize);

  //   // 2. QR kodu ortala
  //   ctx.drawImage(qrCanvas, padding, padding);

  //   // 3. Logo'yu ortasına çiz
  //   const logoImg = new Image();
  //   logoImg.src = Logo.src;
  //   logoImg.crossOrigin = "anonymous"; // önemli!
  //   logoImg.onload = () => {
  //     const logoMaxSize = 150;
  //     const logoAspectRatio = logoImg.width / logoImg.height;

  //     let drawWidth = logoMaxSize;
  //     let drawHeight = logoMaxSize;

  //     if (logoAspectRatio > 1) {
  //       // Geniş logo
  //       drawHeight = logoMaxSize / logoAspectRatio;
  //     } else {
  //       // Yüksek logo
  //       drawWidth = logoMaxSize * logoAspectRatio;
  //     }

  //     const logoX = totalSize / 2 - drawWidth / 2;
  //     const logoY = totalSize / 2 - drawHeight / 2;

  //     // Beyaz zemin
  //     ctx.fillStyle = "#fff";
  //     ctx.fillRect(logoX - 4, logoY - 4, drawWidth + 8, drawHeight + 8);

  //     // Logoyu çiz
  //     ctx.drawImage(logoImg, logoX, logoY, drawWidth, drawHeight);

  //     // İndir
  //     const dataUrl = finalCanvas.toDataURL("image/png");
  //     const link = document.createElement("a");
  //     link.href = dataUrl;
  //     link.download = "qr-code.png";
  //     link.click();
  //   };
  // };
  const handleDownloadQR = () => {
    const canvas = document.querySelector(
      "#qr-code canvas"
    ) as HTMLCanvasElement;
    const originalSize = canvas.width;
    const padding = 40;
    const finalSize = originalSize + padding * 2;

    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = finalSize;
    finalCanvas.height = finalSize;

    const ctx = finalCanvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, finalSize, finalSize);

    ctx.drawImage(canvas, padding, padding);

    const dataUrl = finalCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "qr-code.png";
    link.click();
  };

  const [open, setOpen] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(qrURL);
      setOpen(true);
    } catch (err) {
      console.error('Kopyalama başarısız:', err);
    }
  };


  return (
    <div className="dashboard-container">
      <main className="dashboard-main">
        <section className="dashboard-card">
          <h2 className="dashboard-title">Anı Topla’ya Hoşgeldin!</h2>
          <p>Etkinliğini yönetmek için doğru yerdesin. Hadi başlayalım!</p>

          <h3 className="dashboard-subtitle">Dijital Albümün Burada!</h3>
          <p>
            Etkinliğinden en güzel fotoğraflar, videolar, notlar Dijital
            Albüm'ünde bir arada.
          </p>

          <h3 className="dashboard-subtitle">Hadi Paylaş!</h3>
          <p>
            Sana özel üretilen QR kodunu veya aşağıdaki bağlantıyı ileterek
            misafirlerini paylaşmaya <br /> davet edebilirsin.
          </p>

          <div className="dashboard-link-box">
            <span className="dashboard-link-text">{qrURL}</span>
            <button onClick={handleCopy}>
              Linki Kopyala
            </button>
          </div>
          <div className="dashboard-actions">
            <Link href={"/album"}  rel="noopener noreferrer">
              Dijital Albüme Git
            </Link>
          </div>
        </section>
        <section className="dashboard-qr">
          <div
            className="qr-wrapper"
            style={{ position: "relative", display: "inline-block" }}
          >
            <img
              src={Gif.src}
              alt="gif"
              style={{
                position: "absolute",
                top: "39%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                height: "100%",
                objectFit: "contain",
                padding: 4,
              }}
            />
            {qrURL && (
              <QRCode value={qrURL} size={250} id="qr-code" errorLevel="H" />
            )}

            {/* <img
              src={Logo.src}
              alt="Logo"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 100,
                height: 100,
                objectFit: "contain",
                backgroundColor: "#fff", 
                padding: 4,
              }}
            /> */}
          </div>
          <button onClick={handleDownloadQR}>QR Kodunu İndir</button>
        </section>
      </main>
     
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          variant="filled"
          sx={{
            backgroundColor: 'var(--color-bg)',
            color: 'var(--color-primary)',
            boxShadow: 'var(--shadow)',
            borderRadius: 'var(--radius)',
            fontWeight: 500,
            fontSize: '0.95rem',
          }}
        >
          Link kopyalandı!
        </Alert>
      </Snackbar>
    </div>
  );
};

function SlideTransition(props:SlideProps) {
  return <Slide {...props} direction="left" />;
}
export default DashboardPage;
