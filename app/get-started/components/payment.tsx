"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Check, Download, FileText, Lock, Loader2, Eye, EyeOff, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ProceedOptionsProps {
  projectData?: any
  onUpdate?: (data: any) => void
}

// Registration modal component
interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (userData: any) => void
  userEmail: string
  userName: string
}

function RegistrationModal({ isOpen, onClose, onSuccess, userEmail, userName }: RegistrationModalProps) {
  const [step, setStep] = useState<'credentials' | 'otp' | 'success'>('credentials')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [registeredUser, setRegisteredUser] = useState<any>(null)

  const handleRegister = async () => {
    if (!username.trim()) {
      setError('Username is required')
      return
    }
    if (!password.trim()) {
      setError('Password is required')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          fullName: userName,
          email: userEmail,
          password: password
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log('User registered successfully:', result)
      
      // Store user data with username and password for potential login later
      const userDataWithCredentials = {
        ...result.data,
        username: username.trim(),
        password: password // Store temporarily for login if needed
      }
      
      setRegisteredUser(userDataWithCredentials)
      setStep('otp')
    } catch (error) {
      console.error('Registration error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Registration failed'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      setError('OTP is required')
      return
    }
    if (otp.length !== 6) {
      setError('OTP must be 6 digits')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/verifyEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          OTP: otp
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log('OTP verified successfully:', result)
      console.log('Token from verification result:', result.data?.token || result.token)
      
      // Store user data with JWT token if provided
      const userData = {
        ...registeredUser,
        isVerified: true,
        token: result.data?.token || result.token || result.data?.accessToken || result.accessToken, // JWT token from verification
        password: registeredUser.password // Keep password temporarily for potential login fallback
      }
      
      console.log('Final userData with token:', userData)
      
      // If we have a token, remove password for security, otherwise keep it for login fallback
      if (userData.token) {
        const secureUserData = { ...userData, password: undefined }
        localStorage.setItem('registeredUser', JSON.stringify(secureUserData))
      } else {
        localStorage.setItem('registeredUser', JSON.stringify(userData))
      }
      setStep('success')
      
      // Call success callback after a short delay to show success message
      setTimeout(() => {
        onSuccess(userData)
      }, 2000)
    } catch (error) {
      console.error('OTP verification error:', error)
      const errorMessage = error instanceof Error ? error.message : 'OTP verification failed'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const resetModal = () => {
    setStep('credentials')
    setUsername('')
    setPassword('')
    setConfirmPassword('')
    setOtp('')
    setError(null)
    setRegisteredUser(null)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {step === 'credentials' && 'Create Your Account'}
              {step === 'otp' && 'Verify Your Email'}
              {step === 'success' && 'Registration Complete!'}
            </h2>
            <button 
              onClick={() => {
                resetModal()
                onClose()
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {error}
            </div>
          )}

          {step === 'credentials' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={userEmail}
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-xs text-gray-500 mt-1">From your registration form</p>
              </div>

              <div>
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  disabled={isLoading}
                />
              </div>

              <Button
                onClick={handleRegister}
                disabled={isLoading}
                className="w-full bg-[#FF6B35] hover:bg-[#e55a29]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </div>
          )}

          {step === 'otp' && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600">
                  We've sent a 6-digit verification code to:
                </p>
                <p className="font-semibold text-gray-800">{userEmail}</p>
              </div>

              <div>
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit code"
                  disabled={isLoading}
                  className="text-center text-lg tracking-widest"
                  maxLength={6}
                />
              </div>

              <Button
                onClick={handleVerifyOTP}
                disabled={isLoading || otp.length !== 6}
                className="w-full bg-[#FF6B35] hover:bg-[#e55a29]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify Email'
                )}
              </Button>

              <div className="text-center">
                <button
                  onClick={() => setStep('credentials')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  ← Back to registration
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Account Created Successfully!</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Your email has been verified. We're now processing your project...
                </p>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                <span className="text-sm text-gray-600">Setting up your project...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface ProceedOptionsProps {
  projectData?: any
  onUpdate?: (data: any) => void
}

export default function ProceedOptions({ projectData, onUpdate }: ProceedOptionsProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [processingPayment, setProcessingPayment] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [registrationStep, setRegistrationStep] = useState<'idle' | 'registering' | 'registered' | 'processing-payment'>('idle')
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [userFormData, setUserFormData] = useState<any>(null)

  // Handle option selection
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    setPaymentError(null)

    if (onUpdate) {
      onUpdate({
        selectedOption: option,
        completed: false,
      })
    }
  }

  const handleProceed = async () => {
    if (selectedOption === "secure") {
      // Get form data first
      const formDataString = localStorage.getItem("project_builder_form_data")
      if (!formDataString) {
        setPaymentError("No form data found. Please complete step 1 first.")
        return
      }

      const formData = JSON.parse(formDataString)
      const registerData = formData.registerYourself

      if (!registerData || !registerData.fullName || !registerData.businessEmail) {
        setPaymentError("Missing required registration data")
        return
      }

      setUserFormData(formData)
      setShowRegistrationModal(true)
    } else if (selectedOption === "quote") {
      setTimeout(() => {
        const link = document.createElement("a")
        link.href = "/project-quote.pdf" // This would be a real PDF in production
        link.download = "Project_Quote.pdf"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        if (onUpdate) {
          onUpdate({
            selectedOption,
            completed: true,
            action: "downloaded_quote",
          })
        }
      }, 500)
      alert("PDF backend not implemented yet. Contact your backend developer.")
    } else if (selectedOption === "consultation") {
      if (onUpdate) {
        onUpdate({
          selectedOption,
          completed: true,
          action: "opened_calendar",
        })
      }
    }
  }

  const handleRegistrationSuccess = async (userData: any) => {
    setShowRegistrationModal(false)
    setProcessingPayment(true)
    setRegistrationStep('processing-payment')

    try {
      // Submit project data to project-builder API
      await submitProject(userData, userFormData)
      
      // Then proceed with payment
      await handleStripePayment(userData)
    } catch (error) {
      console.error('Project submission error:', error)
      setPaymentError('Failed to submit project. Please try again.')
      setProcessingPayment(false)
      setRegistrationStep('idle')
    }
  }

  // Helper function to get auth token via login API
  const getAuthToken = async (userData: any, formData: any) => {
    try {
      console.log('Attempting to login to get auth token...')
      
      // Try to get stored username and password from registration
      const storedUser = localStorage.getItem('registeredUser')
      let username = userData.username
      let password = userData.password
      
      if ((!username || !password) && storedUser) {
        const parsedUser = JSON.parse(storedUser)
        username = username || parsedUser.username
        password = password || parsedUser.password
      }
      
      // If still no credentials, we can't login
      if (!username || !password) {
        throw new Error('No credentials available for login')
      }

      console.log('Logging in with username:', username)

      const loginResponse = await fetch('http://localhost:8000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      })

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json()
        throw new Error(errorData.message || `Login failed: ${loginResponse.status}`)
      }

      const loginResult = await loginResponse.json()
      console.log('Login successful:', loginResult)
      
      const token = loginResult.data?.token || loginResult.token || loginResult.data?.accessToken || loginResult.accessToken
      
      if (!token) {
        throw new Error('No token received from login response')
      }

      // Update userData with the new token and remove password for security
      const updatedUserData = {
        ...userData,
        token: token,
        password: undefined // Remove password for security
      }
      localStorage.setItem('registeredUser', JSON.stringify(updatedUserData))
      
      return token
    } catch (error) {
      console.error('Error getting auth token:', error)
      throw new Error('Failed to authenticate user for project submission')
    }
  }

  const submitProject = async (userData: any, formData: any) => {
    try {
      // Ensure we have a valid token
      let authToken = userData.token
      
      if (!authToken) {
        console.log('No token found in userData, attempting to login to get token...')
        authToken = await getAuthToken(userData, formData)
      }

      // Prepare project data from form
      const projectData = {
        projectName: `${formData.registerYourself?.companyName || formData.registerYourself?.fullName || 'Project'} Project`,
        projectDescription: generateProjectDescription(formData),
        projectType: getProjectType(formData.services),
        technologies: (formData.technologies || []).map((tech: any) => tech?.technology || tech?.name || tech?.title || 'Technology'),
        features: (formData.features || []).map((feature: any) => feature?.feature || feature?.name || feature?.title || 'Feature'),
        budget: calculateBudget(formData),
        timeline: mapTimelineToReadable(formData.timeline),
        priority: "HIGH",
        status: "SUBMITTED",
        clientName: formData.registerYourself?.fullName || "",
        clientEmail: formData.registerYourself?.businessEmail || "",
        clientPhone: formData.registerYourself?.phoneNumber || "",
        clientCompany: formData.registerYourself?.companyName || "",
        additionalNotes: generateAdditionalNotes(formData)
      }

      console.log('Submitting project data:', projectData)
      console.log('User data for project submission:', userData)
      console.log('Token being used for authorization:', authToken)

      let response
      try {
        response = await fetch('http://localhost:8000/api/v1/project-builder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify(projectData),
        })
      } catch (networkError) {
        console.error('Network error when calling backend API:', networkError)
        throw new Error('Unable to connect to backend server. Please ensure the backend is running on http://localhost:8000')
      }

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } catch (e) {
          // If response is not JSON, use default error message
          console.error('Failed to parse error response:', e)
        }
        throw new Error(errorMessage)
      }

      const result = await response.json()
      console.log('Project submitted successfully:', result)

      // Store project data for payment reference
      localStorage.setItem('submittedProject', JSON.stringify({
        ...result.data,
        submissionTime: new Date().toISOString()
      }))

      return result.data
    } catch (error) {
      console.error('Error submitting project:', error)
      throw error
    }
  }

  // Helper functions to generate project data
  const generateProjectDescription = (formData: any) => {
    const services = (formData.services || []).map((s: any) => s?.service || s?.title || s?.name || 'Service').join(', ')
    const industries = (formData.industries || []).map((i: any) => i?.industry || i?.title || i?.name || 'Industry').join(', ')
    
    return `A comprehensive project involving ${services} for the ${industries} industry. This project will leverage modern technologies and best practices to deliver a high-quality solution.`
  }

  const getProjectType = (services: any[]) => {
    if (!services || !Array.isArray(services)) {
      return 'Custom Development'
    }
    
    if (services.some((s: any) => {
      const serviceName = s?.service || s?.title || s?.name || ''
      return serviceName.toLowerCase().includes('mobile')
    })) {
      return 'Mobile Development'
    }
    if (services.some((s: any) => {
      const serviceName = s?.service || s?.title || s?.name || ''
      return serviceName.toLowerCase().includes('web')
    })) {
      return 'Web Development'
    }
    return 'Custom Development'
  }

  const calculateBudget = (formData: any) => {
    // Simple budget calculation based on selections
    const baseAmount = 5000
    const serviceMultiplier = (formData.services?.length || 0) * 200
    const technologyMultiplier = (formData.technologies?.length || 0) * 300
    const featureMultiplier = (formData.features?.length || 0) * 100
    
    return baseAmount + serviceMultiplier + technologyMultiplier + featureMultiplier
  }

  const generateAdditionalNotes = (formData: any) => {
    return `Project generated through online project builder. Business type: ${formData.registerYourself?.businessType || 'Not specified'}. Referral source: ${formData.registerYourself?.referralSource || 'Not specified'}.`
  }

  const mapTimelineToReadable = (timeline: string | undefined) => {
    if (!timeline) return "3-4 months"
    
    switch (timeline.toLowerCase()) {
      case "fast-track":
        return "25 days"
      case "rapid":
        return "1 month"
      case "accelerated":
        return "6 weeks"
      case "priority":
        return "1.5 months"
      case "standard":
        return "2 months"
      default:
        return "3-4 months"
    }
  }

  const handleStripePayment = async (userData?: any) => {
    setProcessingPayment(true)
    setPaymentError(null)
    setRegistrationStep('processing-payment')

    try {
      // Get visitor data from localStorage (optional)
      const visitorData = localStorage.getItem("visitorData")
      const visitor = visitorData ? JSON.parse(visitorData) : {}

      // Get project data for amount calculation
      const submittedProject = localStorage.getItem('submittedProject')
      const project = submittedProject ? JSON.parse(submittedProject) : null

      // Calculate amount based on project data
      const estimatedTotal = project?.budget || 5400
      const depositAmount = Math.round(estimatedTotal * 0.25) // 25% deposit
      const amountInCents = depositAmount * 100 // Convert to cents for Stripe

      // Get auth token for backend API call
      const authToken = userData?.token || localStorage.getItem('authToken')

      // Create checkout session - Call backend directly
      const response = await fetch("http://localhost:8000/api/v1/payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify({
          amount: amountInCents,
          currency: "usd",
          customerEmail: userData?.email || visitor.businessEmail || "guest@primelogicsol.com",
          customerName: userData?.fullName || visitor.fullName || "Guest User",
          successUrl: `${window.location.origin}/get-started/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/get-started?step=payment`,
          description: "Project Development - 25% Deposit",
          metadata: {
            visitorId: visitor.id || "guest",
            userId: userData?.id || "guest",
            projectId: project?.id || "unknown",
            projectType: "custom_development",
            depositPercentage: "25",
          },
        }),
      })

      const result = await response.json()

      if (result.success && result.data.url) {
        // Store payment session info for later reference
        localStorage.setItem(
          "paymentSession",
          JSON.stringify({
            sessionId: result.data.sessionId,
            paymentId: result.data.paymentId,
            amount: depositAmount,
            userId: userData?.id,
            projectId: project?.id,
            timestamp: new Date().toISOString(),
          }),
        )

        // Redirect to Stripe checkout
        window.location.href = result.data.url
      } else {
        setPaymentError(result.message || "Failed to create payment session")
        setRegistrationStep('idle')
      }
    } catch (error) {
      console.error("Payment error:", error)
      setPaymentError("Network error. Please try again.")
      setRegistrationStep('idle')
    } finally {
      setProcessingPayment(false)
    }
  }

  // Calculate estimated amounts for display
  const getEstimatedAmounts = () => {
    // Get project data if available
    const submittedProject = localStorage.getItem('submittedProject')
    const project = submittedProject ? JSON.parse(submittedProject) : null
    
    const baseAmount = project?.budget || 5400
    const depositAmount = Math.round(baseAmount * 0.25)
    return { baseAmount, depositAmount }
  }

  const { baseAmount, depositAmount } = getEstimatedAmounts()

  return (
    <div className="w-full p-4 sm:p-6 md:p-8">
      {/* Registration Modal */}
      {userFormData && (
        <RegistrationModal
          isOpen={showRegistrationModal}
          onClose={() => setShowRegistrationModal(false)}
          onSuccess={handleRegistrationSuccess}
          userEmail={userFormData.registerYourself.businessEmail}
          userName={userFormData.registerYourself.fullName}
        />
      )}
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">You're Almost There — Choose Your Path Forward</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select how you'd like to proceed with your project. We're ready to support you every step of the way.
          </p>
        </div>

        {paymentError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md max-w-2xl mx-auto">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-2 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-red-700 text-sm">{paymentError}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Option 1: Secure My Project */}
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-semibold mb-3 text-[#003087]">I'm Ready to Start</h3>
            <Card
              className={`border-2 transition-all cursor-pointer hover:shadow-md h-full ${
                selectedOption === "secure" ? "border-[#003087] bg-blue-50" : "border-gray-200"
              }`}
              onClick={() => handleOptionSelect("secure")}
            >
              <CardHeader className="pb-4">
                <div className="mb-2 flex justify-between items-start">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedOption === "secure" ? "bg-[#003087] text-white" : "bg-gray-100"
                    }`}
                  >
                    <Lock className="h-5 w-5" />
                  </div>
                  {selectedOption === "secure" && <Check className="h-5 w-5 text-[#003087]" />}
                </div>
                <CardTitle className="text-xl">Secure My Project</CardTitle>
                <CardDescription>Proceed to Payment</CardDescription>
              </CardHeader>
              <CardContent className="pb-4 flex-grow flex flex-col">
                <p className="text-sm text-gray-600 mb-4 flex-grow">
                  Lock in your project now with a 25% deposit (${depositAmount.toLocaleString()}). Your project will be
                  prioritized in our queue.
                </p>
                <div className="flex flex-wrap gap-2 justify-center mt-6">
                  <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">VISA</span>
                  </div>
                  <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-red-600">MC</span>
                  </div>
                  <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-800">PP</span>
                  </div>
                  <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-green-600">UPI</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-7">
                <p className="text-xs text-gray-500">Secure payment gateway • 100% money-back guarantee</p>
              </CardFooter>
            </Card>
          </div>

          {/* Option 2: Request Formal Quote */}
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-semibold mb-3 text-[#003087]">I Want to Compare Options</h3>
            <Card
              className={`border-2 transition-all cursor-pointer hover:shadow-md h-full ${
                selectedOption === "quote" ? "border-[#003087] bg-blue-50" : "border-gray-200"
              }`}
              onClick={() => handleOptionSelect("quote")}
            >
              <CardHeader className="pb-4">
                <div className="mb-2 flex justify-between items-start">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedOption === "quote" ? "bg-[#003087] text-white" : "bg-gray-100"
                    }`}
                  >
                    <FileText className="h-5 w-5" />
                  </div>
                  {selectedOption === "quote" && <Check className="h-5 w-5 text-[#003087]" />}
                </div>
                <CardTitle className="text-xl">Request Formal Quote</CardTitle>
                <CardDescription>Get Instant PDF</CardDescription>
              </CardHeader>
              <CardContent className="pb-4 flex-grow flex flex-col">
                <p className="text-sm text-gray-600 mb-4 flex-grow">
                  Receive a detailed quote document with project specifications, timeline, and payment terms.
                </p>
                <div className="flex items-center justify-center mt-auto">
                  <div className="w-16 h-16 bg-[#003087] rounded flex items-center justify-center">
                    <Download className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4">
                <p className="text-xs text-gray-500">PDF format • Share with stakeholders • Valid for 30 days</p>
              </CardFooter>
            </Card>
          </div>

          {/* Option 3: Schedule Free Consultation */}
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-semibold mb-3 text-[#003087]">I Need More Information</h3>
            <Card
              className={`border-2 transition-all cursor-pointer hover:shadow-md h-full ${
                selectedOption === "consultation" ? "border-[#003087] bg-blue-50" : "border-gray-200"
              }`}
              onClick={() => handleOptionSelect("consultation")}
            >
              <CardHeader className="pb-4">
                <div className="mb-2 flex justify-between items-start">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedOption === "consultation" ? "bg-[#003087] text-white" : "bg-gray-100"
                    }`}
                  >
                    <Calendar className="h-5 w-5" />
                  </div>
                  {selectedOption === "consultation" && <Check className="h-5 w-5 text-[#003087]" />}
                </div>
                <CardTitle className="text-xl">Schedule Free Consultation</CardTitle>
                <CardDescription>Book a Meeting</CardDescription>
              </CardHeader>
              <CardContent className="pb-4 flex-grow flex flex-col">
                <p className="text-sm text-gray-600 mb-4 flex-grow">
                  Discuss your project with our experts. Get personalized advice and answers to your questions.
                </p>
                <div className="flex items-center justify-center mt-auto">
                  <div className="w-20 h-16 bg-[#003087] rounded flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4">
                <p className="text-xs text-gray-500">30-minute call • No obligation • Choose your time slot</p>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Proceed Button */}
        <div className="flex justify-center mt-8">
          {selectedOption === "consultation" ? (
            <Link href="/consultation" prefetch={true}>
              <Button className="px-8 py-6 text-lg bg-[#FF6B35] hover:bg-[#e55a29] flex items-center gap-2">
                Book Consultation <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button
              onClick={handleProceed}
              disabled={!selectedOption || processingPayment}
              className="px-8 py-6 text-lg bg-[#FF6B35] hover:bg-[#e55a29] flex items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {processingPayment ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  {selectedOption === "secure" && registrationStep === 'processing-payment' && "Processing Project & Payment..."}
                  {selectedOption !== "secure" && "Processing..."}
                </>
              ) : (
                <>
                  {selectedOption === "secure" && (
                    <>
                      Secure My Project <Lock className="ml-2 h-4 w-4" />
                    </>
                  )}
                  {selectedOption === "quote" && (
                    <>
                      Download Quote <Download className="ml-2 h-4 w-4" />
                    </>
                  )}
                  {!selectedOption && "Select an Option"}
                </>
              )}
            </Button>
          )}
        </div>

        {/* Confidence Message */}
        {selectedOption && (
          <div className="text-center mt-4 text-gray-600 italic">
            You confidently choose:
            <span className="font-semibold ml-1">
              {selectedOption === "secure" && "Secure My Project"}
              {selectedOption === "quote" && "Request Formal Quote"}
              {selectedOption === "consultation" && "Schedule Free Consultation"}
            </span>
            {selectedOption === "secure" && <span className="block mt-1">(You're ready.)</span>}
          </div>
        )}

        {selectedOption === "secure" && (
          <div className="mt-8 max-w-md mx-auto p-6 bg-gray-50 rounded-lg border">
            <h3 className="font-semibold mb-4 text-center">Payment Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Project Estimate:</span>
                <span>${baseAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Deposit (25%):</span>
                <span>${depositAmount.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Due Today:</span>
                <span>${depositAmount.toLocaleString()}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">Remaining balance due upon project completion</p>
          </div>
        )}
      </div>
    </div>
  )
}