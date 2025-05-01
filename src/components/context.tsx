"use client";
import Cookies from "js-cookie";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Plan, User } from "@/type";
import { useRouter } from "next/navigation";

const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {

  const [plans, setPlans] = useState<Plan[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [userPlan, setUserPlan] = useState(null);
  const [authToken, setAuthToken] = useState<string | null>(Cookies.get("auth_token") || null);
  const router = useRouter()

  
  const checkUser = () => {
    const token = Cookies.get("auth_token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData) as User;
        setUser(parsedUser);
      } catch (error) {
        console.error("Kullanıcı bilgisi çözümlenemedi:", error);
        setUser(null);
      }
      return token;
    } else {
      setUser(null);
      return false;
    }
  };

  useEffect(() => {
    const token = checkUser();
    
    if (token) {
      const getMyEvent = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/event`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token
            },
          });

          const data = await response.json();
          if(!data.Data.date || !data.Data.title){
            router.push("/create-event")
          }else{
            router.push("/dashboard")
          }
          
          return data;
        } catch (error) {
          console.error("Event çekilemedi:", error);
          return null;
        }
      };
      getMyEvent()
      const geyMyPlan = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/my-plan?devKey=${process.env.NEXT_PUBLIC_DEV_KEY}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token
            },
          });

          const data = await response.json();
          setUserPlan(data.Data)
          return data;  
        } catch (error) {
          console.error("Event çekilemedi:", error);
          return null;
        }
      };
      geyMyPlan()
    }
  }, [authToken]);

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
        setPlans(data.Data);
        return data;
      } catch (error) {
        console.error("Planlar alınamadı:", error);
        return null;
      }
    };
    getPlans();
  }, []);

  const data = {
    plans,
    user,
    authToken,
    userPlan,
    setAuthToken,

  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  return context;
};
