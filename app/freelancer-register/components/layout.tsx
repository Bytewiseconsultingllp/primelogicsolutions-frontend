"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight, ArrowLeft, Check, Menu, X } from "lucide-react"
import { FreelancerData } from "../page"

interface Step {
  number: number
  name: string
  isValid: boolean
  requiredFields?: string[]
}

interface FreelancerRegisterLayoutProps {
  children: React.ReactNode
  currentStepIndex: number
  steps: Step[]
  progressPercentage: number
  goToStep: (index: number) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
  clearProgress: () => void
  selectionCount: string
  formData: FreelancerData
}

export function FreelancerRegisterLayout({
  children,
  currentStepIndex,
  steps,
  progressPercentage,
  goToStep,
  goToNextStep,
  goToPreviousStep,
  clearProgress,
  selectionCount,
  formData
}: FreelancerRegisterLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Close sidebar when navigating on mobile
  useEffect(() => {
    setSidebarOpen(false)
  }, [currentStepIndex])

  // Render the sidebar content
  const renderSidebarContent = () => (
    <div className="flex flex-col w-full h-full">
      <Image src="/assets/logo6.png" alt="Logo" width={150} height={120} className="mb-8 filter brightness-0 invert" />
      <h2 className="text-3xl font-bold mb-4 w-full">FREELANCER REGISTER</h2>
      <p className="text-sm w-full">Complete your profile in a few simple steps</p>

      {/* Progress indicator */}
      <div className="mt-8 w-full">
        <div className="flex justify-between mb-2 w-full">
          <span className="text-xs">Progress</span>
          <span className="text-xs">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-[#FF6B35] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Step indicators */}
      <div className="mt-8 space-y-2 overflow-y-auto max-h-[calc(100vh-350px)] w-full">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 py-1 px-2 rounded w-full ${
              index === currentStepIndex ? "bg-white/10" : ""
            } ${index < currentStepIndex ? "cursor-pointer" : ""}`}
            onClick={() => index < currentStepIndex && goToStep(index)}
          >
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                index < currentStepIndex
                  ? "bg-[#FF6B35] text-white"
                  : index === currentStepIndex
                    ? "bg-white text-[#003087]"
                    : "bg-white/30 text-white"
              }`}
            >
              {index < currentStepIndex ? <Check className="w-3 h-3" /> : step.number}
            </div>
            <span className="text-sm">{step.name}</span>
          </div>
        ))}
      </div>

      {/* Selected count */}
      {currentStepIndex > 0 && (
        <div className="mt-8 p-4 bg-white/10 rounded-lg w-full">
          <h3 className="font-medium mb-2">Your Selections</h3>
          <p className="text-sm">{selectionCount}</p>
        </div>
      )}

      {/* Reset progress button */}
      <button
        type="button"
        onClick={() => {
          if (window.confirm("Are you sure you want to clear all progress and start over?")) {
            clearProgress()
          }
        }}
        className="mt-auto text-xs text-white/70 hover:text-white py-2 px-3 rounded-md hover:bg-white/10 transition-colors w-full text-left"
      >
        Reset Progress
      </button>
    </div>
  )

  return (
    // Let's adjust the main container to ensure proper spacing and full width usage

    // Update the main container to have proper padding and width
    <div className="w-full px-0 sm:px-0 md:px-0 py-6">
      <div className="w-full shadow-lg border border-gray-200 rounded-lg overflow-hidden max-w-[1920px] mx-auto">
        <div className="flex flex-col lg:flex-row relative">
          {/* Mobile/Tablet Hamburger Menu */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-[#003087] text-white">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-1 rounded-md hover:bg-white/10"
                type="button"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <span className="font-bold">FREELANCER REGISTER</span>
            </div>
            <div className="text-sm">
              Step {currentStepIndex + 1}/{steps.length}
            </div>
          </div>

          {/* Mobile Progress Bar - Only visible on mobile */}
          <div className="sm:hidden px-4 py-2 bg-white border-b">
            <div className="flex justify-between mb-1">
              <span className="text-xs text-gray-600">Progress</span>
              <span className="text-xs font-medium">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#FF6B35] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Blue sidebar - Desktop always visible, Mobile/Tablet in drawer */}
          <div
            className={`bg-[#003087] text-white lg:w-1/5 p-4 sm:p-6 lg:p-8 pt-8 lg:pt-12 flex flex-col
                  lg:relative lg:block
                  ${sidebarOpen ? "fixed inset-0 z-50 overflow-y-auto" : "hidden"}`}
          >
            {/* Close button for mobile sidebar */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden absolute top-4 right-4 p-1 rounded-md hover:bg-white/10"
              type="button"
            >
              <X size={24} />
            </button>

            {renderSidebarContent()}
          </div>

          {/* Main content area */}
          <div className="w-full lg:w-4/5 flex flex-col">
            {/* Dynamic content based on current step */}
            <div className="flex-grow">{children}</div>

            {/* Navigation */}
            <div className="flex justify-between items-center p-4 sm:p-6 bg-gray-50 border-t border-gray-200">
              {currentStepIndex > 0 ? (
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 rounded-md bg-[#FF6B35] border border-gray-300 text-white hover:bg-[#e55a29] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 text-white" /> Previous
                </button>
              ) : (
                <div></div> // Empty div to maintain layout when there's no "Previous" button
              )}

              <div className="text-sm text-gray-500 hidden sm:block">
                Step {currentStepIndex + 1} of {steps.length}
              </div>

                <button
                type="button"
                onClick={async () => {
                  if (currentStepIndex === steps.length - 1) {
                  // Call your API here
                  try {
                    const response = await fetch("http://localhost:8000/api/v1/freelancer/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              })
              if (!response.ok) {
                throw new Error("Failed to submit form data")
              }
                    console.log("Submitting registration...");
                  } catch (error) {
                    // Handle error
                    console.error("Submission failed", error);
                  }
                  } else {
                  goToNextStep();
                  }
                }}
                disabled={!steps[currentStepIndex]?.isValid}
                className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 rounded-md transition-colors ${
                  steps[currentStepIndex]?.isValid
                  ? "bg-[#FF6B35] text-white hover:bg-[#e55a29]"
                  : "bg-white border border-gray-300 text-gray-400 cursor-not-allowed"
                }`}
                >
                {currentStepIndex === steps.length - 1 ? "Complete" : "Next"}
                <ArrowRight
                  className={`w-4 h-4 ${steps[currentStepIndex]?.isValid ? "text-white" : "text-gray-400"}`}
                />
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress saved notification */}
      <div
        className="fixed bottom-4 right-4 bg-green-100 border border-green-200 text-green-800 px-4 py-2 rounded-md shadow-md text-sm flex items-center gap-2 opacity-0 transition-opacity duration-300"
        id="save-notification"
      >
        <Check className="w-4 h-4" />
        Progress saved
      </div>
    </div>
  )
}

export default FreelancerRegisterLayout
