import Banner from "@/components/banner";
import Sidebar from "@/components/sidebar";


export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <main className="user-main">
      <Sidebar />
      <section style={{ flex: "1" }}>
        <Banner />
        {children}
    </section>
    </main>
  );
}
