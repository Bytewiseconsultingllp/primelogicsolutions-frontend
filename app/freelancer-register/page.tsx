"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { FreelancerRegisterLayout } from "./components/layout"
import WhoYouAre from "./components/who-you-are"
import CoreRole from "./components/core-role"
import EliteSkillCards from "./components/elite-skill-card"
import ToolstackProficiency from "./components/toolstack-proficiency"
import DomainExperience from "./components/domain-experience"
import IndustryExperience from "./components/industry-experience"
import AvailabilityWorkflow from "./components/availability-workflow"
import SoftSkills from "./components/soft-skills"
import Certifications from "./components/certifications"
import ProjectQuoting from "./components/project-quoting"
import LegalAgreements from "./components/legal-agreements"

// Define interfaces for type safety
export interface FreelancerData {
  whoYouAre: {
    fullName: string
    email: string
    timeZone: string
    country: string
    professionalLinks: {
      github?: string
      gitlab?: string
      dribbble?: string
      behance?: string
      stackoverflow?: string
      medium?: string
      kaggle?: string
      personalSite?: string
      linkedin?: string
    }
  }
  coreRole: {
    primaryDomain: string
  }
  eliteSkillCards: {
    selectedSkills: string[]
  }
  toolstackProficiency: {
    selectedTools: {
      category: string
      tools: string[]
    }[]
  }
  domainExperience: {
    roles: {
      title: string
      years: number
    }[]
  }
  industryExperience: {
    selectedIndustries: string[]
  }
  availabilityWorkflow: {
    weeklyCommitment: number
    workingHours: string[]
    collaborationTools: string[]
    teamStyle: string
    screenSharing: string
    availabilityExceptions: string
  }
  softSkills: {
    collaborationStyle: string
    communicationFrequency: string
    conflictResolution: string
    languages: string[]
    teamVsSolo: string
  }
  certifications: {
    certificates: {
      name: string
      url: string
    }[]
  }
  projectQuoting: {
    compensationPreference: string
    smallProjectPrice: number
    midProjectPrice: number
    longTermPrice: number
    milestoneTerms: string
    willSubmitProposals: string
  }
  legalAgreements: {
    agreements: {
      id: string
      accepted: boolean
    }[]
    identityVerification: {
      idType: string
      taxDocType: string
      addressVerified: boolean
    }
    workAuthorization: {
      interested: boolean
    }
  }
}

interface Step {
  number: number
  name: string
  requiredFields?: string[]
}

// Storage keys
const STORAGE_KEYS = {
  FORM_DATA: "freelancer_register_form_data",
  CURRENT_STEP: "freelancer_register_current_step",
}

// Define steps
const STEPS: Step[] = [
  {
    number: 1,
    name: "Who You Are",
    requiredFields: ["fullName", "email", "country"],
  },
  {
    number: 2,
    name: "Core Role",
    requiredFields: ["primaryDomain"],
  },
  {
    number: 3,
    name: "Elite Skill Cards",
    requiredFields: [],
  },
  {
    number: 4,
    name: "Toolstack Proficiency",
    requiredFields: [],
  },
  {
    number: 5,
    name: "Domain Experience",
    requiredFields: [],
  },
  {
    number: 6,
    name: "Industry Experience",
    requiredFields: [],
  },
  {
    number: 7,
    name: "Availability & Workflow",
    requiredFields: [],
  },
  {
    number: 8,
    name: "Soft Skills",
    requiredFields: [],
  },
  {
    number: 9,
    name: "Certifications",
    requiredFields: [],
  },
  {
    number: 10,
    name: "Project Quoting",
    requiredFields: [],
  },
  {
    number: 11,
    name: "Legal Agreements",
    requiredFields: [],
  },
]

