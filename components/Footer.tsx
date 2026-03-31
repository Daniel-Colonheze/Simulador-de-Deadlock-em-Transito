"use client";

import { motion } from "framer-motion";
import { Github, BookOpen, Code } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

export function Footer() {
  const { t, locale } = useLocale();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="border-t border-border bg-card/30 mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {locale === "pt" ? "Sobre o Projeto" : "About the Project"}
            </h4>
            <p className="text-sm text-muted-foreground">
              {locale === "pt"
                ? "Simulação interativa do problema clássico de deadlock em sistemas concorrentes, demonstrando como múltiplos processos podem entrar em estado de espera circular."
                : "Interactive simulation of the classic deadlock problem in concurrent systems, demonstrating how multiple processes can enter a circular wait state."}
            </p>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Code className="w-4 h-4" />
              {locale === "pt" ? "Tecnologias" : "Technologies"}
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>React + TypeScript</li>
              <li>Next.js</li>
              <li>Tailwind CSS</li>
              <li>Framer Motion</li>
              <li>Canvas API</li>
            </ul>
          </div>

          {/* References */}
          <div>
            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Github className="w-4 h-4" />
              {locale === "pt" ? "Referências" : "References"}
            </h4>
            <p className="text-sm text-muted-foreground">
              {t("footer.inspired")}
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p className="mt-1">
            {locale === "pt"
              ? "Projeto Educacional • 2026"
              : "Educational Project • 2026"}
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
