import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import Logo from '../assets/images/logo.svg?react';

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="border-b border-brown-500/40 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80 bg-gradient-to-r from-yellow-100/10 to-brown-500/5"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Logo className="w-10 h-10" />
              </div>
              <h1 className="text-lg font-bold text-brown-900">Waffle</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors bg-dijon-100/30 border-1 border-brown-200
              
              `}
            >
              <Settings className="w-4 h-4 stroke-brown-900" />
              <span className="hidden sm:inline text-brown-900">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2 bg-dijon-100/30 border-1 border-brown-200`}>
                  <User className="size-5 stroke-brown-900" />
                  <span className="hidden sm:inline text-brown-900">Profile</span>
                </Link>

                <button className="p-1 rounded-md flex gap-2 items-center transition-colors border-1 border-brown-200" onClick={logout}>
                  <LogOut className="size-5 stroke-brown-900" />
                  <span className="hidden sm:inline text-brown-900">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;