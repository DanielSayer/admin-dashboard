import { motion } from "motion/react";
import {
  ArrowUpRight,
  ClipboardList,
  Key,
  Lock,
  ToggleRight,
  UserCog,
  Variable,
} from "lucide-react";
import { Link } from "react-router";

const features = [
  {
    id: 1,
    name: "Feature Toggles",
    description:
      "Seamlessly manage feature toggles for your application with ease.",
    icon: ToggleRight,
    url: "/dashboard/feature-toggles",
    color: "from-[#000000] to-[#3B3B3B]",
  },
  {
    id: 2,
    name: "Permissions",
    description: "Configure and manage user permissions",
    icon: UserCog,
    url: "/dashboard/permissions",
    color: "from-[#007ACC] to-[#2F74C0]",
  },
  {
    id: 3,
    name: "Subscription Management",
    description: "Manage subscription access modules and plans",
    icon: Lock,
    url: "/dashboard/subscriptions",
    color: "from-[#38BDF8] to-[#818CF8]",
  },
  {
    id: 4,
    name: "Analytics",
    description: "Track user activity and performance",
    icon: ClipboardList,
    url: "/dashboard/analytics",
    color: "from-[#000000] to-[#3B3B3B]",
  },
  {
    id: 5,
    name: "API Keys",
    description: "Securely manage API keys for your application",
    icon: Key,
    url: "/dashboard/api-keys",
    color: "from-[#0066FF] to-[#00CCFF]",
  },
  {
    id: 6,
    name: "Environment Variables",
    description: "Manage environment variables for your application",
    icon: Variable,
    url: "/dashboard/environment-variables",
    color: "from-[#FF4F00] to-[#FF8A00]",
  },
];

export function Features() {
  return (
    <section className="px-4 py-24">
      {/* Section Header */}
      <div className="mb-16 text-center">
        <h2 className="bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text pb-2 text-3xl font-bold text-transparent dark:from-white dark:via-blue-300 dark:to-white md:text-4xl">
          Feature Rich
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-300">
          Built to include all the features you need to manage your cutting edge
          SaaS application.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="group relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
              {/* Gradient Background */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-5">
                <div
                  className={`h-full w-full bg-gradient-to-br ${feature.color}`}
                ></div>
              </div>
              <Link to={feature.url} target="_blank" className="block">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <feature.icon className="h-6 w-6" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {feature.name}
                      </h3>
                    </div>
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
