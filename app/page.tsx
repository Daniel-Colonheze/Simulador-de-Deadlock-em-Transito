"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  BookOpen,
  Car,
  Lightbulb,
  Shield,
  TrafficCone,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SimulationCanvas } from "@/components/SimulationCanvas";
import { ConceptCard } from "@/components/ConceptCard";
import { DeadlockDiagram } from "@/components/DeadlockDiagram";
import { SolutionCard } from "@/components/SolutionCard";
import { useLocale } from "@/contexts/LocaleContext";

export default function Home() {
  const { t, locale } = useLocale();

  const conditionsText = t("concept.conditions.items");
  const conditionsList = conditionsText.split("\n");

  return (
    // Removido bg-background para não cobrir o canvas de partículas
    <div className="min-h-screen">
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
              {t("hero.title")}
              <span className="text-gradient">{t("hero.highlight")}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("hero.description")}
            </p>
          </motion.div>
        </section>

        {/* Introduction Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <ConceptCard
            title={t("concept.what.title")}
            icon={<AlertTriangle className="w-5 h-5 text-accent-north" />}
            variant="danger"
          >
            <p>{t("concept.what.description")}</p>
          </ConceptCard>

          <ConceptCard
            title={t("concept.conditions.title")}
            icon={<BookOpen className="w-5 h-5 text-accent-east" />}
          >
            <ul className="list-disc list-inside space-y-1">
              {conditionsList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </ConceptCard>

          <ConceptCard
            title={t("concept.analogy.title")}
            icon={<Car className="w-5 h-5 text-accent-south" />}
            variant="success"
          >
            <p>{t("concept.analogy.description")}</p>
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
              <h2 className="text-2xl font-bold text-foreground">
                {t("simulation.problem.section")}
              </h2>
              <p className="text-muted-foreground">
                {t("simulation.problem.subtitle")}
              </p>
            </div>
          </motion.div>

          <SimulationCanvas
            mode="deadlock"
            title={t("simulation.problem.mode")}
            description={t("simulation.problem.description")}
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
              <h2 className="text-2xl font-bold text-foreground">
                {t("simulation.solution.section")}
              </h2>
              <p className="text-muted-foreground">
                {t("simulation.solution.subtitle")}
              </p>
            </div>
          </motion.div>

          <SimulationCanvas
            mode="solution"
            title={t("simulation.solution.mode")}
            description={t("simulation.solution.description")}
          />
        </section>

        {/* Learning Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-secondary rounded-xl border border-border p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-6 h-6 text-accent-west" />
              <h2 className="text-2xl font-bold text-foreground">
                {t("learning.title")}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">
                  {t("learning.concurrent.title")}
                </h3>
                <p className="text-muted-foreground">
                  {t("learning.concurrent.description")}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">
                  {t("learning.prevention.title")}
                </h3>
                <p className="text-muted-foreground">
                  {t("learning.prevention.description")}
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-accent-east/10 rounded-lg border border-accent-east/20">
              <p className="text-sm text-foreground">
                <strong>{t("learning.note")}</strong> {t("learning.reference")}
              </p>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}