import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is blocked due to too many attempts
    if (isBlocked) {
      setError("Too many failed attempts. Please try again later.");
      return;
    }

    setIsLoading(true);
    setError("");

    // Input validation and sanitization
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    // Check for empty fields
    if (!trimmedEmail || !trimmedPassword) {
      setError("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Strict credential validation
    const validEmail = "admin@speaksify.com";
    const validPassword = "Alliance@8069409";

    if (trimmedEmail === validEmail && trimmedPassword === validPassword) {
      // Store authentication in sessionStorage for persistence
      const loginTime = Date.now().toString();
      sessionStorage.setItem('speaksify_authenticated', 'true');
      sessionStorage.setItem('speaksify_user', validEmail);
      sessionStorage.setItem('speaksify_login_time', loginTime);
      onLogin();
    } else {
      // Increment failed attempts
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 5) {
        setIsBlocked(true);
        setError("Too many failed attempts. Access blocked for security reasons.");
        // Auto-unblock after 5 minutes
        setTimeout(() => {
          setIsBlocked(false);
          setAttempts(0);
        }, 5 * 60 * 1000);
      } else {
        setError(`Invalid email or password. ${5 - newAttempts} attempts remaining.`);
      }
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <motion.div 
              className="mx-auto mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 grid place-items-center text-white font-bold text-2xl shadow-lg">
                S
              </div>
            </motion.div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Speaksify Dashboard
            </CardTitle>
            <p className="text-sm text-slate-600 mt-2">
              Sign in to access your payments analytics
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                >
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </motion.div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@speaksify.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white border-slate-200 focus:border-blue-300 focus:ring-blue-200"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-white border-slate-200 focus:border-blue-300 focus:ring-blue-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <Button
                type="submit"
                disabled={isLoading || isBlocked}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2.5 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : isBlocked ? (
                  "Access Blocked"
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
            
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
