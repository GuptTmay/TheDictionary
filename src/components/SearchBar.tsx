import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SearchBar() {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="email">Se</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  )
}
