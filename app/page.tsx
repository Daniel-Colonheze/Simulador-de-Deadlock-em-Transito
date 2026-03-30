"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  BookOpen,
  Car,
  Lightbulb,
  Play,
  Shield,
  TrafficCone,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SimulationCanvas } from "@/components/SimulationCanvas";
import { ConceptCard } from "@/components/ConceptCard";
import { DeadlockDiagram } from "@/components/DeadlockDiagram";
import { SolutionCard } from "@/components/SolutionCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Entendendo o{" "}
              <span className="text-gradient">Deadlock</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Uma simulação interativa do problema clássico de concorrência em
              sistemas operacionais, usando um cenário de trânsito para demonstrar
              como múltiplos processos podem entrar em deadlock.
            </p>
          </motion.div>
        </section>

        {/* Introduction Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <ConceptCard
            title="O que é Deadlock?"
            icon={<AlertTriangle className="w-5 h-5 text-accent-north" />}
            variant="danger"
          >
            <p>
              Deadlock é uma situação onde dois ou mais processos ficam
              bloqueados indefinidamente, cada um esperando por um recurso
              que está sendo segurado por outro processo.
            </p>
          </ConceptCard>

          <ConceptCard
            title="Condições Necessárias"
            icon={<BookOpen className="w-5 h-5 text-accent-east" />}
          >
            <ul className="list-disc list-inside space-y-1">
              <li>Exclusão mútua</li>
              <li>Posse e espera</li>
              <li>Sem preempção</li>
              <li>Espera circular</li>
            </ul>
          </ConceptCard>

          <ConceptCard
            title="Analogia com Trânsito"
            icon={<Car className="w-5 h-5 text-accent-south" />}
            variant="success"
          >
            <p>
              Em um cruzamento, quando quatro carros entram simultaneamente,
              cada um bloqueia o outro, criando um ciclo de espera onde
              nenhum consegue avançar.
            </p>
          </ConceptCard>
        </section>

        {/* Problem Simulation */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="p-2 bg-accent-north/20 rounded-lg">
              <TrafficCone className="w-6 h-6 text-accent-north" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Cenário do Problema</h2>
              <p className="text-muted-foreground">
                Sem controle de fluxo - observe como o deadlock ocorre naturalmente
              </p>
            </div>
          </motion.div>

          <SimulationCanvas
            mode="deadlock"
            title="Modo: Problema"
            description="Carros entram no cruzamento sem coordenação. Quando múltiplos carros ocupam a interseção simultaneamente, ocorre colisão e deadlock."
          />
        </section>

        {/* Diagram Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <DeadlockDiagram />
          <SolutionCard />
        </section>

        {/* Solution Simulation */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="p-2 bg-accent-south/20 rounded-lg">
              <Shield className="w-6 h-6 text-accent-south" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Cenário com Solução</h2>
              <p className="text-muted-foreground">
                Com semáforos - controle de fluxo alternado entre direções
              </p>
            </div>
          </motion.div>

          <SimulationCanvas
            mode="solution"
            title="Modo: Solução"
            description="Semáforos controlam o acesso ao cruzamento. Apenas uma direção por vez pode atravessar, eliminando o deadlock."
          />
        </section>

        {/* Learning Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-secondary to-card rounded-xl border border-border p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-6 h-6 text-accent-west" />
              <h2 className="text-2xl font-bold text-foreground">
                Conceitos Aprendidos
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Sistemas Concorrentes</h3>
                <p className="text-muted-foreground">
                  Processos concorrentes competem por recursos compartilhados.
                  Sem mecanismos adequados de sincronização, situações de
                  corrida e deadlock podem ocorrer.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Prevenção de Deadlock</h3>
                <p className="text-muted-foreground">
                  Estratégias como ordenação de recursos, alocação preventiva
                  e controle de acesso garantem que pelo menos uma das quatro
                  condições de Coffman nunca seja satisfeita.
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-accent-east/10 rounded-lg border border-accent-east/20">
              <p className="text-sm text-foreground">
                <strong>Nota:</strong> Esta simulação é inspirada no problema clássico
                dos Filósofos Jantantes, proposto por Edsger Dijkstra em 1965
                para ilustrar problemas de sincronização em sistemas concorrentes.
              </p>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
