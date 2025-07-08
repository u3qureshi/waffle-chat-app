import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import Logo from '../../public/images/logo.svg?react';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
              >
                <Logo className="w-12 h-12" />
              </div>
              <h1 className="text-2xl font-bold mt-2 text-brown-900">Welcome Back</h1>
              <p className="text-base-content/60 text-brown-700">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-brown-600">Username or Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40 z-10 stroke-dijon-800" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10 selection:bg-yellow-200 focus:border-brown-400 focus:outline-yellow-200`}
                  placeholder="JohnHoe@example.com"
                  value={formData.emailOrUsername}
                  onChange={(e) => setFormData({ ...formData, emailOrUsername: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-brown-600">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40 z-10 stroke-dijon-800" />
                </div> 
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 selection:bg-yellow-200 focus:border-brown-400 focus:outline-yellow-200`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="stroke-dijon-800 h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="stroke-dijon-800 h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full text-brown-900 bg-dijon-400/70 border-brown-900" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin stroke-dijon-700" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60 text-brown-800">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link hover:text-dijon-500 text-yellow-600">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={"Sign in to continue waffling with friends and family."}
      />
    </div>
  );
};
export default LoginPage;