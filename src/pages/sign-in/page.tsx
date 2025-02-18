import PageWrapper from "@/components/layout/page-wrapper";
import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <PageWrapper>
      <div className="flex min-w-screen justify-center my-[5rem]">
        <SignIn
          fallbackRedirectUrl="/"
          signUpFallbackRedirectUrl="/dashboard"
        />
      </div>
    </PageWrapper>
  );
}
