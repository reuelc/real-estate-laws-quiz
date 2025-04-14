"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"

interface Question {
  question: string
  options: string[]
  correct: string
}

interface QuizQuestionProps {
  question: Question
  onSelectAnswer: (selectedOption: string) => void
  userAnswer: string
}

export function QuizQuestion({ question, onSelectAnswer, userAnswer }: QuizQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  useEffect(() => {
    // Reset state when question changes
    setSelectedOption(null)
    setShowFeedback(false)
  }, [question])

  const handleOptionClick = (option: string) => {
    if (selectedOption || showFeedback) return // Prevent multiple selections

    setSelectedOption(option)
    setShowFeedback(true)
    onSelectAnswer(option)
  }

  const isCorrect = selectedOption === question.correct

  return (
    <div className="space-y-6">
      <div className="text-lg font-medium leading-7 text-slate-800 p-4 bg-slate-50 rounded-lg">{question.question}</div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            className={`w-full justify-start text-left h-auto py-4 px-6 font-normal text-base ${
              selectedOption === option
                ? isCorrect
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
                : selectedOption && option === question.correct
                  ? "border-green-500 bg-green-50"
                  : ""
            }`}
            onClick={() => handleOptionClick(option)}
            disabled={!!selectedOption}
          >
            {option}
            {selectedOption === option && (
              <span className="ml-auto">
                {isCorrect ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </span>
            )}
            {selectedOption && option === question.correct && selectedOption !== option && (
              <span className="ml-auto">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </span>
            )}
          </Button>
        ))}
      </div>

      {showFeedback && (
        <Card className={`p-4 ${isCorrect ? "bg-green-50" : "bg-red-50"}`}>
          {isCorrect ? (
            <p className="flex items-center text-green-700">
              <CheckCircle className="h-5 w-5 mr-2" /> Correct!
            </p>
          ) : (
            <p className="flex items-center text-red-700">
              <XCircle className="h-5 w-5 mr-2" /> Incorrect. The correct answer is: {question.correct}
            </p>
          )}
        </Card>
      )}
    </div>
  )
}
