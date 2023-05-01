import { ProfileLinksMenuButton } from './ProfileLinksMenuButton'
import { WalletLinksMenuButton } from './WalletLinksMenuButton'

export function MenuHeader() {
  return (
    <div className="flex gap-4">
      <WalletLinksMenuButton />
      <ProfileLinksMenuButton />
    </div>
  )
}
