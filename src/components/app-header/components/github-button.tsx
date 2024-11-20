import Link from "next/link"

import { Button } from "@/components/ui/button"

import { GithubSvg } from "./github-svg"

export function GithubButton() {
  return (
    <Link
      href="https://github.com/naseralmuhana/dodo-pizza-admin"
      target="_blank"
    >
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <GithubSvg />
        <span className="sr-only">Github link</span>
      </Button>
    </Link>
  )
}
