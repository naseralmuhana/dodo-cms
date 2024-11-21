import Link from "next/link"

import { GITHUB_REPO_URL } from "@/constants"

import { Button } from "@/components/ui/button"

import { GithubSvg } from "./github-svg"

export function GithubButton() {
  return (
    <Link href={GITHUB_REPO_URL} target="_blank">
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <GithubSvg />
        <span className="sr-only">Github link</span>
      </Button>
    </Link>
  )
}
