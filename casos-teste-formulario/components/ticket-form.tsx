"use client"

import { useRef, useState, type FormEvent } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { TicketConfirmation } from "@/components/ticket-confirmation"
import {
  EMPTY_TICKET,
  FIELD_ORDER,
  MIN_DESCRIPTION_LENGTH,
  TICKET_CATEGORIES,
  validateField,
  validateTicket,
  type TicketCategory,
  type TicketErrors,
  type TicketField,
  type TicketValues,
} from "@/lib/ticket-validation"

function generateProtocol() {
  const year = new Date().getFullYear()
  const sequence = Math.floor(100000 + Math.random() * 900000)
  return `ND-${year}-${sequence}`
}

const inputClass = "h-10 bg-card"

export function TicketForm() {
  const [values, setValues] = useState<TicketValues>(EMPTY_TICKET)
  const [errors, setErrors] = useState<TicketErrors>({})
  const [touched, setTouched] = useState<Partial<Record<TicketField, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState<{ protocol: string; ticket: TicketValues } | null>(null)

  const fieldRefs = useRef<Partial<Record<TicketField, HTMLElement | null>>>({})

  function updateValue<K extends TicketField>(field: K, value: TicketValues[K]) {
    const next = { ...values, [field]: value }
    setValues(next)
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, next) }))
    }
  }

  function handleBlur(field: TicketField) {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values) }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateTicket(values)
    setErrors(nextErrors)
    setTouched({ name: true, email: true, category: true, description: true })

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field])
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus()
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 700))
    setIsSubmitting(false)
    setSubmitted({ protocol: generateProtocol(), ticket: values })
  }

  function resetForm() {
    setValues(EMPTY_TICKET)
    setErrors({})
    setTouched({})
    setSubmitted(null)
  }

  if (submitted) {
    return (
      <TicketConfirmation
        protocol={submitted.protocol}
        ticket={submitted.ticket}
        onNewTicket={resetForm}
      />
    )
  }

  const descriptionLength = values.description.trim().length
  const errorCount = Object.values(errors).filter(Boolean).length

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby="ticket-form-title"
      className="flex flex-col gap-6 rounded-2xl border bg-card p-6 text-card-foreground shadow-sm md:p-8"
    >
      <div className="flex flex-col gap-1">
        <h2 id="ticket-form-title" className="text-xl font-semibold">
          Abrir um ticket
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Todos os campos são obrigatórios.
        </p>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {errorCount > 0 ? `O formulário tem ${errorCount} erro(s). Revise os campos destacados.` : ""}
      </p>

      <FieldGroup className="gap-5">
        <div className="grid gap-5 md:grid-cols-2">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="name">Nome</FieldLabel>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              placeholder="Maria Silva"
              className={inputClass}
              value={values.name}
              ref={(el) => {
                fieldRefs.current.name = el
              }}
              onChange={(e) => updateValue("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              aria-invalid={!!errors.name}
              aria-required="true"
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && <FieldError id="name-error">{errors.name}</FieldError>}
          </Field>

          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email">E-mail</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="maria@empresa.com"
              className={inputClass}
              value={values.email}
              ref={(el) => {
                fieldRefs.current.email = el
              }}
              onChange={(e) => updateValue("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              aria-invalid={!!errors.email}
              aria-required="true"
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && <FieldError id="email-error">{errors.email}</FieldError>}
          </Field>
        </div>

        <Field data-invalid={!!errors.category}>
          <FieldLabel htmlFor="category">Categoria do problema</FieldLabel>
          <Select
            name="category"
            items={TICKET_CATEGORIES.map(({ value, label }) => ({ value, label }))}
            value={values.category || null}
            onValueChange={(value) => {
              const next = { ...values, category: (value ?? "") as TicketCategory | "" }
              setValues(next)
              setTouched((prev) => ({ ...prev, category: true }))
              setErrors((prev) => ({ ...prev, category: validateField("category", next) }))
            }}
          >
            <SelectTrigger
              id="category"
              className="h-10 w-full bg-card"
              ref={(el) => {
                fieldRefs.current.category = el
              }}
              aria-invalid={!!errors.category}
              aria-required="true"
              aria-describedby={errors.category ? "category-error" : undefined}
            >
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {TICKET_CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && <FieldError id="category-error">{errors.category}</FieldError>}
        </Field>

        <Field data-invalid={!!errors.description}>
          <FieldLabel htmlFor="description">Descrição</FieldLabel>
          <Textarea
            id="description"
            name="description"
            rows={6}
            placeholder="Conte o que aconteceu, quando começou e o que você já tentou fazer."
            className="min-h-36 resize-y bg-card leading-relaxed"
            value={values.description}
            ref={(el) => {
              fieldRefs.current.description = el
            }}
            onChange={(e) => updateValue("description", e.target.value)}
            onBlur={() => handleBlur("description")}
            aria-invalid={!!errors.description}
            aria-required="true"
            aria-describedby={
              errors.description ? "description-error description-count" : "description-count"
            }
          />
          <div className="flex items-start justify-between gap-4">
            {errors.description ? (
              <FieldError id="description-error">{errors.description}</FieldError>
            ) : (
              <FieldDescription>Mínimo de {MIN_DESCRIPTION_LENGTH} caracteres.</FieldDescription>
            )}
            <span
              id="description-count"
              className={
                descriptionLength >= MIN_DESCRIPTION_LENGTH
                  ? "shrink-0 font-mono text-xs text-primary"
                  : "shrink-0 font-mono text-xs text-muted-foreground"
              }
            >
              {descriptionLength}/{MIN_DESCRIPTION_LENGTH}
            </span>
          </div>
        </Field>
      </FieldGroup>

      <Button type="submit" className="h-11 w-full text-base" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            Enviando...
          </>
        ) : (
          "Abrir ticket"
        )}
      </Button>
    </form>
  )
}
