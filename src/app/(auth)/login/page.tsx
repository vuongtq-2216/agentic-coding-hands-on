import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LoginButton } from "@/components/login/LoginButton";
import { LanguageSelector } from "@/components/layout/LanguageSelector";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  const { error } = await searchParams;

  return (
    <div className="bg-[#00101A] min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/login/keyvisual-bg.jpg"
          alt=""
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover"
        />
        {/* Gradient Left-to-Right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #00101A 0%, #00101A 25.41%, transparent 100%)",
          }}
        />
        {/* Gradient Bottom-to-Top */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #00101A 22.48%, transparent 51.74%)",
          }}
        />
      </div>

      {/* Header */}
      <Header right={<LanguageSelector />} />

      {/* Hero Content */}
      <main className="flex-1 relative z-10 flex flex-col justify-start px-4 sm:px-6 md:px-10 lg:px-36 py-10 sm:py-12 md:py-15 lg:py-24">
        <div className="flex flex-col gap-10 sm:gap-12 md:gap-15 lg:gap-20">
          {/* ROOT FURTHER Logo */}
          <Image
            src="/assets/login/root-further-logo.png"
            alt="ROOT FURTHER - SAA 2025"
            width={451}
            height={200}
            priority
            className="w-[280px] sm:w-[320px] md:w-[360px] lg:w-[451px] h-auto"
          />

          {/* Text + Button */}
          <div className="flex flex-col gap-4 sm:gap-5 md:gap-5 lg:gap-6 lg:pl-4">
            <p className="max-w-[480px] font-[family-name:var(--font-montserrat)] text-base sm:text-[17px] md:text-lg lg:text-xl font-bold leading-7 sm:leading-8 md:leading-9 lg:leading-10 tracking-wide text-white">
              Bắt đầu hành trình của bạn cùng SAA 2025.
              <br />
              Đăng nhập để khám phá!
            </p>

            <LoginButton error={error} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
