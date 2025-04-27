"use client";
import Image from "next/image";
import React from "react";
import Logo from "../../public/Logo.png";
import Link from "next/link";
import WeddingSlider from "@/components/slider";
import FAQSection from "@/components/faq";

import img1 from "../../public/gallery-1.png";
import img2 from "../../public/gallery-2.png";
import img3 from "../../public/gallery-3.png";
import img4 from "../../public/gallery-4.png";
import img5 from "../../public/gallery-5.png";
import img6 from "../../public/gallery-6.png";
import img7 from "../../public/gallery-7.png";
import Pricing from "@/components/pricing";
import img8 from "../../public/avatar1.png";
import img9 from "../../public/avatar2.png";
import img10 from "../../public/avatar3.png";
import img11 from "../../public/avatar4.png";
import img12 from "../../public/avatar5.png";
import img13 from "../../public/avatar6.png";

const HomePage: React.FC = () => {
  return (
    <>
      <header className="header-navbar">
        <div className="header-wrapper container-g">
          <div className="header-navbar__left">
            <Image src={Logo} alt="logo" width={112} height={112} />
            <div className="header-redirect ">
              <a href="#nasil-calisir" className="header-navbar__link">
                Nasıl Çalışır?
              </a>
              <a href="#siz-neler-goruyorsunuz" className="header-navbar__link">
                Siz Neler Görüyorsunuz?
              </a>
              <a href="#fiyatlandirma" className="header-navbar__link">
                Fiyatlandırma
              </a>
              <a href="#geri-bildirimler" className="header-navbar__link">
                Geri Bildirimler
              </a>
              <a href="#sss" className="header-navbar__link">
                SSS
              </a>
            </div>
          </div>

          <div className="header-navbar__right">
            <Link href={"/"} className="header-navbar__contact-button">
              İletişime Geç
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className="hero-section">
          <div className="hero-section__content container-g">
            <h1 className="hero-section__title">
              Düğününüze Gelen Herkesten <br />
              <span className="hero-section__highlight">Fotoğraf</span>{" "}
              Toplamanın En Kolay Yolu!
            </h1>
            <p className="hero-section__subtitle">
              We’re a full-service interior design agency who specialize in
              simple, useful and beautiful solutions for any space.
            </p>
          </div>
        </section>
        <section><WeddingSlider /></section>
        <section className="how-it-works">
          <div className="how-it-works-wrapper container-g">
            <div className="how-it-works__header">
              <p className="how-it-works__small-title">Nasıl Çalışır?</p>
              <h2 className="how-it-works__main-title">
                Anı Toplamak Bu Kadar Kolay!
              </h2>
              <p className="how-it-works__description">
                Misafirleriniz QR kodu okutsun, fotoğraflarını yüklesin, siz de
                tüm anılara tek yerden ulaşın. 4 adımda tüm kareler elinizde!
              </p>
            </div>

            <div className="how-it-works__cards">
              <div className="how-it-works__card">
                <div className="how-it-works__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="#fff"
                      strokeWidth="2"
                      d="M3 6c0-1.414 0-2.121.44-2.56C3.878 3 4.585 3 6 3s2.121 0 2.56.44C9 3.878 9 4.585 9 6s0 2.121-.44 2.56C8.122 9 7.415 9 6 9s-2.121 0-2.56-.44C3 8.122 3 7.415 3 6ZM3 18c0-1.414 0-2.121.44-2.56C3.878 15 4.585 15 6 15s2.121 0 2.56.44C9 15.878 9 16.585 9 18s0 2.121-.44 2.56C8.122 21 7.415 21 6 21s-2.121 0-2.56-.44C3 20.122 3 19.415 3 18Z"
                    ></path>
                    <path
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12h6M12 3v5"
                    ></path>
                    <path
                      stroke="#fff"
                      strokeWidth="2"
                      d="M15 6c0-1.414 0-2.121.44-2.56C15.878 3 16.585 3 18 3s2.121 0 2.56.44C21 3.878 21 4.585 21 6s0 2.121-.44 2.56C20.122 9 19.415 9 18 9s-2.121 0-2.56-.44C15 8.122 15 7.415 15 6Z"
                    ></path>
                    <path
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="M21 12h-6c-1.414 0-2.121 0-2.56.44C12 12.878 12 13.585 12 15m0 2.77v2.768M15 15v1.5c0 1.446.784 1.5 2 1.5a1 1 0 0 1 1 1m-2 2h-1m3-6c1.414 0 2.121 0 2.56.44s.44 1.148.44 2.564 0 2.125-.44 2.565c-.32.32-.783.408-1.56.431"
                    ></path>
                  </svg>
                </div>
                <h3 className="how-it-works__card-title">QR Kodunu Okut</h3>
                <p className="how-it-works__card-description">
                  Her masaya veya girişe koyduğunuz QR kodu ile misafirler
                  kolayca sayfayı açar.
                </p>
              </div>

              <div className="how-it-works__card">
                <div className="how-it-works__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="M13 3.002Q12.295 3 11.5 3C7.022 3 4.782 3 3.391 4.391S2 8.021 2 12.5c0 4.478 0 6.718 1.391 8.109S7.021 22 11.5 22c4.478 0 6.718 0 8.109-1.391 1.338-1.339 1.389-3.462 1.39-7.609"
                    ></path>
                    <path
                      stroke="#fff"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2 14.135q.93-.135 1.872-.132c2.652-.056 5.239.77 7.3 2.331 1.91 1.448 3.253 3.44 3.828 5.666"
                    ></path>
                    <path
                      stroke="#fff"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 16.896c-1.175-.595-2.391-.897-3.614-.896-1.851-.007-3.684.673-5.386 2"
                    ></path>
                    <path
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 4.5c.491-.506 1.8-2.5 2.5-2.5M22 4.5c-.491-.506-1.8-2.5-2.5-2.5m0 0v8"
                    ></path>
                  </svg>
                </div>
                <h3 className="how-it-works__card-title">Fotoğrafları Yükle</h3>
                <p className="how-it-works__card-description">
                  Telefonlarındaki fotoğrafları tek tıkla yüklerler. Uygulama
                  yok, üyelik yok, anılar yüklenir.
                </p>
              </div>

              <div className="how-it-works__card">
                <div className="how-it-works__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="#fff"
                      strokeWidth="2"
                      d="M6 17.975c.129 1.308.42 2.189 1.077 2.846C8.256 22 10.154 22 13.949 22s5.693 0 6.872-1.18C22 19.643 22 17.745 22 13.95s0-5.693-1.18-6.872c-.656-.657-1.537-.948-2.846-1.077"
                    ></path>
                    <path
                      stroke="#fff"
                      strokeWidth="2"
                      d="M2 10c0-3.771 0-5.657 1.172-6.828S6.229 2 10 2s5.657 0 6.828 1.172S18 6.229 18 10s0 5.657-1.172 6.828S13.771 18 10 18s-5.657 0-6.828-1.172S2 13.771 2 10Z"
                    ></path>
                    <path
                      stroke="#fff"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2 11.119a15 15 0 0 1 1.872-.117c2.652-.049 5.239.674 7.3 2.04C13.081 14.31 14.424 16.053 15 18"
                    ></path>
                    <path
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7h.009"
                    ></path>
                  </svg>
                </div>
                <h3 className="how-it-works__card-title">Siz Görüntüleyin</h3>
                <p className="how-it-works__card-description">
                  Etkinlik sahibine özel panelden yüklenen tüm kareleri tek tek
                  görebilirsiniz.
                </p>
              </div>

              <div className="how-it-works__card">
                <div className="how-it-works__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M20.9977 12C21 11.5299 21 12.0307 21 11.5C21 7.02166 21 4.78249 19.6088 3.39124C18.2175 2 15.9783 2 11.5 2C7.02166 2 4.78249 2 3.39124 3.39124C2 4.78249 2 7.02166 2 11.5C2 15.9783 2 18.2175 3.39124 19.6088C4.78249 21 7.02166 21 11.5 21C11.6699 21 11.8365 21 12 20.9999"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M2 7H21"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.5 2L13.5 7"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.5 2L6.5 7"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.015 15.3866C16.0876 14.7469 17.0238 15.0047 17.5863 15.4153C17.8169 15.5837 17.9322 15.6679 18 15.6679C18.0678 15.6679 18.1831 15.5837 18.4137 15.4153C18.9762 15.0047 19.9124 14.7469 20.985 15.3866C22.3928 16.2261 22.7113 18.9958 19.4642 21.3324C18.8457 21.7775 18.5365 22 18 22C17.4635 22 17.1543 21.7775 16.5358 21.3324C13.2887 18.9958 13.6072 16.2261 15.015 15.3866Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3 className="how-it-works__card-title">
                  Tüm Kareler Sizinle Kalsın
                </h3>
                <p className="how-it-works__card-description">
                  Artık "bana da atar mısın" devri bitti. Herkesin kamerası size
                  çalışıyor.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="what-see">
          <div className="what-see-wrapper container-g">
            <div className="what-see__header">
              <p className="what-see__small-title">Siz Neler Görüyorsunuz?</p>
              <h2 className="what-see__main-title">Siz Neler Görüyorsunuz?</h2>
              <p className="what-see__description">
                Google Drive benzeri basit bir panel üzerinden, tüm etkinlik
                fotoğraflarınızı <br /> güvenle ve düzenli şekilde görüntüleyin.
                Dosya kaosu? Artık yok.
              </p>
            </div>
            <section className="gallery">
              <div className="gallery__grid">
                <div className="gallery__item gallery__item--1x1">
                  <Image src={img1} alt="Image 1" fill />
                </div>
                <div className="gallery__item gallery__item--1x2">
                  <Image src={img3} alt="Image 2" fill />
                </div>
                <div className="gallery__item gallery__item--1x1">
                  <Image src={img4} alt="Image 3" fill />
                </div>
                <div className="gallery__item gallery__item--1x1">
                  <Image src={img2} alt="Image 4" fill />
                </div>
                <div className="gallery__item gallery__item--1x1">
                  <Image src={img5} alt="Image 5" fill />
                </div>
                <div className="gallery__item gallery__item--1x2">
                  <Image src={img6} alt="Image 6" fill />
                </div>
                <div className="gallery__item gallery__item--2x2">
                  <Image src={img7} alt="Image 7" fill />
                </div>
              </div>
            </section>
          </div>
        </section>
        <section className="plan">
          <div className="plan-wrapper container-g">
            <div className="plan__header">
              <p className="plan__small-title">Fiyatlandırma</p>
              <h2 className="plan__main-title">
                Her bütçeye uygun bir anı planı
              </h2>
              <p className="plan__description">
                İster küçük bir kutlama, ister büyük bir düğün... Anılarınızı
                saklamak için esnek ve adil planlarımız var.
              </p>
            </div>
            <div className="plans-card">
              <Pricing />
            </div>
          </div>
        </section>
        <section className="testimonials">
          <div className="testimonials-wrapper container-g">
            <div className="testimonials__header">
              <p className="testimonials__small-title">Geri Bildirimler</p>
              <h2 className="testimonials__main-title">
                Mutlu Anılar, Mutlu Kullanıcılar...
              </h2>
              <p className="testimonials__description">
                AnıTopla’yı kullananların gerçek yorumları burada! Her
                etkinlikten sonra gelen “iyi ki kullanmışız” cümleleriyle
                gururlanıyoruz.
              </p>
            </div>
            <div className="testimonials__grid">
              {/* Yorum kartları */}
              <div className="testimonials__card">
                <p className="testimonials__comment">
                  "Düğünümüzden sonra herkes bizden fotoğraf istedi. AnıTopla
                  sayesinde hepsi tek yerdeydi. Mis gibi sistem!"
                </p>
                <div className="testimonials__user">
                  <Image src={img8} alt="User 1" width={48} height={48} />
                  <span>Melis & Baran</span>
                </div>
              </div>

              <div className="testimonials__card">
                <p className="testimonials__comment">
                  "Kına gecemde herkes deli gibi fotoğraf çekti ama bana hiçbir
                  şey gelmedi sanmıştım. Sonra AnıTopla linkiyle 200'den fazla
                  kareye ulaştım 😍"
                </p>
                <div className="testimonials__user">
                  <Image src={img9} alt="User 1" width={48} height={48} />
                  <span>Canberk T.</span>
                </div>
              </div>

              <div className="testimonials__card">
                <p className="testimonials__comment">
                  "Ablamın doğum günü partisinde test ettik. Herkes rahatça
                  yükledi, babam bile QR okutup fotoğraf attı. Gerisini siz
                  düşünün!"
                </p>
                <div className="testimonials__user">
                  <Image src={img10} alt="User 1" width={48} height={48} />
                  <span>Elif D.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="question">
          <div className="question-wrapper container-g">
            <div className="question__header">
              <p className="question__small-title">
                SSS (Sıkça Sorulan Sorular)
              </p>
              <h2 className="question__main-title">
                Bize Ulaşın – Anıların Yolda Kalmasın
              </h2>
              <p className="question__description">
                Soru mu var? Destek ekibimiz her zaman yanınızda.
              </p>
            </div>
            <FAQSection />
          </div>
        </section>
        <section className="contact-banner">
          <div className="contact-banner__avatars">
            <Image
              src={img12}
              width={48}
              height={48}
              alt="avatar"
              className="contact-banner__avatar"
            />
            <Image
              src={img11}
              width={48}
              height={48}
              alt="avatar"
              className="contact-banner__avatar center"
            />
            <Image
              src={img13}
              width={48}
              height={48}
              alt="avatar"
              className="contact-banner__avatar"
            />
          </div>
          <h2 className="contact-banner__title">Hala sorularınız mı var?</h2>
          <p className="contact-banner__description">
            Aradığınız cevabı bulamıyor musunuz? Lütfen güler yüzlü ekibimizle
            iletişime geçin.
          </p>
          <button className="contact-banner__button">İletişime Geç</button>
        </section>
      </main>
      <div className="header-bg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1440"
          height="540"
          fill="none"
          viewBox="0 0 1440 540"
        >
          <path fill="#fff" d="M0 0h1440v540H0z"></path>
          <g clipPath="url(#clip0_1_1409)">
            <path fill="#fff" d="M0 0h1440v540H0z"></path>
            <path fill="url(#paint0_linear_1_1409)" d="M0 0h1440v540H0z"></path>
            <mask
              id="mask0_1_1409"
              width="1440"
              height="1440"
              x="0"
              y="0"
              maskUnits="userSpaceOnUse"
              style={{ maskType: "alpha" }}
            >
              <path
                fill="url(#paint1_radial_1_1409)"
                d="M0 0h1440v1440H0z"
              ></path>
            </mask>
            <g
              stroke="#FFE9AD"
              clipPath="url(#clip1_1_1409)"
              mask="url(#mask0_1_1409)"
            >
              <g clipPath="url(#clip2_1_1409)">
                <path d="M48.5 0v1440M144.5 0v1440M240.5 0v1440M336.5 0v1440M432.5 0v1440M528.5 0v1440M624.5 0v1440M720.5 0v1440M816.5 0v1440M912.5 0v1440M1008.5 0v1440M1104.5 0v1440M1200.5 0v1440M1296.5 0v1440M1392.5 0v1440"></path>
              </g>
              <g clipPath="url(#clip3_1_1409)">
                <path d="M-240 95.5h1920M-240 191.5h1920M-240 287.5h1920M-240 383.5h1920M-240 479.5h1920"></path>
              </g>
            </g>
          </g>
          <defs>
            <clipPath id="clip0_1_1409">
              <path fill="#fff" d="M0 0h1440v540H0z"></path>
            </clipPath>
            <clipPath id="clip1_1_1409">
              <path fill="#fff" d="M-240 0h1920v1440H-240z"></path>
            </clipPath>
            <clipPath id="clip2_1_1409">
              <path fill="#fff" d="M-240 0h1920v1440H-240z"></path>
            </clipPath>
            <clipPath id="clip3_1_1409">
              <path fill="#fff" d="M-240 0h1920v1440H-240z"></path>
            </clipPath>
            <radialGradient
              id="paint1_radial_1_1409"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="matrix(0 1440 -751.588 0 720 0)"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#DD6602"></stop>
              <stop offset="0.953" stopColor="#DD6602" stopOpacity="0"></stop>
            </radialGradient>
            <linearGradient
              id="paint0_linear_1_1409"
              x1="720"
              x2="720"
              y1="-343"
              y2="514.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FEF0C7"></stop>
              <stop offset="0.868" stopColor="#FEF0C7" stopOpacity="0"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
};

export default HomePage;
