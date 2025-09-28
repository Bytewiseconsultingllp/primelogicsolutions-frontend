"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"

interface Role {
  title: string
  years: number
}

interface DomainExperienceData {
  roles: Role[]
}

interface DomainExperienceProps {
  data: DomainExperienceData
  primaryDomain: string
  onUpdate: (data: DomainExperienceData) => void
}

export default function DomainExperience({ data, primaryDomain, onUpdate }: DomainExperienceProps) {
  const [formData, setFormData] = useState<DomainExperienceData>(data)
  const [newRole, setNewRole] = useState<Role>({ title: "", years: 0 })

  // Update parent component when form data changes
  useEffect(() => {
    const updateTimeout = setTimeout(() => {
      onUpdate(formData)
    }, 100)

    return () => clearTimeout(updateTimeout)
  }, [formData, onUpdate])

  // Add a new role
  const addRole = () => {
    if (newRole.title && newRole.years > 0) {
      setFormData({
        ...formData,
        roles: [...formData.roles, { ...newRole }],
      })
      setNewRole({ title: "", years: 0 })
    }
  }

  // Remove a role
  const removeRole = (index: number) => {
    setFormData({
      ...formData,
      roles: formData.roles.filter((_, i) => i !== index),
    })
  }

  // Handle input changes for new role
  const handleNewRoleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewRole({
      ...newRole,
      [name]: name === "years" ? Number.parseInt(value) || 0 : value,
    })
  }

  // Get suggested roles based on primary domain
  const getSuggestedRoles = () => {
    if (primaryDomain.includes("Software Developer") || primaryDomain.includes("Software Engineering")) {
      return [
        "Junior Software Engineer",
        "Backend Developer",
        "Full-Stack Developer",
        "Systems Engineer / API Specialist",
        "Tech Lead / Engineering Manager",
        "Software Architect",
        "DevOps / Infrastructure",
        "AI/ML Engineer",
      ]
    } else if (primaryDomain.includes("Web Development")) {
      return [
        "Frontend Developer (React/JS)",
        "JAMstack / Static Site Dev",
        "CMS Developer",
        "Full-Stack Developer",
        "UI/UX Focused Coder",
        "Performance Optimizer",
        "Accessibility / SEO Schema Dev",
      ]
    } else if (primaryDomain.includes("Digital Marketing")) {
      return [
        "SEO Specialist",
        "Performance Marketer (Google/Meta Ads)",
        "Email / CRM Automation Lead",
        "Content Strategist",
        "CRO (Landing Pages / A/B)",
        "Social Media Manager",
        "Marketing Analyst / Attribution",
      ]
    } else if (primaryDomain.includes("Mobile App Development")) {
      return [
        "iOS Developer",
        "Android Developer",
        "React Native Developer",
        "Flutter Developer",
        "Mobile UI/UX Designer",
        "Mobile App Architect",
        "Cross-Platform Developer",
      ]
    } else if (primaryDomain.includes("UI/UX")) {
      return [
        "UI Designer",
        "UX Researcher",
        "Product Designer",
        "Interaction Designer",
        "Visual Designer",
        "Design Systems Specialist",
        "Prototyping Expert",
      ]
    } else if (primaryDomain.includes("DevOps")) {
      return [
        "DevOps Engineer",
        "Site Reliability Engineer",
        "Cloud Architect",
        "Infrastructure Engineer",
        "Platform Engineer",
        "Release Engineer",
        "Security DevOps",
      ]
    } else if (primaryDomain.includes("Data Science")) {
      return [
        "Data Scientist",
        "Machine Learning Engineer",
        "Data Analyst",
        "Data Engineer",
        "AI Researcher",
        "NLP Specialist",
        "Computer Vision Engineer",
      ]
    } else if (primaryDomain.includes("Blockchain")) {
      return [
        "Blockchain Developer",
        "Smart Contract Engineer",
        "DApp Developer",
        "Solidity Developer",
        "Web3 Frontend Developer",
        "Blockchain Architect",
        "Tokenomics Specialist",
      ]
    } else if (primaryDomain.includes("QA")) {
      return [
        "QA Engineer",
        "Test Automation Engineer",
        "Manual Tester",
        "Performance Tester",
        "Security Tester",
        "QA Lead",
        "Test Architect",
      ]
    } else if (primaryDomain.includes("Cybersecurity")) {
      return [
        "Security Engineer",
        "Penetration Tester",
        "Security Analyst",
        "Security Architect",
        "Compliance Specialist",
        "Security Operations Engineer",
        "Identity & Access Management Specialist",
      ]
    } else {
      return [
        "Project Manager",
        "Team Lead",
        "Product Manager",
        "Business Analyst",
        "Technical Writer",
        "Customer Success Manager",
        "Technical Support Specialist",
      ]
    }
  }

  const suggestedRoles = getSuggestedRoles()

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Domain Experience Breakdown</h1>
          <p className="text-gray-600">Your evolution matters. Let us see the roles you've grown through.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Experience in {primaryDomain}</CardTitle>
            <CardDescription>Add the roles you've held and your years of experience in each</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Current roles */}
              {formData.roles.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-medium">Your Roles</h3>
                  <div className="space-y-3">
                    {formData.roles.map((role, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                        <div>
                          <span className="font-medium">{role.title}</span>
                          <span className="text-gray-500 ml-2">
                            {role.years} {role.years === 1 ? "year" : "years"}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeRole(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add new role */}
              <div className="space-y-4">
                <h3 className="font-medium">Add a Role</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Role / Title</Label>
                    <select
                      id="title"
                      name="title"
                      value={newRole.title}
                      onChange={handleNewRoleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select a role or type your own</option>
                      {suggestedRoles.map((role, index) => (
                        <option key={index} value={role}>
                          {role}
                        </option>
                      ))}
                      <option value="custom">Custom Role (Type Below)</option>
                    </select>
                    {newRole.title === "custom" && (
                      <Input
                        id="customTitle"
                        name="title"
                        placeholder="Enter your custom role"
                        onChange={handleNewRoleChange}
                        className="mt-2"
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="years">Years of Experience</Label>
                    <Input
                      id="years"
                      name="years"
                      type="number"
                      min="0"
                      max="50"
                      value={newRole.years || ""}
                      onChange={handleNewRoleChange}
                      placeholder="Years in this role"
                    />
                  </div>
                </div>
                <Button onClick={addRole} disabled={!newRole.title || newRole.years <= 0} className="mt-2 bg-[#FF6B35] text-white">
                  <Plus className="h-4 w-4 mr-2" /> Add Role
                </Button>
              </div>

              {/* Suggested roles */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium mb-2">Suggested Roles for {primaryDomain}</h3>
                <div className="flex flex-wrap gap-2">
                  {suggestedRoles.map((role, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setNewRole({ ...newRole, title: role })}
                      className="text-xs"
                    >
                      {role}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
