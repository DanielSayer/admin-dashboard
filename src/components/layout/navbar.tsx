import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { ThemeToggle } from "../providers/theme/theme-toggle";
import { useAuth } from "@clerk/clerk-react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { UserProfile } from "./user-profile";

export default function NavBar() {
  const { userId } = useAuth();

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md bg-white/80 dark:bg-black/80"
    >
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <div className="hidden lg:flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <span className="font-semibold">admin dashboard</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {!userId && (
            <Link to="/sign-in">
              <Button
                variant="default"
                className="bg-blue-600 hover:bg-blue-500 text-white"
              >
                Sign in
              </Button>
            </Link>
          )}
          {userId && <UserProfile />}
        </div>
      </div>
    </motion.div>
  );
}
