import { Clock, LifeBuoy, ShieldCheck } from "lucide-react"
import { TicketForm } from "@/components/ticket-form"

const assurances = [
  { icon: Clock, text: "Primeira resposta em até 4 horas úteis" },
  { icon: ShieldCheck, text: "Seus dados ficam visíveis apenas para a equipe de suporte" },
]

export default function Page() {
  return (
    <main className="min-h-dvh px-4 py-10 md:py-16">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1fr_1.4fr] md:gap-14">
        <header className="flex flex-col gap-6 md:sticky md:top-16 md:self-start">
          <div className="flex items-center gap-2 text-primary">
            <LifeBuoy className="size-6" aria-hidden="true" />
            <span className="text-lg font-semibold tracking-tight">Nimbus Desk</span>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              Como podemos ajudar?
            </h1>
            <p className="leading-relaxed text-muted-foreground text-pretty">
              Descreva sua solicitação e nossa equipe de suporte entra em contato pelo e-mail
              informado. Você recebe um número de protocolo para acompanhar o atendimento.
            </p>
          </div>
          <ul className="flex flex-col gap-3 border-t pt-6">
            {assurances.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm leading-relaxed">
                <Icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </header>

        <TicketForm />
      </div>
    </main>
  )
}
