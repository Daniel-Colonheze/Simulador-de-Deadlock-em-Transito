"use client";

import { motion } from "framer-motion";
import { Lightbulb, Shield, Lock, ListOrdered, Ban, TrafficCone } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

export function SolutionCard() {
  const { t } = useLocale();

  const strategies = [
    {
      icon: <ListOrdered className="w-4 h-4 sm:w-5 sm:h-5 text-accent-east" />,
      title: t("solution.strategy1.title"),
      description: t("solution.strategy1.description"),
    },
    {
      icon: <Ban className="w-4 h-4 sm:w-5 sm:h-5 text-accent-north" />,
      title: t("solution.strategy2.title"),
      description: t("solution.strategy2.description"),
    },
    {
      icon: <TrafficCone className="w-4 h-4 sm:w-5 sm:h-5 text-accent-south" />,
      title: t("solution.strategy3.title"),
      description: t("solution.strategy3.description"),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-xl border border-border p-4 sm:p-5 md:p-6"
    >
      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground mb-3 sm:mb-4">
        {t("solution.title")}
      </h3>

      <div className="space-y-3 sm:space-y-4">
        {strategies.map((strategy, i) => (
          <motion.div
            key={strategy.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <div className="p-1.5 sm:p-2 rounded-lg bg-card border border-border">
              {strategy.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground text-sm sm:text-base">
                {strategy.title}
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {strategy.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}