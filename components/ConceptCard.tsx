import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ConceptCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  variant?: "default" | "danger" | "success";
}

export function ConceptCard({ title, icon, children, variant = "default" }: ConceptCardProps) {
  const variantStyles = {
    default: "border-border bg-card",          // sólido (cor do tema)
    danger: "border-accent-north/30 bg-card", // sólido (usa bg-card)
    success: "border-accent-south/30 bg-card", // sólido (usa bg-card)
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl border ${variantStyles[variant]} p-6 hover:shadow-lg transition-shadow`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-muted/30">{icon}</div>
        <h3 className="font-serif text-xl font-semibold text-foreground">{title}</h3>
      </div>
      <div className="font-sans text-muted-foreground">{children}</div>
    </motion.div>
  );
}