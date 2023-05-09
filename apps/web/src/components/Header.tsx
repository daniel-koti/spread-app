import { ProfileLinksMenuButton } from './MenuHeader/ProfileLinksMenuButton'

export function Header() {
  return (
    <header className="flex items-center justify-end">
      <div>
        <ProfileLinksMenuButton />
      </div>
    </header>
  )
}
