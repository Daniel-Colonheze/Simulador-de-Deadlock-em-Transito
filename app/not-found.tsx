import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Página não encontrada</h2>
      <p className="mb-4">A página que você procura não existe.</p>
      <Link href="/" className="px-4 py-2 bg-primary text-white rounded-lg">
        Voltar para o início
      </Link>
    </div>
  );
}