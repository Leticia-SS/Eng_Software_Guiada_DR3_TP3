"use client"

import { useEffect, useRef } from "react"
import { CircleCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCategoryLabel, type TicketValues } from "@/lib/ticket-validation"

type TicketConfirmationProps = {
  protocol: string
  ticket: TicketValues
  onNewTicket: () => void
}

export function TicketConfirmation({ protocol, ticket, onNewTicket }: TicketConfirmationProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <section
      aria-labelledby="confirmation-title"
      className="animate-in fade-in zoom-in-95 duration-300 overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm"
    >
      <div className="flex flex-col items-center gap-4 bg-primary px-6 py-10 text-center text-primary-foreground">
        <CircleCheck className="size-12" aria-hidden="true" />
        <div className="flex flex-col gap-2">
          <h2
            id="confirmation-title"
            ref={headingRef}
            tabIndex={-1}
            className="text-2xl font-semibold text-balance outline-none"
          >
            Ticket aberto com sucesso
          </h2>
          <p className="text-pretty leading-relaxed opacity-90">
            {"Obrigado, "}
            {ticket.name.trim().split(" ")[0]}
            {". Nossa equipe vai responder em "}
            <span className="font-medium">{ticket.email.trim()}</span>.
          </p>
        </div>
      </div>

      <div className="relative border-t-2 border-dashed border-border">
        <span aria-hidden="true" className="absolute -top-3 -left-3 size-6 rounded-full bg-background" />
        <span aria-hidden="true" className="absolute -top-3 -right-3 size-6 rounded-full bg-background" />
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-5 px-6 py-6 text-sm">
        <div className="col-span-2 flex flex-col gap-1">
          <dt className="text-muted-foreground">Protocolo</dt>
          <dd className="font-mono text-2xl font-semibold tracking-wider text-primary">{protocol}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-muted-foreground">Categoria</dt>
          <dd className="font-medium">{getCategoryLabel(ticket.category)}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-muted-foreground">Status</dt>
          <dd className="font-medium">Aguardando atendimento</dd>
        </div>
        <div className="col-span-2 flex flex-col gap-1">
          <dt className="text-muted-foreground">Descrição</dt>
          <dd className="line-clamp-3 leading-relaxed">{ticket.description.trim()}</dd>
        </div>
      </dl>

      <div className="px-6 pb-6">
        <Button variant="outline" className="h-10 w-full" onClick={onNewTicket}>
          Abrir outro ticket
        </Button>
      </div>
    </section>
  )
}
