import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface DataDictInterface { [key: string]: string[] }

interface WordPairProps {
    dataDict: DataDictInterface,
    setCorrectWord: (correctWord: number) => void,
    correctWord: number
    setIsFinished: (finished: boolean) => void
}

export default function WordPair({dataDict, setCorrectWord, correctWord, setIsFinished}: WordPairProps) {
    const [languages, setLanguages] = useState<string[]>([])
    const [currentWords, setCurrentWords] = useState<string[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [displayResponse, setDisplayResponse] = useState(false);

    useEffect(() => {
        const langs = Object.keys(dataDict)
        setLanguages(langs)
        if (langs.length >= 2) {
            setCurrentWords([dataDict[langs[0]][0], ''])
        }
    }, [dataDict])

    const handleInputChange = (value: string, index: number) => {
        const newWords = [...currentWords]
        newWords[index] = value
        setCurrentWords(newWords)
    }

    const nextQuestion = () => {
        const nextIndex = (currentIndex + 1) % dataDict[languages[0]].length

        if (currentWords[1].toLowerCase() === dataDict[languages[1]][currentIndex].toLowerCase()) {
            setCorrectWord(correctWord + 1);
        }

        if (nextIndex < currentIndex) {
            setIsFinished(true)
        }

        setCurrentIndex(nextIndex)
        setCurrentWords([dataDict[languages[0]][nextIndex], ''])
        setDisplayResponse(false)
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Exercice de paires de mots</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {languages.map((lang, index) => {
                    const goodWord = currentWords[1].toLowerCase() === dataDict[languages[1]][currentIndex].toLowerCase()
                    return (
                        <div key={lang}>
                            <Label htmlFor={`input-${lang}`}>{lang.charAt(0).toUpperCase() + lang.slice(1)}</Label>
                            <Input
                                id={`input-${lang}`}
                                value={currentWords[index] || ''}
                                onChange={(e) => handleInputChange(e.target.value, index)}
                                readOnly={index === 0}
                                className={"mt-1"}
                            />
                            {index !== 0 && displayResponse && (
                                <Input
                                    id={`input-correct-answer`}
                                    value={goodWord ? "Correct !" : `Faux. Bonne réponse : ${dataDict[languages[1]][currentIndex].toLowerCase()}`}
                                    className={goodWord ? "mt-1 bg-green-500 text-white" :  "mt-1 bg-red-500 text-white"}
                                    readOnly={true}
                                />
                            )}
                        </div>
                    )
                })}
                <button
                    onClick={displayResponse ? nextQuestion : () => setDisplayResponse(true)}
                    className="w-full mt-4 bg-purple-400 text-white py-2 px-4 rounded disabled:bg-purple-200 hover:bg-purple-500 transition-colors"
                    disabled={!currentWords[1]}
                >
                    {displayResponse ? "Continuer" : "Vérifier la réponse"}
                </button>
            </CardContent>
        </Card>
    )
}
