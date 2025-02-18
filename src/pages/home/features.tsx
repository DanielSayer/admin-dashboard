import { motion } from "motion/react";
import { ArrowUpRight, ToggleRight } from "lucide-react";
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
];

export function Features() {
  return (
    <section className="py-24 px-4">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white pb-2">
          Built with Modern Tech Stack
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
          Powered by the latest technologies to ensure scalability, security,
          and developer experience.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
              {/* Gradient Background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300">
                <div
                  className={`h-full w-full bg-gradient-to-br ${feature.color}`}
                ></div>
              </div>
              <Link to={feature.url} target="_blank" className="block">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                      <feature.icon className="h-6 w-6" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {feature.name}
                      </h3>
                    </div>
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
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
