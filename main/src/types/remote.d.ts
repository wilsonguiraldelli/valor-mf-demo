declare module "header" {
  import type { ComponentType } from "react"

  interface HeaderProps {
    title: string
    avatarSrc: string
    avatarFallback: string
    message?: string
  }

  const Header: ComponentType<HeaderProps>
  export default Header
}

declare module "followButton" {
  import type { ComponentType } from "react"

  interface FollowButtonProps {
    linkedinUrl: string
  }

  const FollowButton: ComponentType<FollowButtonProps>
  export default FollowButton
}
