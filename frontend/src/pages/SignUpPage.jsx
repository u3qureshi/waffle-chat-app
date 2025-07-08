import { useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
  LetterText,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import toast from "react-hot-toast";
import Logo from '../../public/images/logo.svg?react'; // Adjust the path as necessary

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  function validateForm() {
    if (!formData.fullName.trim()) {
      return toast.error("Full name is required");
    }
    if (!formData.username.trim()) {
      return toast.error("Username is required");
    }
    if (!formData.email.trim()) {
      return toast.error("Email is required");
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return toast.error("Invalid email format");
    }
    if (!formData.password.trim()) {
      return toast.error("Password is required");
    }
    if (formData.password.trim() !== formData.confirmPassword.trim()) {
      return toast.error("Passwords do not match");
    }
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters, include at least one uppercase letter, lowercase letter, and number");
    }
    if (!/[A-Z]/.test(formData.password)) {
      return toast.error("Password must be at least 6 characters, include at least one uppercase letter, lowercase letter, and number");
    }

    if (!/[a-z]/.test(formData.password)) {
      return toast.error("Password must be at least 6 characters, include at least one uppercase letter, lowercase letter, and number");
    }

    if (!/[0-9]/.test(formData.password)) {
      return toast.error("Password must be at least 6 characters, include at least one uppercase letter, lowercase letter, and number");
    }

    return true;
  }
  function handleSubmit(e) {
    e.preventDefault();

    const success = validateForm();

    if (success===true) signup(formData);
    
    
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side: Image or illustration */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Logo className="w-12 h-12" />
              </div>
              <h1 className="text-2xl font-bold text-brown-900">
                Create Account
              </h1>
              <p className="text-brown-700">Join us and start waffling!</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-brown-600">
                  Full Name
                </span>
              </label>
              <div className="relative">
                <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LetterText className="size-5 text-base-content/40 stroke-dijon-800" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10 selection:bg-yellow-200 focus:outline-yellow-200
                    focus:border-brown-400`}
                  placeholder="John Hoe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-brown-600">
                  Username
                </span>
              </label>
              <div className="relative">
                <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="stroke-dijon-800 size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10 selection:bg-yellow-200 focus:outline-yellow-200
                    focus:border-brown-400`}
                  placeholder="JohnHoe69"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-brown-600">
                  Email
                </span>
              </label>
              <div className="relative">
                <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="stroke-dijon-800 size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10 selection:bg-yellow-200 focus:outline-yellow-200
                    focus:border-brown-400`}
                  placeholder="JohnHoe91@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-brown-600">
                  Password
                </span>
              </label>
              <div className="relative">
                <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="stroke-dijon-800 size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 outline-light-yellow selection:bg-yellow-200 focus:outline-yellow-200
                    focus:border-brown-400`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="stroke-dijon-800 size-5 text-base-content/40" />
                  ) : (
                    <Eye className="stroke-dijon-800 size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-brown-600">
                  Confirm Password
                </span>
              </label>
              <div className="relative">
                <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="stroke-dijon-800 size-5 text-base-content/40" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 outline-light-yellow selection:bg-yellow-200 focus:outline-yellow-200
                    focus:border-brown-400`}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="stroke-dijon-800 size-5 text-base-content/40" />
                  ) : (
                    <Eye className="stroke-dijon-800 size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full text-brown-900 bg-dijon-400/70 border-brown-900"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin stroke-dijon-700" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right side: Side image or color */}
      <AuthImagePattern
        title="Join the Waffle Community"
        subtitle="Waffling means talking at length with friends and family!"
      />
    </div>
  );
};

export default SignUpPage;
