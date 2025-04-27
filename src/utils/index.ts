import Cookies from "js-cookie";

export const getRandomToken = async (): Promise<string> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/token/random`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error("Random token alınamadı.");
  }
  const data = await response.json();
  return data.Data.token; 
};


export const sendLoginToBackend = async (idToken: string, randomToken: string): Promise<void> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/token/mobile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": randomToken,
    },
    body: JSON.stringify({ idToken }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.Message || "Login bilgisi API'ye gönderilemedi.");
  }

  const data = await response.json();
  const token = data?.Data?.token;
  const user = data?.Data?.user;

  if (token && user) {
    Cookies.set("auth_token", token, { expires: 3 }); 
    localStorage.setItem("user", JSON.stringify(user));
    console.log("Token cookie'ye kaydedildi:", token);
  } else {
    throw new Error("Token verisi bulunamadı.");
  }

 
  return token
};
