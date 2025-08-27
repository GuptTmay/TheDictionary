import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WordEntry } from "@/types";
import { Loader2, Search } from "lucide-react";
import { getData } from "@/lib/api";

export default function DictionaryPage() {
  const [word, setWord] = useState<string>("");
  const [data, setData] = useState<WordEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!word.trim()) return;
    if (word.trim().toLowerCase() == data[0]?.word.toLowerCase()) return; 
    setIsLoading(true);
    setHasSearched(true);
    setData([]);

    try {
      const json: WordEntry[] | null = await getData(word);
      if (!json) return;
      setData(json);
    } catch (error) {
      console.error(error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex gap-2">
        <Input
          placeholder="Enter a word..."
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleSearch} className="cursor-pointer" disabled={isLoading || !word}>
          {isLoading ? <Loader2 className="animate-spin" /> : <Search />}
          <span className="ml-2 hidden sm:inline">
            {isLoading ? "Searching..." : "Search"}
          </span>
        </Button>
      </div>

      {isLoading ? (
        <p className="text-center text-muted-foreground">Loading...</p>
      ) : (
        <>
          {data.length > 0
            ? data.map((entry, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="capitalize text-xl">
                      {entry.word}
                    </CardTitle>
                    {entry.phonetic && (
                      <p className="text-sm text-muted-foreground">
                        {entry.phonetic}
                      </p>
                    )}
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="hidden sm:block">
                      {entry.phonetics.find((p) => p.audio)?.audio && (
                        <audio
                          controls
                          src={entry.phonetics.find((p) => p.audio)?.audio}
                        >
                          Your browser does not support the audio tag.
                        </audio>
                      )}
                    </div>

                    {entry.meanings.map((m, idx) => (
                      <div key={idx} className="border-t pt-2">
                        <p className="font-semibold">As a {m.partOfSpeech}</p>
                        {m.definitions.map((d, id) => (
                          <div key={id} className="ml-4">
                            <p>- {d.definition}</p>
                            {d.example && (
                              <p className="text-muted-foreground text-sm">
                                Example: {d.example}
                              </p>
                            )}
                          </div>
                        ))}
                        {m.synonyms.length > 0 && (
                          <p className="text-sm">
                            Synonyms: {m.synonyms.join(", ")}
                          </p>
                        )}
                        {m.antonyms.length > 0 && (
                          <p className="text-sm">
                            Antonyms: {m.antonyms.join(", ")}
                          </p>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))
            : hasSearched && (
                <p className="text-red-500">No results found for "{word}"</p>
              )}
        </>
      )}
    </div>
  );
}
