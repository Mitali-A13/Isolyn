"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

export default function ApiPlayground() {
  const [apiKey, setApiKey] = useState("");
  const [collection, setCollection] = useState("tasks");
  const [method, setMethod] = useState("create");
  const [inputJson, setInputJson] = useState(`{ "hello": "world" }`);
  const [responseJson, setResponseJson] = useState("");

  const sendRequest = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/data/${method}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
          body: JSON.stringify({
            collection,
            data: JSON.parse(inputJson),
          }),
        }
      );

      const data = await res.json();
      setResponseJson(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setResponseJson("Error: " + err.message);
    }
  };

  return (
    <div className="p-8 text-white space-y-6">
      <h1 className="text-2xl font-semibold">API Playground</h1>

      {/* API Key Input */}
      <div>
        <p className="mb-1">Your API Key</p>
        <input
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your API key"
          className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded"
        />
      </div>

      {/* Collection Selector */}
      <div>
        <p className="mb-1">Collection</p>
        <select
          value={collection}
          onChange={(e) => setCollection(e.target.value)}
          className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded"
        >
          <option value="tasks">Tasks</option>
          <option value="notes">Notes</option>
        </select>
      </div>

      {/* Method */}
      <div>
        <p className="mb-1">Method</p>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded"
        >
          <option value="create">Create</option>
          <option value="read">Read</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
        </select>
      </div>

      {/* JSON Input */}
      <div>
        <p className="mb-1">JSON Input</p>
        <textarea
          rows={6}
          value={inputJson}
          onChange={(e) => setInputJson(e.target.value)}
          className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded"
        ></textarea>
      </div>

      <Button onClick={sendRequest} className="bg-blue-600 mt-2">
        Send Request
      </Button>

      {/* Response Window */}
      <div>
        <p className="mt-6 mb-1">Response</p>
        <pre className="w-full p-4 bg-black/40 border border-neutral-700 rounded h-64 overflow-auto">
          {responseJson || "Response will appear here..."}
        </pre>
      </div>
    </div>
  );
}
