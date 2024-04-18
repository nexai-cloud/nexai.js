"use client"

import * as React from "react"
import { DialogProps } from "@radix-ui/react-alert-dialog"
import {
  CircleIcon,
  LaptopIcon,
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
  // CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { ArrowRightCircleIcon, PiIcon, SearchIcon, ZapIcon } from "lucide-react"
import { IconRight } from "react-day-picker"

export type NavItem = {
  title: string;
  href?: string;
  external?: true;
  items?: NavItem[]
  icon?: React.ReactNode;
  label?: string;
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
  const [input, setInput] = React.useState('')

  const search = new RegExp(input, 'ig')
  const visibleNav = docsNav.map(item => {
    const items = item.items?.filter(i => {
      return i.title.match(search) || i.href?.match(search)
    })
    if (items?.length) {
      return {
        ...item,
        items
      }
    }
  }).filter(i => i)

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
        <div className="flex items-center border-b px-3">
          <SearchIcon className="text-blue-500 mr-2 h-4 w-4 shrink-0" />
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={placeholder}
            cmdk-input
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        {/* <CommandInput placeholder={placeholder} /> */}
        <CommandList>
          <CommandEmpty>
            {commandEmpty}
          </CommandEmpty>
          {visibleNav.map((group) => group && (
            <CommandGroup
              key={group.title}
              heading={(
                <p className="text-blue-500">{group.title}</p>
              )}
            >
              {group.items?.map((navItem) => (
                <CommandItem
                  key={navItem.href}
                  value={navItem.title}
                  onSelect={() => onSelect(navItem)}
                  className="aria-selected:bg-accent cursor-pointer group"
                >
                  <div className="mr-2 ml-2 flex h-4 w-4 items-center justify-center">
                    {
                      group.icon ? (
                        <span className="text-blue-500">{group.icon}</span>
                      ) : (
                        <CircleIcon className="text-blue-500 h-3 w-3" />
                      )
                    }
                  </div>
                  <span className="">
                    {navItem.title}
                  </span>
                  <span className="hidden item-arrow ml-auto mr-2 h-4 w-4 items-center justify-center group-hover:flex">
                    <ArrowRightCircleIcon className="text-blue-500 h-3 w-3" />
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
          
        </CommandList>
        <div className="flex items-center border-t px-3">
          <div className="flex gap-1 items-center p-2 ml-auto text-xs font-medium text-muted-foreground">
          <span>{'AI Search '}</span>
          <ZapIcon className="text-orange-500" size={10} />
          <span className="font-bold bg-gradient-to-r from-violet-500 to-blue-500 text-transparent bg-clip-text">
            Nexai
          </span>
          </div>
        </div>
      </CommandDialog>
    </>
  )
}
