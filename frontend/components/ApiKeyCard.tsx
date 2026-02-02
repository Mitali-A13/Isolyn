"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Copy } from "lucide-react";

export default function ApiKeyCard({
  apiKey,
  onGenerate,
  onRegenerate,
}: {
  apiKey: string | null;
  onGenerate: () => void;
  onRegenerate: () => void;
}) {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!apiKey) return;
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const masked = apiKey
    ? apiKey.substring(0, 4) + "-xxxx-xxxx-xxxx"
    : "";

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
      <h3 className="text-lg font-medium mb-4">Your API Key</h3>

      {/* CASE 1 — User has NO key */}
      {!apiKey && (
        <Button className="w-fit" onClick={onGenerate}>
          Generate API Key
        </Button>
      )}

      {/* CASE 2 — User already HAS key */}
      {apiKey && (
        <>
          <div className="flex gap-3 items-center">
            <input
              readOnly
              className="flex-grow px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-sm"
              value={showKey ? apiKey : masked}
            />

            <Button
              variant="secondary"
              size="icon"
              className="rounded-xl"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>

            <Button
              variant="secondary"
              size="icon"
              className="rounded-xl"
              onClick={handleCopy}
            >
              <Copy size={18} />
            </Button>
          </div>

          <Button
            variant="destructive"
            className="mt-4 w-fit rounded-xl"
            onClick={onRegenerate}
          >
            Regenerate API Key
          </Button>
        </>
      )}
    </div>
  );
}
