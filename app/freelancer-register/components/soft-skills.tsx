"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"

interface SoftSkillsData {
  collaborationStyle: string
  communicationFrequency: string
  conflictResolution: string
  languages: string[]
  teamVsSolo: string
}

interface SoftSkillsProps {
  data: SoftSkillsData
  onUpdate: (data: SoftSkillsData) => void
}

export default function SoftSkills({ data, onUpdate }: SoftSkillsProps) {
  const [formData, setFormData] = useState<SoftSkillsData>(data)
  const [otherLanguage, setOtherLanguage] = useState("")

  // Update parent component when form data changes
  useEffect(() => {
    const updateTimeout = setTimeout(() => {
      onUpdate(formData)
    }, 100)

    return () => clearTimeout(updateTimeout)
  }, [formData, onUpdate])

  // Handle radio button changes
  const handleRadioChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle language selection
  const handleLanguageChange = (language: string, checked: boolean) => {
    setFormData((prev) => {
      if (checked) {
        return {
          ...prev,
          languages: [...prev.languages.filter((l) => l !== language), language],
        }
      } else {
        return {
          ...prev,
          languages: prev.languages.filter((l) => l !== language),
        }
      }
    })
  }

  // Add other language
  const addOtherLanguage = () => {
    if (otherLanguage && !formData.languages.includes(otherLanguage)) {
      setFormData({
        ...formData,
        languages: [...formData.languages, otherLanguage],
      })
      setOtherLanguage("")
    }
  }

  // Languages options
  const languages = ["English", "Hindi / Urdu", "Spanish", "Arabic", "Mandarin", "French", "German", "Kashmiri"]

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Soft Skills & Team Dynamics</h1>
          <p className="text-gray-600">
            Your mindset is just as important as your method. This is how we build high-trust, high-performance teams.
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Preferred Collaboration Style</CardTitle>
              <CardDescription>How do you prefer to work within teams?</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.collaborationStyle}
                onValueChange={(value) => handleRadioChange("collaborationStyle", value)}
                className="space-y-3"
              >
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="agile" id="collab-agile" />
                  <div>
                    <Label htmlFor="collab-agile" className="cursor-pointer">
                      Agile / Scrum
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">Standups, sprints, retrospectives</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="async" id="collab-async" />
                  <div>
                    <Label htmlFor="collab-async" className="cursor-pointer">
                      Async & Document-First
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">Notion, Loom, task-based updates</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="structured" id="collab-structured" />
                  <div>
                    <Label htmlFor="collab-structured" className="cursor-pointer">
                      Structured & Process-Oriented
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">SOPs, linear workflows, strict PM roles</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="flexible" id="collab-flexible" />
                  <div>
                    <Label htmlFor="collab-flexible" className="cursor-pointer">
                      Flexible & Context-Driven
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">Whatever gets the job done</p>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Communication Frequency Preference</CardTitle>
              <CardDescription>How often do you prefer to communicate during a project?</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.communicationFrequency}
                onValueChange={(value) => handleRadioChange("communicationFrequency", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="comm-daily" />
                  <Label htmlFor="comm-daily" className="cursor-pointer">
                    Daily check-ins
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="comm-weekly" />
                  <Label htmlFor="comm-weekly" className="cursor-pointer">
                    Weekly milestone reviews
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="adhoc" id="comm-adhoc" />
                  <Label htmlFor="comm-adhoc" className="cursor-pointer">
                    Ad hoc / only when necessary
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="adaptive" id="comm-adaptive" />
                  <Label htmlFor="comm-adaptive" className="cursor-pointer">
                    I adapt to client/team preference
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conflict Resolution Style</CardTitle>
              <CardDescription>What's your default approach when disagreements arise on a team?</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.conflictResolution}
                onValueChange={(value) => handleRadioChange("conflictResolution", value)}
                className="space-y-3"
              >
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="direct" id="conflict-direct" />
                  <div>
                    <Label htmlFor="conflict-direct" className="cursor-pointer">
                      Direct & Clear
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">Transparent, no sugarcoating</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="empathic" id="conflict-empathic" />
                  <div>
                    <Label htmlFor="conflict-empathic" className="cursor-pointer">
                      Empathic & Reflective
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">Hear everyone, then respond</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="neutral" id="conflict-neutral" />
                  <div>
                    <Label htmlFor="conflict-neutral" className="cursor-pointer">
                      Neutral & Systemic
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">Rely on process, not personalities</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="adaptive" id="conflict-adaptive" />
                  <div>
                    <Label htmlFor="conflict-adaptive" className="cursor-pointer">
                      Adaptive
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">Depends on the context</p>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Languages Spoken Fluently</CardTitle>
              <CardDescription>
                Select all the languages you can confidently use in professional settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {languages.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={`lang-${language}`}
                        checked={formData.languages.includes(language)}
                        onCheckedChange={(checked) => handleLanguageChange(language, checked === true)}
                      />
                      <Label htmlFor={`lang-${language}`} className="cursor-pointer">
                        {language}
                      </Label>
                    </div>
                  ))}
                </div>

                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Label htmlFor="other-language">Other Language</Label>
                    <Input
                      id="other-language"
                      value={otherLanguage}
                      onChange={(e) => setOtherLanguage(e.target.value)}
                      placeholder="Enter another language"
                    />
                  </div>
                  <Button className="bg-[#FF6B35]" type="button" onClick={addOtherLanguage} disabled={!otherLanguage}>
                    <Plus className="h-4 w-4 mr-2 bg-[#FF6B35]" /> Add
                  </Button>
                </div>

                <div>
                  <Label>Selected Languages</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.languages.map((language) => (
                      <Badge key={language} variant="secondary">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team vs Solo Preference</CardTitle>
              <CardDescription>Do you prefer to work independently or as part of a team?</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.teamVsSolo}
                onValueChange={(value) => handleRadioChange("teamVsSolo", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="solo" id="team-solo" />
                  <Label htmlFor="team-solo" className="cursor-pointer">
                    I work best independently
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="team" id="team-team" />
                  <Label htmlFor="team-team" className="cursor-pointer">
                    I thrive in teams and group workflows
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="team-both" />
                  <Label htmlFor="team-both" className="cursor-pointer">
                    I'm comfortable in both, based on the mission
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
