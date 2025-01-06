import { auth } from "@/auth";
import HomeNav from "@/components/HomeNav";

export default async function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <section>
      <HomeNav session={session} />

      {children}
    </section>
  );
}
