"use client";

import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";

export default function RateLimitCard({
  usage,
  limit,
}: {
  usage: number;
  limit: number;
}) {
  const percentage = Math.min((usage / limit) * 100, 100);

  return (
    <Card className="bg-neutral-900 border-neutral-800">
      <CardHeader>
        <CardTitle>API Usage Today</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="w-full bg-neutral-800 h-3 rounded">
          <div
            className="bg-green-500 h-3 rounded"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <p className="text-sm mt-2 text-neutral-400">
          {usage} / {limit} requests used
        </p>
      </CardContent>
    </Card>
  );
}
