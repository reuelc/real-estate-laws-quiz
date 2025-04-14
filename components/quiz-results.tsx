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
      <Card className="shadow-lg">
        <CardHeader className="text-center border-b bg-slate-50">
          <CardTitle className="text-2xl">Examination Complete</CardTitle>
          <CardDescription>Your results are ready</CardDescription>
        </CardHeader>

        <CardContent className="pt-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className={`text-6xl font-bold ${passed ? "text-green-600" : "text-red-600"}`}>
              {passed ? "PASSED" : "FAILED"}
            </div>

            <div className="text-center space-y-2">
              <p className="text-xl">
                Final Score: {score}/{totalQuestions}
              </p>
              <p className="text-xl">Percentage: {percentage.toFixed(1)}%</p>
              <p className="text-sm text-slate-500">(75% required to pass)</p>
            </div>

            {incorrectAnswers.length > 0 && (
              <div className="w-full mt-8">
                <h3 className="text-lg font-medium mb-4">Incorrect Answers:</h3>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {incorrectAnswers.map((item, index) => (
                    <Card key={index} className="p-4 bg-slate-50">
                      <p className="font-medium">{item.question}</p>
                      <p className="text-red-600 flex items-center mt-2">
                        <XCircle className="h-4 w-4 mr-2" /> Your answer: {item.yourAnswer}
                      </p>
                      <p className="text-green-600 flex items-center mt-1">
                        <CheckCircle className="h-4 w-4 mr-2" /> Correct answer: {item.correctAnswer}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-center gap-4 border-t bg-slate-50 p-6">
          {incorrectAnswers.length > 0 && (
            <Button onClick={onStartReview} className="gap-2">
              <BookOpen className="h-4 w-4" />
              Practice Incorrect Items
            </Button>
          )}

          <Button variant="outline" onClick={onReset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Start New Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
