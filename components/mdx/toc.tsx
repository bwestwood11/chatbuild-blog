"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useMounted } from "@/hooks/use-mounted"
import { Skeleton } from "../ui/skeleton"

interface TocEntry {
  items?: TocEntry[]
  url: string
  title: string
}

interface TocProps {
  toc: TocEntry[]
}

export function DashboardTableOfContents({ toc }: TocProps) {
  const itemIds = React.useMemo(
    () =>
      toc
        ? toc
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split("#")[1])
        : [],
    [toc]
  )
  const activeHeading = useActiveItem(itemIds)
  const mounted = useMounted()

  return mounted ? (
    <div className="space-y-2">
      <Tree tree={toc} activeItem={activeHeading} />
    </div>
  ) : <SkeletonLoader/>
}

function useActiveItem(itemIds: (string | undefined)[]) {
  const [activeId, setActiveId] = React.useState<string>("")

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
    )

    itemIds?.forEach((id) => {
      if (!id) {
        return
      }

      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      itemIds?.forEach((id) => {
        if (!id) {
          return
        }

        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds])

  return activeId
}

interface TreeProps {
  tree: TocEntry[]
  level?: number
  activeItem?: string | null
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  return tree.length && level < 3 ? (
    <ul className={cn("m-0 list-none", { "pl-4": level !== 1 })}>
      {tree.map((item, index) => {
        return (
          <li key={index} className={cn("mt-0 pt-2")}>
            <a
              href={item.url}
              className={cn(
                "inline-block no-underline",
                item.url === `#${activeItem}`
                  ? "text-accent font-bold"
                  : "text-muted-foreground text-sm"
              )}
            >
              {item.title}
            </a>
            {item.items?.length ? (
              <Tree
                tree={item.items}
                level={level + 1}
                activeItem={activeItem}
              />
            ) : null}
          </li>
        )
      })}
    </ul>
  ) : null
}

const SkeletonLoader = () => {
  return (
    <div className="space-y-4">
       <Skeleton className="m-0 list-none w-[90%] h-3"/>
       <Skeleton className="m-0 list-none w-[90%] h-3 ml-4"/>
       <Skeleton className="m-0 list-none w-[90%] h-3 ml-4"/>
       <Skeleton className="m-0 list-none w-[90%] h-3 ml-4"/>
       <Skeleton className="m-0 list-none w-[90%] h-3"/>
       <Skeleton className="m-0 list-none w-[90%] h-3 ml-4"/>
    </div>
   
  )

}
