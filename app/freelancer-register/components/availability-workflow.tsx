"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface AvailabilityWorkflowData {
  weeklyCommitment: number
  workingHours: string[]
  collaborationTools: string[]
  teamStyle: string
  screenSharing: string
  availabilityExceptions: string
}

interface AvailabilityWorkflowProps {
  data: AvailabilityWorkflowData
  onUpdate: (data: AvailabilityWorkflowData) => void
}

export default function AvailabilityWorkflow({ data, onUpdate }: AvailabilityWorkflowProps) {
  const [formData, setFormData] = useState<AvailabilityWorkflowData>(data)

  // Update parent component when form data changes
  useEffect(() => {
    const updateTimeout = setTimeout(() => {
      onUpdate(formData)
    }, 100)

    return () => clearTimeout(updateTimeout)
  }, [formData, onUpdate])

  // Handle slider change for weekly commitment
  const handleSliderChange = (value: number[]) => {
    setFormData({
      ...formData,
      weeklyCommitment: value[0],
    })
  }

  // Handle working hours selection
  const handleWorkingHoursChange = (hour: string) => {
    setFormData((prev) => {
      const isSelected = prev.workingHours.includes(hour)

      if (isSelected) {
        return {
          ...prev,
          workingHours: prev.workingHours.filter((h) => h !== hour),
        }
      } else {
        return {
          ...prev,
          workingHours: [...prev.workingHours, hour],
        }
      }
    })
  }

  // Handle collaboration tools selection
  const handleToolsChange = (tool: string) => {
    setFormData((prev) => {
      const isSelected = prev.collaborationTools.includes(tool)

      if (isSelected) {
        return {
          ...prev,
          collaborationTools: prev.collaborationTools.filter((t) => t !== tool),
        }
      } else {
        return {
          ...prev,
          collaborationTools: [...prev.collaborationTools, tool],
        }
      }
    })
  }

  // Handle radio button changes
  const handleRadioChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle text input changes
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Get commitment label based on hours
  const getCommitmentLabel = (hours: number) => {
    if (hours < 15) return "Support Track"
    if (hours < 30) return "Active Project"
    return "Full Deployment"
  }

  // Collaboration tools options
  const collaborationTools = [
    "Slack",
    "Notion",
    "GitHub",
    "Jira",
    "Zoom",
    "Google Meet",
    "Discord",
    "Trello",
    "Asana",
    "Figma",
    "Miro",
  ]

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Availability & Workflow Alignment</h1>
          <p className="text-gray-600">We deploy around your flow. Let's sync timelines, tools, and transparency.</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Commitment Capacity</CardTitle>
              <CardDescription>How many hours per week can you commit to client work?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Slider
                  defaultValue={[formData.weeklyCommitment]}
                  max={50}
                  min={5}
                  step={1}
                  onValueChange={handleSliderChange}
                  className="w-full text-[#003087]"
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">5 hours</span>
                  <div className="text-center">
                    <Badge variant="outline" className="px-3 py-1 font-medium">
                      {formData.weeklyCommitment} hours
                    </Badge>
                    <p className="text-sm text-gray-500 mt-1">{getCommitmentLabel(formData.weeklyCommitment)}</p>
                  </div>
                  <span className="text-sm text-gray-500">50+ hours</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timezone & Working Window</CardTitle>
              <CardDescription>What are your preferred working hours?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {["8am–12pm", "12pm–4pm", "4pm–8pm", "8pm–12am", "12am–6am"].map((hour) => (
                    <div key={hour} className="flex items-center space-x-2">
                      <Checkbox
                        id={`hour-${hour}`}
                        checked={formData.workingHours.includes(hour)}
                        onCheckedChange={() => handleWorkingHoursChange(hour)}
                      />
                      <Label htmlFor={`hour-${hour}`} className="cursor-pointer">
                        {hour}
                      </Label>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 italic">Used to align with U.S. EST / PST / CST</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Workflow Tools & Communication Style</CardTitle>
              <CardDescription>Select your preferred tools and communication style</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Collaboration Tools</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {collaborationTools.map((tool) => (
                      <div key={tool} className="flex items-center space-x-2">
                        <Checkbox
                          id={`tool-${tool}`}
                          checked={formData.collaborationTools.includes(tool)}
                          onCheckedChange={() => handleToolsChange(tool)}
                        />
                        <Label htmlFor={`tool-${tool}`} className="cursor-pointer">
                          {tool}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Preferred Team Style</Label>
                  <RadioGroup
                    value={formData.teamStyle}
                    onValueChange={(value) => handleRadioChange("teamStyle", value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="async-only" id="team-async" />
                      <Label htmlFor="team-async" className="cursor-pointer">
                        Async-Only
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="scheduled-standups" id="team-standups" />
                      <Label htmlFor="team-standups" className="cursor-pointer">
                        Scheduled Standups
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="real-time" id="team-realtime" />
                      <Label htmlFor="team-realtime" className="cursor-pointer">
                        Real-Time & Responsive
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Open to Work with Live Screen Sharing?</CardTitle>
              <CardDescription>Some projects require transparency, mentorship, or security clearance</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.screenSharing}
                onValueChange={(value) => handleRadioChange("screenSharing", value)}
                className="space-y-3"
              >
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="yes" id="screen-yes" />
                  <div>
                    <Label htmlFor="screen-yes" className="cursor-pointer">
                      Yes — I am comfortable working while screen sharing on Zoom/Meet
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">Full transparency for high-trust projects</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="limited" id="screen-limited" />
                  <div>
                    <Label htmlFor="screen-limited" className="cursor-pointer">
                      Yes — but only during specific hours
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">Limited availability for screen sharing sessions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="no" id="screen-no" />
                  <div>
                    <Label htmlFor="screen-no" className="cursor-pointer">
                      No — I prefer offline or async collaboration
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">Not available for live screen sharing</p>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Short-Term Availability Exceptions</CardTitle>
              <CardDescription>
                Optional: Let us know if you have any upcoming time off or limited availability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                name="availabilityExceptions"
                value={formData.availabilityExceptions}
                onChange={handleTextChange}
                placeholder="E.g., 'Unavailable June 15-20 for vacation' or 'Limited availability on Fridays'"
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
