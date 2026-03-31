"use client";

import { motion } from "framer-motion";
import { Lightbulb, Shield, Lock, ListOrdered, Ban, TrafficCone } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

export function SolutionCard() {
  const { t } = useLocale();

  const strategies = [
    {
      icon: <ListOrdered className="w-5 h-5 text-accent-east" />,
      title: t("solution.strategy1.title"),
      description: t("solution.strategy1.description"),
    },
    {
      icon: <Ban className="w-5 h-5 text-accent-north" />,
      title: t("solution.strategy2.title"),
      description: t("solution.strategy2.description"),
    },
    {
      icon: <TrafficCone className="w-5 h-5 text-accent-south" />,
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
      className="bg-card rounded-xl border border-border p-6"
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">
        {t("solution.title")}
      </h3>

      <div className="space-y-4">
        {strategies.map((strategy, i) => (
          <motion.div
            key={strategy.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <div className="p-2 rounded-lg bg-card border border-border">
              {strategy.icon}
            </div>
            <div>
              <h4 className="font-medium text-foreground">{strategy.title}</h4>
              <p className="text-sm text-muted-foreground">{strategy.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