export default function FreelancerRegisterPage() {
  // Initialize form data from localStorage or use default values
  const [formData, setFormData] = useState<FreelancerData>(() => {
    // Only run in browser environment
    if (typeof window !== "undefined") {
      try {
        const savedData = localStorage.getItem(STORAGE_KEYS.FORM_DATA)
        if (savedData) {
          return JSON.parse(savedData)
        }
      } catch (error) {
        console.error("Error loading saved form data:", error)
      }
    }

    // Default form data if nothing in localStorage
    return {
      whoYouAre: {
        fullName: "",
        email: "",
        timeZone: "",
        country: "",
        professionalLinks: {},
      },
      coreRole: {
        primaryDomain: "",
      },
      eliteSkillCards: {
        selectedSkills: [],
      },
      toolstackProficiency: {
        selectedTools: [],
      },
      domainExperience: {
        roles: [],
      },
      industryExperience: {
        selectedIndustries: [],
      },
      availabilityWorkflow: {
        weeklyCommitment: 20,
        workingHours: [],
        collaborationTools: [],
        teamStyle: "",
        screenSharing: "",
        availabilityExceptions: "",
      },
      softSkills: {
        collaborationStyle: "",
        communicationFrequency: "",
        conflictResolution: "",
        languages: ["English"],
        teamVsSolo: "",
      },
      certifications: {
        certificates: [],
      },
      projectQuoting: {
        compensationPreference: "",
        smallProjectPrice: 0,
        midProjectPrice: 0,
        longTermPrice: 0,
        milestoneTerms: "",
        willSubmitProposals: "",
      },
      legalAgreements: {
        agreements: [],
        identityVerification: {
          idType: "",
          taxDocType: "",
          addressVerified: false,
        },
        workAuthorization: {
          interested: false,
        },
      },
    }
  })

  // Initialize current step from localStorage or default to 0
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedStep = localStorage.getItem(STORAGE_KEYS.CURRENT_STEP)
        if (savedStep !== null) {
          return Number.parseInt(savedStep, 10)
        }
      } catch (error) {
        console.error("Error loading saved step:", error)
      }
    }
    return 0
  })

  // Update form data
  const updateFormData = useCallback((section: keyof FreelancerData, data: any) => {
    setFormData((prev) => {
      return {
        ...prev,
        [section]: data,
      }
    })
  }, [])

  // Save form data to localStorage with throttling
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEYS.FORM_DATA, JSON.stringify(formData))
        } catch (error) {
          console.error("Error saving form data:", error)
        }
      }
    }, 500) // 500ms throttle

    return () => clearTimeout(saveTimeout)
  }, [formData])

  // Save current step to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEYS.CURRENT_STEP, currentStepIndex.toString())
      } catch (error) {
        console.error("Error saving current step:", error)
      }
    }
  }, [currentStepIndex])

  // Function to check if a step is valid
  const isStepValid = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0: // Who You Are
        return (
          formData.whoYouAre.fullName.trim() !== "" &&
          formData.whoYouAre.email.trim() !== "" &&
          formData.whoYouAre.country.trim() !== ""
        )
      case 1: // Core Role
        return formData.coreRole.primaryDomain !== ""
      case 2: // Elite Skill Cards
        return formData.eliteSkillCards.selectedSkills.length > 0
      case 3: // Toolstack Proficiency
        return formData.toolstackProficiency.selectedTools.length > 0
      case 4: // Domain Experience
        return formData.domainExperience.roles.length > 0
      case 5: // Industry Experience
        return formData.industryExperience.selectedIndustries.length > 0
      case 6: // Availability & Workflow
        return (
          formData.availabilityWorkflow.workingHours.length > 0 &&
          formData.availabilityWorkflow.teamStyle !== "" &&
          formData.availabilityWorkflow.screenSharing !== ""
        )
      case 7: // Soft Skills
        return (
          formData.softSkills.collaborationStyle !== "" &&
          formData.softSkills.communicationFrequency !== "" &&
          formData.softSkills.conflictResolution !== "" &&
          formData.softSkills.teamVsSolo !== ""
        )
      case 8: // Certifications
        return true // Optional
      case 9: // Project Quoting
        return (
          formData.projectQuoting.compensationPreference !== "" &&
          (formData.projectQuoting.smallProjectPrice > 0 ||
            formData.projectQuoting.midProjectPrice > 0 ||
            formData.projectQuoting.longTermPrice > 0)
        )
      case 10: // Legal Agreements
        const requiredAgreements = ["nda", "workForHire", "scope", "payment", "nonSolicitation", "codeOfConduct"]
        const allAgreementsAccepted = requiredAgreements.every((id) =>
          formData.legalAgreements.agreements.some((a) => a.id === id && a.accepted),
        )
        const identityVerified =
          formData.legalAgreements.identityVerification.idType !== "" &&
          formData.legalAgreements.identityVerification.taxDocType !== ""
        return allAgreementsAccepted && identityVerified
      default:
        return false
    }
  }

  // Navigate to next step
  const goToNextStep = () => {
    if (currentStepIndex < STEPS.length - 1) {
      if (isStepValid(currentStepIndex)) {
        setCurrentStepIndex((prevIndex) => prevIndex + 1)
        window.scrollTo(0, 0)
      } else {
        console.log("Current step is not valid yet")
      }
    }
  }

  // Navigate to previous step
  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prevIndex) => prevIndex - 1)
      window.scrollTo(0, 0)
    }
  }

  // Navigate to a specific step
  const goToStep = (index: number) => {
    // Only allow navigation to completed steps or the current step
    if (index >= 0 && index <= currentStepIndex) {
      setCurrentStepIndex(index)
      window.scrollTo(0, 0)
    }
  }

  // Clear saved progress
  const clearProgress = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(STORAGE_KEYS.FORM_DATA)
        localStorage.removeItem(STORAGE_KEYS.CURRENT_STEP)
        window.location.reload()
      } catch (error) {
        console.error("Error clearing progress:", error)
      }
    }
  }

  // Calculate progress percentage
  const progressPercentage = Math.round(((currentStepIndex + 1) / STEPS.length) * 100)

  // Get selection count based on current step
  const getSelectionCount = () => {
    switch (currentStepIndex) {
      case 0: // Who You Are
        return formData.whoYouAre.fullName ? "Personal details added" : "No details added"
      case 1: // Core Role
        return formData.coreRole.primaryDomain || "No role selected"
      case 2: // Elite Skill Cards
        return `${formData.eliteSkillCards.selectedSkills.length} skills selected`
      case 3: // Toolstack Proficiency
        return `${formData.toolstackProficiency.selectedTools.length} tool categories selected`
      case 4: // Domain Experience
        return `${formData.domainExperience.roles.length} roles added`
      case 5: // Industry Experience
        return `${formData.industryExperience.selectedIndustries.length} industries selected`
      case 6: // Availability & Workflow
        return formData.availabilityWorkflow.weeklyCommitment > 0
          ? `${formData.availabilityWorkflow.weeklyCommitment} hours per week`
          : "No availability set"
      case 7: // Soft Skills
        return formData.softSkills.collaborationStyle ? "Soft skills defined" : "No soft skills defined"
      case 8: // Certifications
        return `${formData.certifications.certificates.length} certificates added`
      case 9: // Project Quoting
        return formData.projectQuoting.compensationPreference
          ? `Prefers ${formData.projectQuoting.compensationPreference}`
          : "No pricing preferences set"
      case 10: // Legal Agreements
        const acceptedCount = formData.legalAgreements.agreements.filter((a) => a.accepted).length
        const totalCount = 8 // Total number of agreements
        return `${acceptedCount}/${totalCount} agreements accepted`
      default:
        return ""
    }
  }

  // Render the current step component with props
  const renderCurrentStepComponent = () => {
    switch (currentStepIndex) {
      case 0:
        return <WhoYouAre data={formData.whoYouAre} onUpdate={(data) => updateFormData("whoYouAre", data)} />
      case 1:
        return <CoreRole data={formData.coreRole} onUpdate={(data) => updateFormData("coreRole", data)} />
      case 2:
        return (
          <EliteSkillCards
            data={formData.eliteSkillCards}
            primaryDomain={formData.coreRole.primaryDomain}
            onUpdate={(data) => updateFormData("eliteSkillCards", data)}
          />
        )
      case 3:
        return (
          <ToolstackProficiency
            data={formData.toolstackProficiency}
            primaryDomain={formData.coreRole.primaryDomain}
            onUpdate={(data) => updateFormData("toolstackProficiency", data)}
          />
        )
      case 4:
        return (
          <DomainExperience
            data={formData.domainExperience}
            primaryDomain={formData.coreRole.primaryDomain}
            onUpdate={(data) => updateFormData("domainExperience", data)}
          />
        )
      case 5:
        return (
          <IndustryExperience
            data={formData.industryExperience}
            onUpdate={(data) => updateFormData("industryExperience", data)}
          />
        )
      case 6:
        return (
          <AvailabilityWorkflow
            data={formData.availabilityWorkflow}
            onUpdate={(data) => updateFormData("availabilityWorkflow", data)}
          />
        )
      case 7:
        return <SoftSkills data={formData.softSkills} onUpdate={(data) => updateFormData("softSkills", data)} />
      case 8:
        return (
          <Certifications
            data={formData.certifications}
            primaryDomain={formData.coreRole.primaryDomain}
            onUpdate={(data) => updateFormData("certifications", data)}
          />
        )
      case 9:
        return (
          <ProjectQuoting data={formData.projectQuoting} onUpdate={(data) => updateFormData("projectQuoting", data)} />
        )
      case 10:
        return (
          <LegalAgreements
            data={formData.legalAgreements}
            freelancerName={formData.whoYouAre.fullName}
            onUpdate={(data) => updateFormData("legalAgreements", data)}
          />
        )
      default:
        // Show a notification if the API is not available
        useEffect(() => {
          const sendFormData = async () => {
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
              // Optionally handle response here
            } catch (error) {
              console.error("Error submitting form data:", error)
            }
          }
          sendFormData()
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        return (
          <div className="p-8 text-center text-red-600">
            Unable to render this step. Form data has been sent to the server.
          </div>
        )
        return null
    }
  }

  // Prepare steps with validation status for the layout
  const stepsWithValidation = useMemo(() => {
    return STEPS.map((step, index) => ({
      ...step,
      isValid: isStepValid(index),
      component: null, // We don't need this anymore
    }))
  }, [formData]) // Only recalculate when formData changes

  return (
    <FreelancerRegisterLayout
      currentStepIndex={currentStepIndex}
      steps={stepsWithValidation}
      progressPercentage={progressPercentage}
      goToStep={goToStep}
      goToNextStep={goToNextStep}
      goToPreviousStep={goToPreviousStep}
      clearProgress={clearProgress}
      selectionCount={getSelectionCount()}
      formData={formData}
    >
      {renderCurrentStepComponent()}
    </FreelancerRegisterLayout>
  )
}
