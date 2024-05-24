"use client"

import * as React from "react"
import { DialogProps } from "@radix-ui/react-alert-dialog"
import {
  CircleIcon
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { ButtonProps } from "@/components/ui/button"
import {
  // Command,
  CommandGroup,
  CommandItem,
  CommandList,
  // CommandSeparator,
} from "@/components/ui/command"
import { ChevronRight, PlusIcon, ZapIcon } from "lucide-react"
import { type NavItem, useFlexsearchModel } from "../../models/flexsearch-model"
import { filterFlexsearchResults } from "../../lib/ai-search/flexsearch"
import { observer } from "mobx-react-lite"
import { ScrollArea } from "~/components/ui/scroll-area"

export type AISearchProps = DialogProps & ButtonProps & {
  nexaiApiKey: string;
  input: string;
  onMenuItemSelect: (navItem: NavItem, group: NavItem) => void;
  className?: string;
  showInput?: boolean;
}

export const SearchSuggest = observer(({
  nexaiApiKey,
  input,
  onMenuItemSelect,
  showInput = true
  }: AISearchProps) => {

  const searchModel = useFlexsearchModel({ nexaiApiKey })
  const docsNav = searchModel.documents

  React.useEffect(() => {
    searchModel.search(input)
  }, [input, searchModel])
  
  React.useEffect(() => {
    const fetchDocs = async () => {
      await searchModel.fetchDocuments()
    }
    if (!searchModel.fetchDocumentsState.busy && !searchModel.fetchDocumentsState.ok) {
      fetchDocs()
    }
  }, [nexaiApiKey, searchModel])

  const uniqueNav = docsNav.filter((group, index) => {
    return docsNav.findIndex((nav) => nav.title === group.title) === index
  })

  const keywords = input.split(' ').filter(i => i)
  const searches = keywords.map(keyword => new RegExp(keyword, 'ig'))

  // use flexsearch index
  const visibleNav = !searches.length 
    ? uniqueNav 
    : filterFlexsearchResults(uniqueNav, searchModel.results)

  const runCommand = React.useCallback((command: () => unknown) => {
    command()
  }, [])

  const onSelect = React.useCallback((navItem: NavItem) => {
    console.log('onSelect', navItem)
    const group = docsNav.find(nav => nav.items?.includes(navItem))
      runCommand(() => onMenuItemSelect(navItem, group!))
  }, [runCommand, onMenuItemSelect, docsNav])

  return (
    <>
        <ScrollArea 
          className={cn(!visibleNav.length && 'hidden', 'p-2')}
        >
          <CommandList className="overflow-visible">
            <CommandGroup
                heading={(
                  <p className="text-blue-500 text-sm flex">
                    {'Suggestions'}
                  </p>
                )}
              >
                <CommandItem
                  className={
                    cn(
                      !showInput && "hidden",
                      "cursor-pointer group items-center",
                      "aria-selected:bg-blue-100 "
                    )
                  }
                >
                  <div className="mr-2 ml-2 flex h-4 w-4 items-center justify-center">
                    <ZapIcon className="text-yellow-500 h-3 w-3" />
                  </div>
                  <span className="flex items-center">
                    {input}...
                  </span>
                  <span className="opacity-0 item-arrow ml-auto mr-2 h-6 w-6 items-center justify-center group group-aria-selected:opacity-100">
                    <PlusIcon className="text-blue-500 h-6 w-6 mb-2" />
                  </span>
                </CommandItem>
            </CommandGroup>
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
                    className={
                      cn(
                        "cursor-pointer group items-center",
                        "aria-selected:bg-blue-100 "
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
                ))}
              </CommandGroup>
            ))}
            {/* <CommandSeparator /> */}
          </CommandList>
        </ScrollArea>
        <div className={cn(
          "flex items-center px-3",
          visibleNav.length && 'border-t'
        )}>
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
    </>
  )
})
