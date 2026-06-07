"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import SignInCard from "./SignInCard";

interface Props {
  mode: "signin" | "signup";
}

const AuthCard = ({ mode }: Props) => {
  const isSignIn = mode === "signin";

  return (
    <div className="w-full max-w-[440px] px-4">
      <Card className="relative overflow-hidden border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.06)] rounded-[32px] p-6 sm:p-8">
        
        <CardHeader className="relative flex flex-col items-center gap-2 text-center p-0 pb-6">
          
          <div className="flex items-center justify-center w-14 h-14 bg-white border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] rounded-2xl mb-2 text-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
            </svg>
          </div>

          <CardTitle className="text-2xl font-bold text-slate-900 tracking-tight">
            {isSignIn ? "Sign in with email" : "Create your account"}
          </CardTitle>

          <CardDescription className="text-sm text-slate-500 max-w-[280px] leading-relaxed">
            {isSignIn
              ? "Make a new doc to bring your words, data, and teams together. For free"
              : "Get started with CodeVerse in seconds"}
          </CardDescription>
        </CardHeader>

        <div className="relative">
          {isSignIn && <SignInCard />}
        </div>
      </Card>
    </div>
  );
};

export default AuthCard;