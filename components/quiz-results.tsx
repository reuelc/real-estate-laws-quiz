"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, RotateCcw, BookOpen } from "lucide-react"

interface QuizResultsProps {
  score: number
  totalQuestions: number
  incorrectAnswers: {
    question: string
    yourAnswer: string
    correctAnswer: string
  }[]
  onStartReview: () => void
  onReset: () => void
}

export function QuizResults({ score, totalQuestions, incorrectAnswers, onStartReview, onReset }: QuizResultsProps) {
  const percentage = (score / totalQuestions) * 100
  const passed = percentage >= 75

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card className="shadow-2xl rounded-xl transition-colors duration-500 bg-white dark:bg-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800">
        <CardHeader className="text-center border-b bg-slate-50 dark:bg-gray-800 dark:text-gray-100 rounded-t-xl">
          <CardTitle className="text-2xl font-bold tracking-wide">Examination Complete</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">Your results are ready</CardDescription>
        </CardHeader>

        <CardContent className="pt-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className={`text-6xl font-black tracking-tight ${passed ? "text-green-500" : "text-red-500"}`}>{passed ? "PASSED" : "FAILED"}</div>

            <div className="text-center space-y-2">
              <p className="text-xl font-semibold">Final Score: {score}/{totalQuestions}</p>
              <p className="text-xl font-semibold">Percentage: {percentage.toFixed(1)}%</p>
              <p className="text-sm text-slate-500 dark:text-gray-400">(75% required to pass)</p>
            </div>

            {incorrectAnswers.length > 0 && (
              <div className="w-full mt-8">
                <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-100">Incorrect Answers:</h3>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {incorrectAnswers.map((item, index) => (
                    <Card key={index} className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <p className="font-semibold text-blue-700 dark:text-blue-300 mb-2">{item.question}</p>
                      <p className="text-red-600 dark:text-red-400 flex items-center mt-2">
                        <XCircle className="h-4 w-4 mr-2" /> Your answer: <span className="ml-1 font-medium">{item.yourAnswer}</span>
                      </p>
                      <p className="text-green-600 dark:text-green-400 flex items-center mt-1">
                        <CheckCircle className="h-4 w-4 mr-2" /> Correct answer: <span className="ml-1 font-medium">{item.correctAnswer}</span>
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-center gap-4 border-t bg-slate-50 dark:bg-gray-800 p-6 rounded-b-xl">
          {incorrectAnswers.length > 0 && (
            <Button onClick={onStartReview} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white font-semibold px-4 py-2 rounded shadow transition-colors">
              <BookOpen className="h-4 w-4" />
              Practice Incorrect Items
            </Button>
          )}

          <Button variant="outline" onClick={onReset} className="gap-2 border-gray-400 dark:border-gray-600 dark:text-gray-100 font-semibold px-4 py-2 rounded shadow">
            <RotateCcw className="h-4 w-4" />
            Start New Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
