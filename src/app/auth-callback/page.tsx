"use client";

import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import authCallback from "@/lib/authCallback";

const AuthPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  useEffect(() => {
    authCallback()
      .then((result) => {
        console.log("res", result.success);
        if (result.success) {
          router.push(origin ? `${origin}` : "/dashboard");
        }
      })

      .catch((error) => {
        console.log("reeee", error);
        if (error.code === "UNAUTHORIZED") {
          router.push("/sign-in");
        }
      });
  }, [origin, router]);

  return (
    <div className=" w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
        <h3 className=" font-semibold text-xl"> Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default AuthPage;