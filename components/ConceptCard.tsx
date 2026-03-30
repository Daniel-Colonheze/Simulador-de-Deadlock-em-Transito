"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ConceptCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  variant?: "default" | "danger" | "success";
}

export function ConceptCard({ title, children, icon, variant = "default" }: ConceptCardProps) {
  const variants = {
    default: "border-border bg-card",
    danger: "border-accent-north/30 bg-accent-north/5",
    success: "border-accent-south/30 bg-accent-south/5",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl border p-6 ${variants[variant]}`}
    >
      <div className="flex items-center gap-3 mb-4">
        {icon && (
          <div className="p-2 rounded-lg bg-muted">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <div className="text-muted-foreground leading-relaxed">{children}</div>
    </motion.div>
  );
}
