import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

interface ScoreComponentProps {
    correctWord: number;
    totalWords: number;
    onRestart: () => void;
    setCorrectWord: (correctWord: number) => void;
}

export default function ScoreComponent({correctWord, totalWords, onRestart, setCorrectWord}: ScoreComponentProps) {

    const handleRestart = () => {
        setCorrectWord(0);
        onRestart();
    }


    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Your score !</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                    {correctWord}/{totalWords}
                <button
                    onClick={handleRestart}
                    className="w-full mt-4 bg-purple-400 text-white py-2 px-4 rounded hover:bg-purple-500 transition-colors"
                >
                    Restart
                </button>
            </CardContent>
        </Card>
    )
}
