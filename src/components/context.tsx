"use client";
import Cookies from "js-cookie";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { GlobalSnackbarState, Plan, User } from "@/type";
import { useRouter } from "next/navigation";
import GlobalSnackbar from "./global-snackbar";

const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {

  const [plans, setPlans] = useState<Plan[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [userPlan, setUserPlan] = useState(null);
  const [userEvent, setUserEvent] = useState(null);
  const [authToken, setAuthToken] = useState<string | null>(Cookies.get("auth_token") || null);
  const [qrURL, setQrUrl] = useState<string>(""); 
  const [planModal, setPlanModal] = useState(false);
  const [globalSnackBar, setGlobalSnackbar] = useState<GlobalSnackbarState>({
    state: false,
    mess: "",
    mode: "success"
  });
  const router = useRouter();

  
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
      const getLink = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/my-link?devKey=${process.env.NEXT_PUBLIC_DEV_KEY}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
            },
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.Message || "Link alınamadı.");
          }
          const data = await response.json();
          if(data.Data){
            setQrUrl(data.Data)
          }
        } catch (error) {
          console.error("GetLink hatası:", error);
          return null;
        }
      };
      
      const fetchDataUser = async () => {
        try {
          const eventRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/event`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token
            },
          });
    
          const eventData = await eventRes.json();
          setUserEvent(eventData.Data);
          console.log("test",!sessionStorage.getItem("hasRedirected"));
          
          if (!sessionStorage.getItem("hasRedirected")) {
            if (!eventData.Data.date || !eventData.Data.title) {
              sessionStorage.setItem("hasRedirected", "true");
              router.push("/create-event");
            } else {
              sessionStorage.setItem("hasRedirected", "true");
              router.push("/dashboard");
            }
          }
    
          const planRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/my-plan?devKey=${process.env.NEXT_PUBLIC_DEV_KEY}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token
            },
          });
    
          const planData = await planRes.json();
          setUserPlan(planData.Data);
    
          if (planData.Data?.id === "free" && (eventData.Data?.title || eventData.Data?.date)) {
            setPlanModal(true);
          }
    
        } catch (error) {
          console.error("Veriler çekilemedi:", error);
        }
      };
    
      fetchDataUser();
      getLink();
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
    userEvent,
    setAuthToken,
    qrURL,
    setPlanModal,
    planModal,
    globalSnackBar, 
    setGlobalSnackbar,
    setUserEvent
  };

  return(
    <AppContext.Provider value={data}>
      {children}
      <GlobalSnackbar />
    </AppContext.Provider>
  )
    
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  return context;
};
