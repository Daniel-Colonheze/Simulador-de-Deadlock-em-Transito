"use client";

import { motion } from "framer-motion";
import { Github, BookOpen, Code } from "lucide-react";

export function Footer() {
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
              Sobre o Projeto
            </h4>
            <p className="text-sm text-muted-foreground">
              Simulação interativa do problema clássico de deadlock em sistemas
              concorrentes, demonstrando como múltiplos processos podem entrar
              em estado de espera circular.
            </p>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Code className="w-4 h-4" />
              Tecnologias
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
              Referências
            </h4>
            <p className="text-sm text-muted-foreground">
              Baseado no problema clássico dos Filósofos Jantantes e conceitos
              de Sistemas Operacionais.
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p className="mt-1">Feito por Daniel Colonheze 2026 • Todos os direitos reservados ©</p>
        </div>
      </div>
    </motion.footer>
  );
}
