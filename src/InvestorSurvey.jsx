import React, { useState } from 'react';

export default function InvestorSurvey() {
  const [currentStep, setCurrentStep] = useState(0); // Start at 0 for welcome screen
  const [answers, setAnswers] = useState({
    investmentGoal: '',
    timeline: '',
    assetUse: '',
    residencyFactor: '',
    geographicPreference: '',
    geographicDetails: '',
    capitalRange: ''
  });
  const [showGeographicDetails, setShowGeographicDetails] = useState(false);
  
  const totalSteps = 6; // Changed from 7 to 6 - there are only 6 questions
  
  const questions = {
    1: {
      question: "What is your primary investment goal?",
      options: [
        "Long-term capital appreciation",
        "Stable yield / income generation",
        "Vacation Home",
        "Capital preservation with inflation protection",
        "Residency or citizenship optionality",
        "Strategic diversification outside India"
      ],
      field: 'investmentGoal'
    },
    2: {
      question: "When are you most likely to proceed with this investment?",
      options: [
        "Immediately / actively evaluating",
        "Within the next 3 months",
        "3–6 months",
        "6–12 months",
        "Exploratory — timing is not yet defined"
      ],
      field: 'timeline'
    },
    3: {
      question: "How do you most likely intend to use the asset?",
      options: [
        "Purely as an investment",
        "Rental yield with occasional personal use",
        "Future personal or family use",
        "Business or strategic relocation",
        "Undecided / contingent on opportunity"
      ],
      field: 'assetUse'
    },
    4: {
      question: "Does residency or citizenship factor into your decision-making?",
      options: [
        "A primary objective",
        "A secondary advantage, not essential",
        "Relevant only if capital efficiency is maintained",
        "Not relevant"
      ],
      field: 'residencyFactor'
    },
    5: {
      question: "Do you currently have a clear geographic preference for this investment?",
      options: [
        "Yes — I have one or more specific countries/regions in mind",
        "No — I am open to recommendations",
        "I prefer not to consider geography at this stage"
      ],
      field: 'geographicPreference'
    },
    6: {
      question: "What range best reflects the capital you are prepared to deploy for this investment?",
      subtitle: "(Inclusive of taxes, duties, and transaction-related costs)",
      options: [
        "Up to ₹2 crore",
        "₹2–5 crore",
        "₹5–10 crore",
        "₹10–20 crore",
        "Above ₹20 crore"
      ],
      field: 'capitalRange'
    }
  };

  const handleOptionSelect = (field, value) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
    
    if (field === 'geographicPreference') {
      if (value === "Yes — I have one or more specific countries/regions in mind") {
        setShowGeographicDetails(true);
      } else {
        setShowGeographicDetails(false);
        setAnswers(prev => ({ ...prev, geographicDetails: '' }));
      }
    }
  };

  const handleNext = () => {
    if (currentStep === 5 && showGeographicDetails && !answers.geographicDetails) {
      return;
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Survey Submitted:', answers);
    setCurrentStep(7); // Move to contact advisor screen (step 7)
  };

  const isStepComplete = () => {
    const currentQuestion = questions[currentStep];
    if (!currentQuestion) return true;
    
    const answer = answers[currentQuestion.field];
    
    if (currentStep === 5 && showGeographicDetails) {
      return answer && answers.geographicDetails.trim().length > 0;
    }
    
    return answer && answer.length > 0;
  };

  // Welcome Screen (Step 0)
  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
          
          * {
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
          
          .font-serif {
            font-family: 'Cormorant Garamond', serif;
          }
          
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-fade-in {
            animation: fade-in 0.6s ease-out;
          }
        `}</style>
        <div className="max-w-2xl w-full text-center animate-fade-in">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif text-white mb-4">Welcome, Ridhima</h1>
            <p className="text-xl text-slate-300 mb-12 max-w-lg mx-auto">
              Thank you for your interest. This brief assessment will help us understand your investment profile and recommend tailored opportunities.
            </p>
          </div>
          
          <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-12" />
          
          <button
            onClick={() => setCurrentStep(1)}
            className="px-12 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 rounded-xl font-semibold text-lg hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20 transform hover:scale-105"
          >
            Start Survey
          </button>
          
          <p className="text-sm text-slate-500 mt-8">
            Estimated time: 2-3 minutes
          </p>
        </div>
      </div>
    );
  }

  // Contact Advisor Screen (Step 7)
  if (currentStep === 7) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full text-center animate-fade-in">
          <div className="mb-6 inline-block">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <svg className="w-10 h-10 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Survey Complete</h1>
          <p className="text-xl text-slate-300 mb-12">
            Thank you for completing the assessment. Your investment profile has been recorded.
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-12" />
          
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 max-w-md mx-auto">
            <p className="text-slate-300 mb-6 text-lg">
              Please contact our advisor to discuss your personalized investment opportunities:
            </p>
            <a 
              href="tel:+919876543210" 
              className="inline-flex items-center gap-3 text-2xl font-semibold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +91 98765 43210
            </a>
          </div>
          
          <p className="text-sm text-slate-400 mt-8">
            Or email us at <span className="text-amber-400">invest@ridhima.com</span>
          </p>
        </div>
      </div>
    );
  }

  // Survey Questions (Steps 1-6)
  const currentQuestion = questions[currentStep];
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 md:p-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
        
        * {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        
        .font-serif {
          font-family: 'Cormorant Garamond', serif;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }
        
        .option-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid rgba(148, 163, 184, 0.1);
        }
        
        .option-card:hover {
          border-color: rgba(251, 191, 36, 0.3);
          background: rgba(251, 191, 36, 0.05);
          transform: translateX(8px);
        }
        
        .option-card.selected {
          border-color: rgba(251, 191, 36, 0.6);
          background: rgba(251, 191, 36, 0.1);
        }
        
        .progress-bar {
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        input[type="text"]::placeholder {
          color: rgba(148, 163, 184, 0.4);
        }
      `}</style>

      <div className="max-w-3xl w-full animate-fade-in">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-slate-400 tracking-wide">
              STEP {currentStep} OF {totalSteps}
            </span>
            <span className="text-sm font-medium text-amber-400">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-1 bg-slate-700/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-3 animate-slide-in">
            {currentQuestion.question}
          </h2>
          
          {currentQuestion.subtitle && (
            <p className="text-slate-400 text-sm mb-8 animate-slide-in" style={{ animationDelay: '0.1s' }}>
              {currentQuestion.subtitle}
            </p>
          )}

          <div className="space-y-4 mt-8">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(currentQuestion.field, option)}
                className={`w-full text-left p-5 rounded-xl option-card group animate-slide-in ${
                  answers[currentQuestion.field] === option ? 'selected' : ''
                }`}
                style={{ animationDelay: `${0.1 + index * 0.05}s` }}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 mr-4 flex-shrink-0 transition-all ${
                    answers[currentQuestion.field] === option
                      ? 'border-amber-400 bg-amber-400'
                      : 'border-slate-500 group-hover:border-amber-400'
                  }`}>
                    {answers[currentQuestion.field] === option && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-slate-900" />
                      </div>
                    )}
                  </div>
                  <span className="text-slate-200 group-hover:text-white transition-colors">
                    {option}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Conditional Geographic Details Input */}
          {currentStep === 5 && showGeographicDetails && (
            <div className="mt-6 animate-fade-in">
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Please indicate the geography or geographies you are considering:
              </label>
              <input
                type="text"
                value={answers.geographicDetails}
                onChange={(e) => setAnswers(prev => ({ ...prev, geographicDetails: e.target.value }))}
                placeholder="e.g., Dubai, London, Singapore"
                className="w-full px-5 py-4 bg-slate-900/50 border-2 border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 gap-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              currentStep === 1
                ? 'bg-slate-800/30 text-slate-600 cursor-not-allowed'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-600'
            }`}
          >
            ← Back
          </button>

          <button
            onClick={currentStep === totalSteps ? handleSubmit : handleNext}
            disabled={!isStepComplete()}
            className={`px-8 py-3 rounded-xl font-medium transition-all ${
              isStepComplete()
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20'
                : 'bg-slate-700/30 text-slate-600 cursor-not-allowed'
            }`}
          >
            {currentStep === totalSteps ? 'Continue' : 'Continue →'}
          </button>
        </div>

        {/* Branding Footer */}
        <div className="text-center mt-12">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-6" />
          <p className="text-xs text-slate-500 tracking-wide">
            CONFIDENTIAL INVESTMENT ASSESSMENT
          </p>
        </div>
      </div>
    </div>
  );
}