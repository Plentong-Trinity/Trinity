"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"

type MassMultiSelectProps = {
  id: string
  label: string
  options: readonly string[]
  value: string[]
  disabled: boolean
  onChange: (value: string[]) => void
}

export function MassMultiSelect({ id, label, options, value, disabled, onChange }: MassMultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const summary = options.filter((option) => value.includes(option)).join(", ")

  return (
    <DropdownMenu open={open && !disabled} onOpenChange={(nextOpen) => setOpen(!disabled && nextOpen)}>
      <DropdownMenuTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          disabled={disabled}
          aria-label={`${label}: ${summary || "None selected"}`}
          title={summary || `Select ${label.toLowerCase()}`}
          className="h-10 w-full min-w-0 justify-between gap-2 border-input bg-white px-3 font-normal"
        >
          <span className="truncate">{summary || `Select ${label.toLowerCase()}`}</span>
          <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-slate-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-[12rem]">
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={value.includes(option)}
            disabled={disabled}
            onSelect={(event) => event.preventDefault()}
            onCheckedChange={(checked) => {
              // Menu content is portalled outside the editor's disabled fieldset.
              if (disabled) return
              onChange(options.filter((item) => item === option ? checked === true : value.includes(item)))
            }}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
