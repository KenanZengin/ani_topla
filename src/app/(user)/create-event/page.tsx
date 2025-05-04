"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import EventImg from "../../../../public/event.png";
import { useAppContext } from "@/components/context";

const CreateEvent = () => {
  const router = useRouter();
  const { authToken, setGlobalSnackbar } = useAppContext();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [loading, setLoading] = useState(false);

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
            subtitle: "",
            date: `${date} 19:00:00`,
          }),
        }
      );

      if (res.ok) {
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
            onChange={(e) => setDate(e.target.value)}
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
    </div>
  );
};

export default CreateEvent;
