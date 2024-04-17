"use client"

import * as React from "react"
import { DialogProps } from "@radix-ui/react-alert-dialog"
import {
  CircleIcon,
  FileIcon,
  LaptopIcon,
  Link1Icon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

export type NavItem = {
  title: string;
  href?: string;
  external?: true;
  items?: NavItem[]
  icon?: React.ReactNode;
}

export type CommandMenuProps = DialogProps & {
  onMenuItemSelect: (navItem: NavItem) => void;
  docsNav: NavItem[];
  className?: string;
  placeholder?: string;
  placeholderSmall?: string;
  commandEmpty?: React.ReactNode;
}

export function CommandMenu({
  onMenuItemSelect,
  docsNav,
  className,
  commandEmpty = 'No results found.',
  placeholder = 'Search documentation...',
  placeholderSmall = 'Search...',
  ...props
  }: CommandMenuProps) {
  const [open, setOpen] = React.useState(false)
  const { setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  const onSelect = React.useCallback((navItem: NavItem) => {
    console.log('onSelect', navItem)
    runCommand(() => onMenuItemSelect(navItem))
  }, [runCommand, onMenuItemSelect])

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "flex h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none",
          className
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">{placeholder}</span>
        <span className="inline-flex lg:hidden">{placeholderSmall}</span>
        <kbd className="ml-auto pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="bg-white">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>
            {commandEmpty}
          </CommandEmpty>
          {docsNav.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items?.map((navItem) => (
                <CommandItem
                  key={navItem.href}
                  value={navItem.title}
                  onSelect={() => onSelect(navItem)}
                  className="aria-selected:bg-accent cursor-pointer"
                >
                  <div className="mr-2 flex h-4 w-4 items-center justify-center">
                    {
                      group.icon ? (
                        group.icon
                      ) : (
                        <CircleIcon className="h-3 w-3" />
                      )
                    }
                  </div>
                  {navItem.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <SunIcon className="mr-2 h-4 w-4" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <MoonIcon className="mr-2 h-4 w-4" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <LaptopIcon className="mr-2 h-4 w-4" />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
        </div>
      </CommandDialog>
    </>
  )
}
