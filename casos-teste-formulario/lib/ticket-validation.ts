export const TICKET_CATEGORIES = [
  { value: "tecnico", label: "Problema técnico" },
  { value: "cobranca", label: "Cobrança" },
  { value: "duvida", label: "Dúvida" },
  { value: "sugestao", label: "Sugestão" },
] as const

export type TicketCategory = (typeof TICKET_CATEGORIES)[number]["value"]

export type TicketValues = {
  name: string
  email: string
  category: TicketCategory | ""
  description: string
}

export type TicketField = keyof TicketValues
export type TicketErrors = Partial<Record<TicketField, string>>

export const MIN_DESCRIPTION_LENGTH = 20

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const EMPTY_TICKET: TicketValues = {
  name: "",
  email: "",
  category: "",
  description: "",
}

export function validateField(field: TicketField, values: TicketValues): string | undefined {
  switch (field) {
    case "name": {
      const name = values.name.trim()
      if (!name) return "Informe seu nome."
      if (name.length < 2) return "O nome precisa ter pelo menos 2 caracteres."
      return undefined
    }
    case "email": {
      const email = values.email.trim()
      if (!email) return "Informe seu e-mail."
      if (!EMAIL_PATTERN.test(email)) return "Digite um e-mail válido, como nome@empresa.com."
      return undefined
    }
    case "category":
      return values.category ? undefined : "Selecione a categoria do problema."
    case "description": {
      const length = values.description.trim().length
      if (length === 0) return "Descreva o problema que você está enfrentando."
      if (length < MIN_DESCRIPTION_LENGTH)
        return `A descrição precisa ter pelo menos ${MIN_DESCRIPTION_LENGTH} caracteres (faltam ${MIN_DESCRIPTION_LENGTH - length}).`
      return undefined
    }
  }
}

export const FIELD_ORDER: TicketField[] = ["name", "email", "category", "description"]

export function validateTicket(values: TicketValues): TicketErrors {
  const errors: TicketErrors = {}
  for (const field of FIELD_ORDER) {
    const error = validateField(field, values)
    if (error) errors[field] = error
  }
  return errors
}

export function getCategoryLabel(value: TicketValues["category"]) {
  return TICKET_CATEGORIES.find((category) => category.value === value)?.label ?? ""
}
