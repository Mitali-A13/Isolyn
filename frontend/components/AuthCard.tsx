import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="w-full max-w-md border border-white/10 bg-black/40 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
