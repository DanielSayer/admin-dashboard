"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { logOut } from "@/server/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogOut, Settings, Sparkles, User } from "lucide-react";
import { Link, useNavigate } from "react-router";

export function UserProfile() {
  const { user } = useAuth();
  const client = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["user"] });
      navigate("/");
    },
  });

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9 rounded-full ring-1 ring-border">
            <AvatarFallback className="bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-200">
              {user.firstName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.fullName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/user-profile">
            <DropdownMenuItem className="focus:bg-blue-50 dark:focus:bg-blue-950">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          <Link to="/dashboard/settings">
            <DropdownMenuItem className="focus:bg-blue-50 dark:focus:bg-blue-950">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
          <Link to="/#pricing">
            <DropdownMenuItem className="focus:bg-blue-50 dark:focus:bg-blue-950">
              <Sparkles className="mr-2 h-4 w-4" />
              <span>Upgrade Plan</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Button
          asChild
          variant="ghost"
          className="flex w-full justify-start p-2"
          onClick={() => mutate()}
        >
          <DropdownMenuItem className="focus:bg-blue-50 dark:focus:bg-blue-950">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
