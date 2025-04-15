
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "react-bootstrap-icons";

interface QuoteData {
  content: string;
  author: string;
}

const quotes: QuoteData[] = [
  {
    content: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    content: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela"
  },
  {
    content: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King"
  },
  {
    content: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    author: "Dr. Seuss"
  },
  {
    content: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    author: "Mahatma Gandhi"
  },
  {
    content: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    content: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    content: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs"
  },
  {
    content: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  }
];

const QuoteComponent = () => {
  const [quote, setQuote] = useState<QuoteData | null>(null);

  useEffect(() => {
    // Check if we need to update the quote
    const lastQuoteDate = localStorage.getItem("lastQuoteDate");
    const today = new Date().toDateString();
    
    if (lastQuoteDate !== today) {
      // Get a random quote
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
      
      // Save to localStorage
      localStorage.setItem("lastQuoteDate", today);
      localStorage.setItem("dailyQuote", JSON.stringify(quotes[randomIndex]));
    } else {
      // Use the saved quote
      const savedQuote = localStorage.getItem("dailyQuote");
      if (savedQuote) {
        setQuote(JSON.parse(savedQuote));
      } else {
        // Fallback if no saved quote
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
      }
    }
  }, []);

  if (!quote) return null;

  return (
    <Card className="glass-card card-hover">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 rounded-full bg-universe-200 dark:bg-universe-700 p-3">
            <Quote className="h-6 w-6 text-universe-700 dark:text-universe-300" />
          </div>
          <div>
            <p className="text-lg italic mb-2">"{quote.content}"</p>
            <p className="text-universe-600 dark:text-universe-400 text-sm">— {quote.author}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteComponent;
