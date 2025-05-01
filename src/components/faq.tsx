"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const FAQSection: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>("panel0");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const answerTexts = [
    "Evet! İstediğiniz kadar kopyalayabilir ve farklı yerlere yerleştirebilirsiniz. Misafirleriniz her yerden kolayca erişebilir.",
    "Her etkinlik için yeni bir QR kod oluşturulur. Böylece her etkinlikte anılar ayrı ve düzenli kalır.",
    "Hayır, tüm fotoğraf ve videolar yüksek çözünürlükte korunur.",
    "Hayır. Fotoğraflar yalnızca etkinlik sahibi tarafından görüntülenebilir. Dışarıya açık bir galeri oluşturulmaz.",
    "Evet, verilerimiz güvenli sunucularda şifrelenerek saklanır. Üçüncü kişilerle paylaşılmaz.",
    "Fotoğraflar 1 gün içinde indirilmezse sistemden silinir. Anılarınızı kaybetmemek için hızlıca indirmenizi öneririz.",
  ];

  const questions = [
    "QR kodu birden fazla yere koyabilir miyim?",
    "Birden fazla etkinlik için aynı QR kodu kullanılabilir mi?",
    "Yüklenen içeriklerin kalitesi düşüyor mu?",
    "Fotoğraflar herkesin erişimine açık mı?",
    "Fotoğraflar güvenli bir şekilde mi saklanıyor?",
    "Ücretsiz planda yüklenen fotoğraflar sonradan kurtarılabilir mi?",
  ];

  return (
    <section className="faq">
      {questions.map((question, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          className="faq__accordion"
        >
          <AccordionSummary
            expandIcon={
              <div
                className={`accor_icon ${
                  expanded === `panel${index}` ? "active" : ""
                }`}
              >
                {expanded === `panel${index}` ? (
                  <RemoveIcon className="faq__icon active" />
                ) : (
                  <AddIcon className="faq__icon" />
                )}
              </div>
            }
          >
            <Typography
              className={`faq__question ${
                expanded === `panel${index}` ? "active" : ""
              }`}
            >
              {question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="faq__answer">{answerTexts[index]}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </section>
  );
};

export default FAQSection;
