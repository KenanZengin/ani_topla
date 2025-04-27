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

  const answerText =
    "Hayır! Sadece QR kodu okutun, sayfa açılacak ve hemen yükleyebilirsiniz. Her şey tarayıcı üzerinden çalışıyor.";

  const questions = [
    "Uygulama indirmem gerekiyor mu?",
    "Herkes mi fotoğraf yükleyebilir?",
    "Ne kadar fotoğraf yüklenebilir?",
    "Fotoğraflar ne kadar süreyle saklanır?",
    "Yüklenen fotoğrafları kimler görebiliyor?",
    "Hangi dosya türleri destekleniyor?",
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
            <Typography className="faq__answer">{answerText}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </section>
  );
};

export default FAQSection;
