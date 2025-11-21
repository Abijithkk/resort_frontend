"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { authAPI } from "@/lib/api";
import { toast } from "sonner";
import { Palmtree, Mail, Lock, Shield } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authAPI.isAdmin()) {
      router.push("/admin/bookings");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await authAPI.login(email, password);
      if (result.success) {
        const user = result.data.user;
        if (user.role === "admin") {
          toast.success("Admin access granted");
          router.push("/admin/bookings");
          router.refresh();
        } else {
          setError("Access denied. Admin credentials required.");
          toast.error("Access denied. Admin credentials required.");
          authAPI.logout();
        }
      }
    } catch (error) {
      const errorMessage = error.message || "Invalid admin credentials";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Palmtree className="w-10 h-10 text-primary" />
            <span className="text-2xl font-bold text-white">Paradise Retreat</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            Admin Portal
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-slate-400">Sign in with admin credentials</p>
        </div>

        <Card className="border-0 bg-slate-800/90 backdrop-blur-2xl shadow-[0_35px_80px_rgba(0,0,0,0.3)]">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-white">Admin Sign In</CardTitle>
            <CardDescription className="text-slate-400">
              Use your admin credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="pl-10 h-12 rounded-xl bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="pl-10 h-12 rounded-xl bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-primary via-emerald-400 to-sky-500 text-white font-semibold shadow-xl shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                {isLoading ? "Signing in..." : "Sign In as Admin"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <Link href="/login" className="text-slate-400 hover:text-primary transition-colors">
                ← Back to User Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

