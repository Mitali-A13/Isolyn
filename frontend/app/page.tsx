"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function LandingPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        // 🔍 Validate token with backend
        await api.get("/auth/me");
        setIsLoggedIn(true);
      } catch {
        // ❗ Invalid token — logout user
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoggedIn === null) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <span className="text-muted-foreground">Checking session...</span>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-[#020617] text-center px-6">
      <h1 className="text-5xl font-bold mb-4">Isolyn</h1>

      <p className="text-muted-foreground max-w-xl mb-8">
        Secure, scalable backend infrastructure for modern applications.
      </p>

      {/* PRIMARY CTA */}
      <Button
        size="lg"
        onClick={() =>
          isLoggedIn ? router.push("/dashboard") : router.push("/auth/login")
        }
      >
        {isLoggedIn ? "Go to Dashboard" : "Get Started"}
      </Button>

      {/* SECONDARY CTA */}
      {!isLoggedIn && (
        <p className="text-sm text-muted-foreground mt-4">
          New here?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => router.push("/auth/register")}
          >
            Create an account
          </span>
        </p>
      )}

      <p className="text-xs text-muted-foreground mt-10">
        API Keys · Rate Limits · Secure Collections · Pagination
      </p>
    </main>
  );
}
