"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Upload, Link } from "lucide-react"

interface Certificate {
  name: string
  url: string
}

interface CertificationsData {
  certificates: Certificate[]
}

interface CertificationsProps {
  data: CertificationsData
  primaryDomain: string
  onUpdate: (data: CertificationsData) => void
}

export default function Certifications({ data, primaryDomain, onUpdate }: CertificationsProps) {
  const [formData, setFormData] = useState<CertificationsData>(data)
  const [newCertificate, setNewCertificate] = useState<Certificate>({ name: "", url: "" })

  // Update parent component when form data changes
  useEffect(() => {
    const updateTimeout = setTimeout(() => {
      onUpdate(formData)
    }, 100)

    return () => clearTimeout(updateTimeout)
  }, [formData, onUpdate])

  // Add a new certificate
  const addCertificate = () => {
    if (newCertificate.name && newCertificate.url) {
      setFormData({
        ...formData,
        certificates: [...formData.certificates, { ...newCertificate }],
      })
      setNewCertificate({ name: "", url: "" })
    }
  }

  // Remove a certificate
  const removeCertificate = (index: number) => {
    setFormData({
      ...formData,
      certificates: formData.certificates.filter((_, i) => i !== index),
    })
  }

  // Handle input changes for new certificate
  const handleNewCertificateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCertificate({
      ...newCertificate,
      [name]: value,
    })
  }

  // Get suggested certifications based on primary domain
  const getSuggestedCertifications = () => {
    if (primaryDomain.includes("Software") || primaryDomain.includes("Web Development")) {
      return [
        "AWS Certified Developer / Architect",
        "Microsoft Azure Dev Associate",
        "Google Professional Cloud Dev",
        "Certified Kubernetes Application Developer (CKAD)",
        "Linux Foundation Certifications",
        "GitHub Octoverse Achievement",
        "FreeCodeCamp Full Stack / Frontend",
        "Meta Front-End Certificate",
      ]
    } else if (primaryDomain.includes("UI/UX")) {
      return [
        "UI/UX Design by Google",
        "Figma Professional Badge",
        "Web Accessibility Specialist (WAS)",
        "Adobe Certified Professional",
        "Interaction Design Foundation Certification",
        "Nielsen Norman Group UX Certification",
      ]
    } else if (primaryDomain.includes("Digital Marketing")) {
      return [
        "Google Ads Certification",
        "Google Analytics 4 Certification",
        "HubSpot Inbound Marketing",
        "Meta Blueprint Certification",
        "Semrush SEO Toolkit Certification",
        "Email Marketing by Mailchimp Academy",
      ]
    } else if (primaryDomain.includes("DevOps")) {
      return [
        "AWS Certified DevOps Engineer",
        "Certified Kubernetes Administrator (CKA)",
        "Docker Certified Associate",
        "Terraform Associate",
        "Azure DevOps Engineer Expert",
        "GitLab Certified Professional",
      ]
    } else if (primaryDomain.includes("Data Science")) {
      return [
        "TensorFlow Developer Certificate",
        "AWS Certified Machine Learning",
        "Microsoft Certified: Azure Data Scientist Associate",
        "IBM Data Science Professional Certificate",
        "Google Professional Data Engineer",
        "Databricks Certified Associate Developer",
      ]
    } else if (primaryDomain.includes("Blockchain")) {
      return [
        "Certified Blockchain Developer",
        "Ethereum Developer Certification",
        "Certified Blockchain Solution Architect",
        "Hyperledger Fabric Developer",
        "Solidity Developer Certification",
        "Certified NFT Professional",
      ]
    } else if (primaryDomain.includes("Mobile")) {
      return [
        "Apple Certified iOS Developer",
        "Google Associate Android Developer",
        "React Native Certification",
        "Flutter Certified Developer",
        "Mobile Web Specialist",
        "AWS Mobile Developer Associate",
      ]
    } else if (primaryDomain.includes("Cybersecurity")) {
      return [
        "Certified Information Systems Security Professional (CISSP)",
        "Certified Ethical Hacker (CEH)",
        "CompTIA Security+",
        "Offensive Security Certified Professional (OSCP)",
        "Certified Information Security Manager (CISM)",
        "GIAC Security Essentials (GSEC)",
      ]
    } else {
      return [
        "Project Management Professional (PMP)",
        "Certified ScrumMaster (CSM)",
        "ITIL Foundation",
        "Certified Business Analysis Professional (CBAP)",
        "Six Sigma Green Belt",
        "Certified Associate in Project Management (CAPM)",
      ]
    }
  }

  const suggestedCertifications = getSuggestedCertifications()

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Certifications & Credentials</h1>
          <p className="text-gray-600">
            Verifiable credentials elevate trust, accelerate approvals, and unlock premium missions.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload or Link Your Certifications</CardTitle>
            <CardDescription>You may upload up to 10 documents or links. Digital badges welcome.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Current certificates */}
              {formData.certificates.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-medium">Your Certificates</h3>
                  <div className="space-y-3">
                    {formData.certificates.map((cert, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="px-2 py-1">
                            <Link className="h-3 w-3 mr-1" />
                            Link
                          </Badge>
                          <div>
                            <span className="font-medium">{cert.name}</span>
                            <a
                              href={cert.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-sm text-blue-600 hover:underline"
                            >
                              {cert.url}
                            </a>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCertificate(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add new certificate */}
              <div className="space-y-4">
                <h3 className="font-medium">Add a Certificate</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Certificate Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newCertificate.name}
                      onChange={handleNewCertificateChange}
                      placeholder="e.g., AWS Certified Developer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="url">Certificate URL</Label>
                    <Input
                      id="url"
                      name="url"
                      value={newCertificate.url}
                      onChange={handleNewCertificateChange}
                      placeholder="https://www.credential.net/..."
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="bg-[#FF6B35] text-white" onClick={addCertificate} disabled={!newCertificate.name || !newCertificate.url}>
                    <Plus className="h-4 w-4 mr-2" /> Add Certificate
                  </Button>
                  
                </div>
              </div>

              {/* Suggested certifications */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium mb-2">Popular Certifications to Consider</h3>
                <div className="flex flex-wrap gap-2">
                  {suggestedCertifications.map((cert, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setNewCertificate({ ...newCertificate, name: cert })}
                      className="text-xs"
                    >
                      {cert}
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
