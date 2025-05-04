"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import EventImg from "../../../../public/event.png";
import { useAppContext } from "@/components/context";
import {
  Button,
  Typography,
  IconButton,
  Modal,
  Box,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const CreateEvent = () => {
  const router = useRouter();
  const { authToken, setGlobalSnackbar, userEvent, setUserEvent } =
    useAppContext();
  console.log("userEvent", userEvent);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  console.log("userEvent", userEvent);

  useEffect(() => {
    if (userEvent) {
      setTitle(userEvent.title ? userEvent.title : "");
      setDate(userEvent.date ? userEvent.date.split(" ")[0] : "");
      setSubtitle(userEvent.subtitle ? userEvent.subtitle : "");
    }
  }, [userEvent]);

  const handleSubmit = async () => {
    if (!title || !date) {
      setGlobalSnackbar({
        state: true,
        mess: "Lütfen eksik alanları giriniz.",
        mode: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/event?x-access-token=${authToken}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": authToken,
          },
          body: JSON.stringify({
            title,
            subtitle,
            date: `${date} 19:00:00`,
          }),
        }
      );

      if (res.ok) {
        const newEvent = userEvent;
        newEvent.title = title;
        newEvent.subtitle = subtitle;
        newEvent.date = `${date} 19:00:00`;
        setUserEvent(newEvent);
        router.push("/dashboard");
        setTimeout(() => {
          setGlobalSnackbar({
            state: true,
            mess: "Etkinliğiniz başarılı bir şekilde oluşturuldu",
            mode: "success",
          });
        }, 250);
      } else {
        const err = await res.json();
        setGlobalSnackbar({
          state: true,
          mess: "Bir hata oluştu. Daha sonra tekrar deneyiniz.",
          mode: "error",
        });
      }
    } catch (error) {
      setGlobalSnackbar({
        state: true,
        mess: "Bir hata oluştu. Daha sonra tekrar deneyiniz.",
        mode: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/anitopla.co/", "_blank");
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/905551112233", "_blank");
  };

  return (
    <div className="event-settings">
      <h2 className="event-settings__title">Etkinlik Oluşturma</h2>
      <div className="event-settings__container">
        <div className="event-settings__form">
          <label className="event-settings__label">Etkinliğin Adı</label>
          <p className="event-settings__description">
            Etkinliğine ne isim vermek istersin? Bu isim konuklar tarafından
            görüntülenecek.
          </p>
          <input
            type="text"
            className="event-settings__input"
            placeholder="Etkinlik Adı"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="event-settings__label mt-32">
            Davetlilere Mesajınız
          </label>
          <p className="event-settings__description">
            Bu mesaj etkinlik sayfasında görünecek, örneğin hoş geldiniz notu
            gibi.
          </p>
          <textarea
            className="event-settings__input"
            placeholder="Etkinlik hakkında kısa bir mesaj"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            rows={3}
          />

          <label className="event-settings__label mt-32">Etkinlik Tarihi</label>
          <p className="event-settings__description">
            Etkinliğin gerçekleşeceği tarihi seç.
          </p>
          <input
            type="date"
            className="event-settings__input"
            value={date}
            readOnly={userEvent?.date}
            onChange={(e) => setDate(e.target.value)}
            onClick={() => {
              if (userEvent && userEvent?.date) setContactOpen(true);
            }}
          />

          <p className="event-settings__info-box">
            Etkinlik tarihinden önce Dijital Albümünü yalnızca sen ve etkinlik
            ortakları görüntüleyebilirsin. Etkinlik tarihinde ilk misafirin
            yükleme yapmasıyla birlikte{" "}
            <b>tarih kesinleşir ve değiştirilemez.</b>
          </p>

          <button
            className="event-settings__save-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>

        <div className="event-settings__image">
          <Image
            src={EventImg}
            alt="Etkinlik Hazırlığı"
            width={450}
            height={450}
          />
        </div>
      </div>
      <Modal open={contactOpen} onClose={() => setContactOpen(false)}>
        <Box
          sx={{
            backgroundColor: "#fff",
            p: 4,
            borderRadius: 2,
            width: 400,
            maxWidth: "90%",
            mx: "auto",
            my: "20vh",
            boxShadow: 24,
            outline: "none",
            position: "relative",
            textAlign: "center",
          }}
        >
          <IconButton
            onClick={() => setContactOpen(false)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "grey.500",
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" fontWeight="bold" mb={2}>
            Etkinlik Tarihi Değiştirilemez
          </Typography>
          <Typography variant="body1" mb={4} color="text.secondary">
            Etkinliğinize ait tarih sistem tarafından sabitlenmiştir. Değişiklik
            talebiniz varsa bizimle aşağıdaki kanallardan iletişime
            geçebilirsiniz.
          </Typography>

          <Stack direction="column" spacing={2}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<InstagramIcon />}
              onClick={handleInstagramClick}
              sx={{
                backgroundColor: "#E1306C",
                "&:hover": { backgroundColor: "#c62857" },
              }}
            >
              Instagram Üzerinden Ulaş
            </Button>

            <Button
              variant="contained"
              fullWidth
              startIcon={<WhatsAppIcon />}
              onClick={handleWhatsAppClick}
              sx={{
                backgroundColor: "#25D366",
                "&:hover": { backgroundColor: "#1DA851" },
              }}
            >
              WhatsApp Üzerinden Ulaş
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateEvent;
