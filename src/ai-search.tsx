"use client"

import * as React from "react"
import { DialogProps } from "@radix-ui/react-alert-dialog"
import {
  CircleIcon
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  // CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { ArrowRightCircleIcon, EyeIcon, SearchIcon, ZapIcon } from "lucide-react"
import { fetchSearchDocs } from "./lib/ai-search/fetch-search"
import { useFlexsearchModel } from "./models/flexsearch-model"
import { keywordSearch } from "./lib/ai-search/keyword-search"
import { filterFlexsearchResults } from "./lib/ai-search/flexsearch"
import { observer } from "mobx-react-lite"

export type NavItem = {
  title: string;
  summary?: string;
  href?: string;
  external?: true;
  items?: NavItem[]
  icon?: React.ReactNode;
  label?: string;
}

export type AISearchProps = DialogProps & ButtonProps & {
  nexaiApiKey: string;
  onMenuItemSelect?: (navItem: NavItem) => void;
  onMenuItemReadMore: (navItem: NavItem, group: NavItem) => void;
  className?: string;
  placeholder?: string;
  placeholderSmall?: string;
  commandEmpty?: React.ReactNode;
}

export const AISearch = observer(({
  nexaiApiKey,
  onMenuItemSelect,
  onMenuItemReadMore,
  className,
  commandEmpty = 'No results found.',
  placeholder = 'Search documentation...',
  placeholderSmall = 'Search...',
  ...props
  }: AISearchProps) => {
  const [open, setOpen] = React.useState(false)
  const [input, setInput] = React.useState('')
  const [selectedNavItem, setSelectedNavItem] = React.useState<NavItem|undefined>()

  const searchModel = useFlexsearchModel({ nexaiApiKey })
  const [docsNav, setDocsNav] = React.useState<NavItem[]>([])
  const fetched = React.useRef(false)
  React.useEffect(() => {
    const fetchDocs = async () => {
      const docs = await fetchSearchDocs(nexaiApiKey)
      setDocsNav(docs)
      searchModel.setDocuments(docs)
    }
    if (!fetched.current) {
      fetchDocs()
      fetched.current = true
    }
  }, [docsNav, nexaiApiKey, searchModel])

  const uniqueNav = docsNav.filter((group, index) => {
    return docsNav.findIndex((nav) => nav.title === group.title) === index
  })

  const keywords = input.split(' ').filter(i => i)
  const searches = keywords.map(keyword => new RegExp(keyword, 'ig'))

  // use flexsearch index
  const visibleNav = !searches.length 
    ? uniqueNav 
    : filterFlexsearchResults(uniqueNav, searchModel.results)

  // augment with OR keyword search
  if (!visibleNav.length) {
    visibleNav.push(
      // @ts-expect-error navitem
      ...keywordSearch(input, uniqueNav)
    )
  }

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
    // console.log('onSelect', navItem)
    if (navItem === selectedNavItem) {
      const group = docsNav.find(nav => nav.items?.includes(selectedNavItem))
      runCommand(() => onMenuItemReadMore(navItem, group!))
    }
    if (onMenuItemSelect) {
      runCommand(() => onMenuItemSelect(navItem))
    } else {
      setSelectedNavItem(navItem)
    }
  }, [runCommand, onMenuItemSelect, docsNav, onMenuItemReadMore, selectedNavItem])

  const onReadMore = React.useCallback((navItem: NavItem, group: NavItem) => {
    runCommand(() => onMenuItemReadMore(navItem, group))
  }, [runCommand, onMenuItemReadMore])

  const onSearchInput = async (input: string) => {
    setInput(input)
    // console.log('searchModel', searchModel)
    await searchModel.search(input)
    // console.log('results', searchModel.results, searchModel)
  }

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "flex group h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none",
          className
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <SearchIcon className="group-hover:text-blue-500 mr-2 h-4 w-4 shrink-0" />
        <span className="hidden lg:inline-flex">{placeholder}</span>
        <span className="inline-flex lg:hidden">{placeholderSmall}</span>
        <kbd className="ml-auto group-hover:text-blue-500 pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center border-b px-3">
          <SearchIcon className="text-blue-500 mr-2 h-4 w-4 shrink-0" />
          <input
            value={input}
            onChange={e => onSearchInput(e.target.value)}
            placeholder={placeholder}
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        {/* <CommandInput placeholder={placeholder} /> */}
        <CommandList>
          <CommandEmpty>
            { commandEmpty}
          </CommandEmpty>
          {visibleNav.map((group) => group && (
            <CommandGroup
              key={group.title}
              heading={(
                <p className="text-blue-500">{group.title}</p>
              )}
            >
              {group.items?.map((navItem) => (
                <div key={navItem.href}>
                <CommandItem
                  value={navItem.title}
                  onSelect={() => onSelect(navItem)}
                  className={
                    cn(
                      "cursor-pointer group",
                       selectedNavItem === navItem 
                        ? "border border-blue-500 border-b-transparent rounded-b-none bg-gradient-to-r from-blue-100 via-violet-100 to-blue-100"
                        : "aria-selected:bg-gradient-to-r from-blue-50 via-violet-50 to-blue-50 "
                    )
                  }
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
                  <span className="opacity-0 item-arrow ml-auto mr-2 h-4 w-4 items-center justify-center group group-aria-selected:opacity-100">
                    <ArrowRightCircleIcon className="text-blue-500 h-3 w-3" />
                  </span>
                </CommandItem>
                {
                  selectedNavItem === navItem ? (
                    <div className="rounded rounded-t-none border border-blue-500 bg-blue-50 shadow text-sm p-4 flex align-middle items-center">
                      <div className="mr-2 ml-2 flex h-4 w-4 items-center justify-center">
                      {/* <EyeIcon className="text-blue-500" /> */}
                      </div>
                      <p>
                        {navItem.summary}
                        <Button
                          className="flex gap-2 h-7 m-2 ml-auto bg-blue-500"
                          onClick={() => onReadMore(navItem, group)}>
                            <span>More</span>
                            <EyeIcon className="h-5 w-5" />
                          </Button>
                      </p>
                    </div>
                  ): null
                }
                </div>
              ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
          
        </CommandList>
        <div className="flex items-center border-t px-3">
          <a
            className="flex gap-1 items-center p-2 ml-auto text-xs font-medium text-muted-foreground"
            href="https://nexai.site"
            target="_blank"
          >
            <span>{'AI Search '}</span>
            <ZapIcon className="text-orange-500" size={10} />
            <span className="font-bold bg-gradient-to-r from-violet-500 to-blue-500 text-transparent bg-clip-text">
              Nexai
            </span>
          </a>
        </div>
      </CommandDialog>
    </>
  )
})
