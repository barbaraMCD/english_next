"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import WordPair, {DataDictInterface} from "@/components/WordPair/WordPair";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import ScoreComponent from "@/components/ScoreComponent/ScoreComponent";

export default function EnglishReviewPage() {
    const fileInputRef = useRef(null);
    const [dataDict, setDataDict] = useState< DataDictInterface | null>(null);
    const [correctWord, setCorrectWord] = useState(0);
    const [totalWords, setTotalWords] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files?.[0];
        if (file && file.name.endsWith(".csv")) {
            const reader = new FileReader();

            reader.onload = () => {
                const csvContent = reader.result;

                if (typeof csvContent === "string") {
                    const lines = csvContent.split("\n");
                    const cleanedLines = lines.map((line) => line.replace(/\r/g, '').trim());

                    const headers = cleanedLines[0].split(",");

                    if (headers.length !== 2) {
                        console.log("Ajouter un toaster")
                    }

                    const dataDict: { [key: string]: string[] } = {};

                    headers.forEach((header) => {
                        dataDict[header] = [];
                    });

                    lines.slice(1).forEach((line) => {
                        const values = line.split(",");
                        headers.forEach((header, index) => {
                            if (dataDict[header]) {
                                dataDict[header].push(values[index]?.trim());
                            }
                        });
                    });

                    setDataDict(dataDict);
                    console.log("Dictionnaire de données :", dataDict);
                }
            };

            reader.onerror = (error) => {
                console.error("Erreur de lecture du fichier : ", error);
            };

            reader.readAsText(file);
        } else {
            alert("Veuillez sélectionner un fichier .csv !");
        }
    };

    const handleCorrectWordUpdate = (newCorrectWord: number) => {
        setCorrectWord(newCorrectWord);
    };

    useEffect(() => {
        if (dataDict) {
            setTotalWords(dataDict[Object.keys(dataDict)[0]].length);
        }
    }, [dataDict]);

    return (
        <div className="flex flex-col h-screen bg-gradient-to-b from-purple-400 to-pink-500 p-8">
            <h1 className="text-4xl font-bold text-white text-center mb-8">Révision de vocabulaire amusante 🎉</h1>
            <div className="flex flex-1 justify-center items-center">
                {dataDict && !isFinished && <WordPair dataDict={dataDict} setIsFinished={setIsFinished} setCorrectWord={handleCorrectWordUpdate} correctWord={correctWord}/>}
                {dataDict && isFinished && <ScoreComponent setCorrectWord={setCorrectWord} totalWords={totalWords} correctWord={correctWord} onRestart={() => setIsFinished(false)}/>}
                {!dataDict &&
                    <Card className="mb-8 sm:w-11/12 md:w-8/12">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Téléchargez votre fichier csv ! </CardTitle>
                            <CardDescription>Créez votre feuille de révision personnalisée en anglais ! Apprenez votre vocabulaire !</CardDescription>
                            <CardDescription>Créez une feuille avec 2 colonnes au début du document (colonnes A et B), en ligne 1, avec des en-têtes et des mots dans les colonnes</CardDescription>
                            <CardDescription>Enregistrez votre feuille au format .csv</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Input
                                    ref={fileInputRef}
                                    id="englishFile"
                                    accept=".csv"
                                    type="file"
                                    onChange={handleFileSelect}
                                />
                            </div>
                        </CardContent>
                    </Card>}
            </div>
        </div>
    );
}
