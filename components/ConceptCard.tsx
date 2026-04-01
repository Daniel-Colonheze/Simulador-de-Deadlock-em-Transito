"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ConceptCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  variant?: "default" | "danger" | "success";
}

export function ConceptCard({ title, icon, children, variant = "default" }: ConceptCardProps) {
  const variantStyles = {
    default: "bg-card border-border",
    danger: "bg-card border-accent-north/30",
    success: "bg-card border-accent-south/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl border ${variantStyles[variant]} p-5 sm:p-6 hover:shadow-lg transition-shadow`}
    >
      <div className="flex items-center gap-3 mb-3 sm:mb-4">
        <div className="p-1.5 sm:p-2 rounded-lg bg-muted/30">{icon}</div>
        <h3 className="text-lg sm:text-xl font-semibold text-foreground">{title}</h3>
      </div>
      <div className="text-sm sm:text-base text-muted-foreground">{children}</div>
    </motion.div>
  );
}