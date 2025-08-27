import DictionaryPage from "./components/DictionaryPage";
import { ModeToggle } from "./components/mode-toggle";
import { ShootingStars } from "./components/ui/shooting-starts";
import { StarsBackground } from "./components/ui/stars-background";

function App() {
  return (
    <div className="min-h-screen bg-background/5">
      <header className="w-full border-b bg-card shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            WordWave
          </h1>
          <ModeToggle />
        </div>
      </header>
      <main className="p-4">
        <DictionaryPage />
      </main>

      <ShootingStars className="-z-10 fixed"/>
      <StarsBackground className="-z-10 fixed" />
    </div>
  );
}

export default App;
