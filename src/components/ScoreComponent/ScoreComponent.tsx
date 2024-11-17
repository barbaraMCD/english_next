import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import {Frown, Smile} from "lucide-react";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import Image from "next/image";

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

    const [animatedScore, setAnimatedScore] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimatedScore(prev => Math.min(prev + 1, correctWord))
        }, 20)

        return () => clearInterval(interval)
    }, [correctWord])

    const getEmoji = (score: number) => {
        if (score < totalWords / 3) return <Frown className="h-6 w-6 text-red-500" />
        if (score < totalWords / 2) return <Smile className="h-6 w-6 text-yellow-500" />
        return <Smile className="h-6 w-6 text-green-500" />
    }

    return (
        <>
            <Card className={`w-full max-w-md mx-auto animate-pingOnce`}>
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold flex items-center justify-center">
                        Votre score
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                        <Image src={"https://cdn.pixabay.com/photo/2019/08/31/05/46/dart-4442830_1280.jpg"} alt={"Score"} width={300} height={300}/>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Vocabulaire exact</span>
                            <div className="flex items-center space-x-2">
                                <span className="font-bold text-lg">{animatedScore}</span>
                                {getEmoji(correctWord)}
                            </div>
                        </div>
                        <Progress value={(animatedScore / totalWords) * 100} className="h-2" />
                    </div>
                    <Button
                        onClick={handleRestart} className="w-full mt-4 bg-purple-400 text-white py-2 px-4 rounded hover:bg-purple-500 transition-colors"
                    >
                        Recommencer
                    </Button>
                </CardContent>
            </Card>
        </>
    )
}
