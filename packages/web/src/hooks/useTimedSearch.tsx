import { useEffect } from "react";

type Options = {
  titleToSearch: string,
  delay: number,
  searchFunction: ({ title }: { title: string }) => void
}

export function useTimedSearch({ titleToSearch, searchFunction, delay }: Options) {
  useEffect(() => {
    let timer = setTimeout(() => {
      if (titleToSearch) {
        searchFunction({ title: titleToSearch })
      }
    }, delay)


    return () => {
      clearTimeout(timer)
    }
  }, [titleToSearch])
}