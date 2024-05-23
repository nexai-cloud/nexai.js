"use client"

import * as React from "react"
import { DialogProps } from "@radix-ui/react-alert-dialog"
import {
  CircleIcon
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { ChevronRight, EyeIcon, ZapIcon } from "lucide-react"
import { fetchSearchDocs } from "../../lib/ai-search/fetch-search"
import { useFlexsearchModel } from "../../models/flexsearch-model"
import { keywordSearch } from "../../lib/ai-search/keyword-search"
import { filterFlexsearchResults } from "../../lib/ai-search/flexsearch"
import { observer } from "mobx-react-lite"
import { ScrollArea } from "~/components/ui/scroll-area"

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
  input: string;
  onMenuItemSelect?: (navItem: NavItem) => void;
  onMenuItemReadMore: (navItem: NavItem, group: NavItem) => void;
  className?: string;
  placeholder?: string;
  placeholderSmall?: string;
  commandEmpty?: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const SearchSuggest = observer(({
  nexaiApiKey,
  input,
  onMenuItemSelect,
  onMenuItemReadMore,
  open,
  setOpen,
  commandEmpty = 'No results found.',
  }: AISearchProps) => {
  const [selectedNavItem, setSelectedNavItem] = React.useState<NavItem|undefined>()

  const searchModel = useFlexsearchModel({ nexaiApiKey })
  const [docsNav, setDocsNav] = React.useState<NavItem[]>([])
  const fetched = React.useRef(false)

  React.useEffect(() => {
    searchModel.search(input)
  }, [input, searchModel])
  
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
        setOpen(!open)
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

  return (
    <>
      <Command className="h-full">
        <ScrollArea>
          <CommandList className="overflow-visible">
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
                        "cursor-pointer group items-center",
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
                    <span className="opacity-0 item-arrow ml-auto mr-2 h-6 w-6 items-center justify-center group group-aria-selected:opacity-100">
                      <ChevronRight className="text-blue-500 h-6 w-6 mb-2" />
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
        </ScrollArea>
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
      </Command>
    </>
  )
})
