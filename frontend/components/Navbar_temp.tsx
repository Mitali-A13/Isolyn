"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <nav className="flex items-center justify-between border-b border-white/10 px-6 py-4">
      <h1 className="text-lg font-semibold">Isolyn</h1>

      <button
        onClick={handleLogout}
        className="text-sm text-red-400 hover:underline"
      >
        Logout
      </button>
    </nav>
  );
}
