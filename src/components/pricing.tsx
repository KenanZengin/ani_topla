"use client";

import Image from "next/image";
import callOut from "../../public/call.png";
import { useEffect, useState } from "react";

interface PlanRule {
  maxFile: number | null;
  maxFileDuration: number;
  maxUploadDuration: number;
  maxFileUploadBeforeEvent: number;
}

interface Plan {
  name: string;
  id: string;
  price_id: string;
  price: number;
  currency: string;
  formattedPrice: string;
  benefits: string[];
  rules: PlanRule;
}

const Pricing = () => {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const getPlans = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/plans?devKey=${process.env.NEXT_PUBLIC_DEV_KEY}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Sunucu hatası: " + response.status);
        }

        const data = await response.json();
        console.log("Planlar:", data.Data);
        setPlans(data.Data);
        return data;
      } catch (error) {
        console.error("Planlar alınamadı:", error);
        return null;
      }
    };
    getPlans();
  }, []);

  return (
    <section className="pricing">
      <div className="pricing__grid">
        {plans &&
          plans.map((plan: Plan) => (
            <div className="pricing__card" key={plan.id}>
              {plan.name === "Ücretsiz" && (
                <span className="cal">
                  <Image src={callOut} alt="cal_out" width={152} height={54} />{" "}
                </span>
              )}
              <div className="pricing__price">{plan.formattedPrice}</div>
              <div className="pricing__plan">{plan.name}</div>
              {/* <p className="pricing__description">Lorem ipsum</p> */}
              <ul className="pricing__features">
                {plan.benefits.map((rule: string, index: number) => (
                  <li key={index}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="25"
                      fill="none"
                      viewBox="0 0 24 25"
                    >
                      <path
                        fill="#FFF0C6"
                        d="M1.25 12.629c0 5.937 4.813 10.75 10.75 10.75s10.75-4.813 10.75-10.75S17.937 1.879 12 1.879 1.25 6.692 1.25 12.629"
                      ></path>
                      <path
                        fill="#DD6602"
                        d="M16.878 8.649a1 1 0 0 1-.398 1.357c-1.371.75-2.66 2.32-3.643 3.826a25 25 0 0 0-1.43 2.507l-.097.206a1 1 0 0 1-1.768.097c-.31-.52-.804-.993-1.262-1.355a8 8 0 0 0-.565-.408l-.21-.132a1 1 0 0 1 .99-1.737l.316.196c.182.12.432.292.71.512.212.168.449.37.688.602.257-.462.578-1.006.954-1.582 1.017-1.556 2.529-3.486 4.357-4.487a1 1 0 0 1 1.358.398"
                      ></path>
                    </svg>
                    {rule}
                  </li>
                ))}
              </ul>
              <button className="pricing__button">Get started</button>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Pricing;
