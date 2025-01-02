import Image from "next/image";
import TopPageDescription from "./ui/top/description";
import apiServerInfo from "@/config/serverConfig";

export default function Home() {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <div className="grid grid-rows-[10px_1fr_10px] items-start justify-items-center sm:ps-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-start">
        <TopPageDescription />
      </main>
      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        [todo] Footer
      </footer> */}
    </div>
  );
}
