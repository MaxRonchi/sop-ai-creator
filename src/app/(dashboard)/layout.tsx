import { Sidebar } from "@/components/navigation/sidebar";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SignedIn>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-6 py-8">
              {children}
            </div>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
