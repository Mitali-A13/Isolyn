"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Sun, Moon, LogOut } from "lucide-react";
import ApiKeyCard from "@/components/ApiKeyCard";

export default function Dashboard() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [usage, setUsage] = useState(0);

  // ---------- FETCH API KEY ----------
  useEffect(() => {
    async function fetchKey() {
      try {
        const res = await api.get("/developer/apikey/dev");
        setApiKey(res.data.apiKey);
      } catch {
        setApiKey(null);
      }
    }
    fetchKey();
  }, []);

  // ---------- FETCH API USAGE ----------
  useEffect(() => {
    async function fetchUsage() {
      try {
        const res = await api.get("/data/usage/today");
        setUsage(res.data.used);
      } catch {
        setUsage(0);
      }
    }
    fetchUsage();
  }, []);

  // ---------- GENERATE ----------
  const generateKey = async () => {
    const res = await api.post("/developer/apikey/generate");
    setApiKey(res.data.apiKey);
  };

  // ---------- REGENERATE ----------
  const regenerateKey = async () => {
    const res = await api.post("/developer/apikey/regenerate");
    setApiKey(res.data.apiKey);
  };

  // ---------- LOGOUT ----------
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-white dark:bg-[#070b16] transition-colors">

        {/* ---------------- NAVBAR ---------------- */}
        <header className="w-full px-8 py-4 border-b border-neutral-300 dark:border-neutral-800 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-black dark:text-white">Isolyn</h1>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>

            {/* Logout */}
            <Button
              variant="destructive"
              className="px-4 py-2 rounded-lg"
              onClick={handleLogout}
            >
              Logout
              <LogOut size={18} className="ml-1" />
            </Button>
          </div>
        </header>

        {/* ---------------- MAIN CONTENT ---------------- */}
        <main className="max-w-3xl mx-auto mt-12 px-4 space-y-10">

          <h2 className="text-3xl font-bold text-center text-black dark:text-white">
            Dashboard
          </h2>

          {/* ---------- API Key Card ---------- */}
          <ApiKeyCard
            apiKey={apiKey}
            onGenerate={generateKey}
            onRegenerate={regenerateKey}
          />

          {/* ---------- API Usage Card ---------- */}
          <section className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-3">
              API Usage Today
            </h3>

            <div className="w-full h-3 bg-neutral-300 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-3 bg-neutral-700 dark:bg-white rounded-full"
                style={{ width: `${(usage / 10) * 100}%` }}
              ></div>
            </div>

            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {usage} / 10 requests used
            </p>
          </section>

        </main>
      </div>
    </div>
  );
}
