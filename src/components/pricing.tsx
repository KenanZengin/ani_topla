"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useAppContext } from "./context";
import { usePathname, useRouter } from "next/navigation";
import callOut from "../../public/call.png";
import { Plan } from "@/type";


type PricingProps = {
  refPlans?: Plan[];
  setRefPlans?: React.Dispatch<React.SetStateAction<Plan[] | null>>;
};

const Pricing = ({ refPlans, setRefPlans }: PricingProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const { plans, userPlan, authToken, setGlobalSnackbar } = useAppContext();

  const [refCode, setRefCode] = useState("");
  const [checkingRef, setCheckingRef] = useState(false);


  const handlePlanSelect = async (productId: string) => {
    if (!authToken) return router.push("/login");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": authToken,
          },
          body: JSON.stringify({
            devKey: process.env.NEXT_PUBLIC_DEV_KEY,
            productId,
            mode: "payment",
            devSuccessUrl: `${window.location.origin}/payment-success`,
            devCancelUrl: `${window.location.origin}/payment-fail`,
            ...(refCode && refPlans && refPlans?.length > 0 && { refCode }),
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        if (data.Data.url) window.location.href = data.Data.url;
      } else {
        setGlobalSnackbar({
          state: true,
          mess: "Lütfen daha sonra tekrar deneyin.",
          mode: "error",
        });
      }
    } catch (err) {
      setGlobalSnackbar({
        state: true,
        mess: "Lütfen daha sonra tekrar deneyin.",
        mode: "error",
      });
    }
  };

  const handleCheckRefCode = async () => {
    if (!refCode) return;
    setCheckingRef(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/ref-code?refCode=${refCode}`,
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
        if (data.Data && setRefPlans) {
          setRefPlans(data?.Data || []);
        } else {
          setGlobalSnackbar({
            state: true,
            mess: "Geçersiz referans kodu!",
            mode: "error",
          });
        }
      } else {
        setGlobalSnackbar({
          state: true,
          mess: "Geçersiz referans kodu!",
          mode: "error",
        });
      }
    } catch (err) {
      console.error("Ref kod doğrulama hatası:", err);
    } finally {
      setCheckingRef(false);
    }
  };

  const displayedPlans = refPlans || plans;

  return (
    <section className="pricing">
      <div className="pricing__grid" style={{gridTemplateColumns: displayedPlans.length > 2 ? "repeat(3, 1fr)" : "repeat(2, 1fr)"}}>
        {displayedPlans &&
          displayedPlans.map((plan: Plan) => (
            <div className="pricing__card" key={plan.id}>
              {plan.name === "Anı Topla Pro" && (
                <span className="cal">
                  <Image src={callOut} alt="cal_out" width={152} height={54} />
                </span>
              )}
              <div className="pricing__price">{plan.formattedPrice}</div>
              <div className="pricing__plan">{plan.name}</div>
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
              {pathName !== "/" && userPlan?.id === plan.id ? (
                <p className="pricing__button">Mevcut Plan</p>
              ) : pathName !== "/" ? (
                <button
                  className="pricing__button"
                  onClick={() => handlePlanSelect(plan.price_id)}
                >
                  Bu planı seç
                </button>
              ) : (
                <Link href="/login" className="pricing__button">
                  Bu planı seç
                </Link>
              )}
            </div>
          ))}
      </div>

      {pathName !== "/" && (
        <div className="pricing__refcode">
          <h4 className="pricing__refcode-title">Referans Kodun Var mı?</h4>
          <div className="pricing__refcode-wrapper">
            <input
              type="text"
              placeholder="Referans kodunu gir"
              className="pricing__refcode-input"
              value={refCode}
              onChange={(e) => setRefCode(e.target.value)}
            />
            <button
              className="pricing__refcode-button"
              onClick={handleCheckRefCode}
              disabled={checkingRef}
              style={{opacity: checkingRef ? ".7" : "1"}}
            >
              Kodu Uygula
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Pricing;
