import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  ClipboardList,
  Key,
  Lock,
  Receipt,
  Settings,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  UserCog,
  Variable,
} from "lucide-react";
import { Link, useLocation } from "react-router";

const features = [
  {
    title: "Feature Toggle Cards",
    to: "/dashboard/feature-toggle-cards",
    icon: ToggleRight,
  },
  {
    title: "Feature Toggle Table",
    to: "/dashboard/feature-toggle-table",
    icon: ToggleLeft,
  },
  {
    title: "Feature Toggles",
    to: "/dashboard/feature-toggles",
    icon: ToggleRight,
  },
  {
    title: "Permissions",
    to: "/dashboard/permissions",
    icon: UserCog,
  },
  {
    title: "Subscriptions",
    to: "/dashboard/subscriptions",
    icon: Lock,
  },
  {
    title: "Analytics",
    to: "/dashboard/analytics",
    icon: ClipboardList,
  },
  {
    title: "Api Keys",
    to: "/dashboard/api-keys",
    icon: Key,
  },
  {
    title: "Environment Variables",
    to: "/dashboard/environment-variables",
    icon: Variable,
  },
];

const yourAccountFeatures = [
  {
    title: "Profile",
    to: "/dashboard/profile",
    icon: UserCog,
  },
  {
    title: "Billing",
    to: "/dashboard/billing",
    icon: Receipt,
  },
  {
    title: "Settings",
    to: "/dashboard/settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const location = useLocation();

  return (
    <Sidebar
      collapsible="icon"
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/dashboard">
                <Sparkles className="mr-2 h-5 w-5" />
                <span>admin dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Features</SidebarGroupLabel>
          <SidebarMenu>
            {features.map((feature) => (
              <SidebarMenuItem key={feature.title}>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === feature.to}
                >
                  <Link to={feature.to}>
                    <feature.icon className="mr-2 h-5 w-5" />
                    <span>{feature.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Your Account</SidebarGroupLabel>
          <SidebarMenu>
            {yourAccountFeatures.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === item.to}
                >
                  <Link to={item.to}>
                    <item.icon className="mr-2 h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <SidebarTrigger />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}
