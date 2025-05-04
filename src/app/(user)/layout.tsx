import Banner from "@/components/banner";
import CardModal from "@/components/card-modal";
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
        <CardModal />
      </section>
    </main>
  );
}
