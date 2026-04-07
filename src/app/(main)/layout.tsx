import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NavLinks } from "@/components/layout/NavLinks";
import { NotificationBell } from "@/components/layout/NotificationBell";
import { LanguageSelector } from "@/components/layout/LanguageSelector";
import { UserProfileMenu } from "@/components/layout/UserProfileMenu";
import { signOut } from "./actions";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const isAdmin =
    user.user_metadata?.role === "admin" ||
    user.app_metadata?.role === "admin";

  return (
    <>
      <Header
        left={<NavLinks />}
        right={
          <>
            <NotificationBell count={0} />
            <LanguageSelector />
            <UserProfileMenu isAdmin={isAdmin} signOut={signOut} />
          </>
        }
      />
      {children}
      <Footer variant="auth" activePath="/" />
    </>
  );
}
