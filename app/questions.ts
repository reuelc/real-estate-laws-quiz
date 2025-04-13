export interface Question {
  question: string;
  options: string[];
  correct: string;
}

export const questions: Question[] = [
    {
        question: "Land Registration Act of 1903 now PD 1529, Nov 6 1902",
        options: ["a. EO 208", "b. RA 6652", "c. Act 496", "d. Act 2259"],
        correct: "c. Act 496"
    },
    // ... existing code ...
    {
        question: "PD 1096",
        options: ["a. National Building Code of Ph", "b. National Housing Authority", "c. National Home Mortgage Finance Corporation (NHMFC)", "d. Social Housing Finance Corporation (SHFC)"],
        correct: "a. National Building Code of Ph"
    }
]; 