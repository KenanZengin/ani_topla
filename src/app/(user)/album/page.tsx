"use client";

import { useAppContext } from "@/components/context";
import React, { useState, useEffect } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  Modal,
  Box,
  Typography,
  Alert,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Album = () => {
  const { authToken } = useAppContext();

  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [downloading, setDownloading] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  const devKey = "123AniToplaStripeDevTest1234567234";

  const fetchFiles = async () => {
    if (!authToken) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/files?devKey=${devKey}&page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": authToken,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setFiles(data.Data || []);
        setNoMoreData((data.Data || []).length === 0);
      } else {
        const err = await res.json();
        console.error("Hata:", err.message || "Bilinmeyen hata");
      }
    } catch (error) {
      console.error("Sunucu hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [page, limit]);

  const getExtensionFromUrl = (url: string) => {
    return url.split("?")[0].split(".").pop()?.toLowerCase() || "jpg";
  };

  const downloadAll = async () => {
    setDownloading(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder("album");

      await Promise.all(
        files.map(async (file) => {
          const response = await fetch(file.url, { mode: "cors" });
          if (!response.ok) throw new Error(`Dosya indirilemedi: ${file.url}`);
          const blob = await response.blob();
          const ext = getExtensionFromUrl(file.url);
          folder?.file(`${file.id}.${ext}`, blob);
        })
      );

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "album.zip");
    } catch (err) {
      console.error("Toplu indirme hatası:", err);
      alert("Tümünü indirme başarısız oldu. Lütfen tekrar deneyin.");
    } finally {
      setDownloading(false);
    }
  };

  const handleOpenFullscreen = (index: number) => {
    setFullscreenIndex(index);
    setFullscreenOpen(true);
  };

  const handleCloseFullscreen = () => {
    setFullscreenOpen(false);
  };

  return (
    <div className="album-page">
      <Modal open={downloading}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" component="h2">
            İndirme başladı, lütfen bekleyiniz...
          </Typography>
        </Box>
      </Modal>

      <Dialog
        open={fullscreenOpen}
        onClose={handleCloseFullscreen}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent style={{ position: "relative", padding: 0 }}>
          <IconButton
            aria-label="close"
            onClick={handleCloseFullscreen}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1,
              color: "white",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <CloseIcon />
          </IconButton>

          {files.length > 0 && (
            <div style={{ width: "100%", textAlign: "center", backgroundColor: "black" }}>
              {(() => {
                const file = files[fullscreenIndex];
                const ext = getExtensionFromUrl(file.url);
                const isVideo = ["mp4", "webm", "mov"].includes(ext);
                return isVideo ? (
                  <video src={file.url} controls style={{ width: "100%", height: "auto" }} />
                ) : (
                  <img src={file.url} style={{ width: "100%", height: "auto" }} />
                );
              })()}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="album-page__topbar">
        <h3 className="album-page__title">Dijital Albüm</h3>
        <select
          className="album-page__select"
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
        >
          <option value={6}>6 / sayfa</option>
          <option value={12}>12 / sayfa</option>
          <option value={24}>24 / sayfa</option>
        </select>
      </div>

      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <>
          {files.length === 0 && (
            <Alert severity="info" sx={{ my: 2 }}>
              Bu sayfada görüntülenecek içerik bulunamadı.
            </Alert>
          )}
          <div className="album-page__grid">
            {files.map((file, index) => {
              const ext = getExtensionFromUrl(file.url);
              const isVideo = ["mp4", "webm", "mov"].includes(ext);

              return (
                <div
                  className="album-page__card"
                  key={file.id}
                  onClick={() => handleOpenFullscreen(index)}
                  style={{ cursor: "pointer" }}
                >
                  {isVideo ? (
                    <video
                      src={file.url}
                      className="album-page__image"
                      controls
                      preload="metadata"
                    />
                  ) : (
                    <img
                      src={file.url}
                      alt={`img-${file.id}`}
                      className="album-page__image"
                      loading="lazy"
                    />
                  )}
                  <div className="album-page__info">
                    <p>{file.created_at.split(" ")[0]}</p>
                    {file?.uploader  && (
                      <p className="album-page__uploader">Yükleyen: {file.uploader }</p>
                    )}
                    <button
                      className="album-page__download-btn"
                      onClick={async (e) => {
                        e.stopPropagation();
                        try {
                          const res = await fetch(file.url, { mode: "cors" });
                          const blob = await res.blob();
                          saveAs(blob, `file-${file.id}.${ext}`);
                        } catch (err) {
                          console.error("İndirme hatası:", err);
                        }
                      }}
                    >
                      İndir
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {files.length > 0 && (
        <button className="album-page__download-all" onClick={downloadAll}>
          Tümünü İndir (ZIP)
        </button>
      )}

      <div className="album-page__pagination">
        <button
          className="album-page__button"
          disabled={page === 1}
          style={{ opacity: page !== 1 ? "1" : "0.7" }}
          onClick={() => setPage((p) => p - 1)}
        >
          Geri
        </button>
        <span className="album-page__page">Sayfa: {page}</span>
        <button
          className="album-page__button"
          disabled={noMoreData}
          style={{ opacity: !noMoreData ? "1" : "0.7" }}
          onClick={() => setPage((p) => p + 1)}
        >
          İleri
        </button>
      </div>
    </div>
  );
};

export default Album;
