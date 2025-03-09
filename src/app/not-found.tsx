import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-9xl font-extrabold text-gray-700">404</h1>
      <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mt-4">Página no encontrada</h2>
      <p className="mt-6 text-lg text-muted-foreground max-w-lg">
        Lo sentimos, no pudimos encontrar la página que estás buscando.
      </p>
      <div className="mt-10">
        <Button asChild size="lg">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
        </Button>
      </div>
    </div>
  )
}

