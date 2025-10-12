type Registration = {
  id: string
  userId: string | null
  isAccepted: boolean
  trashedAt: string | null
  trashedBy: string | null
  whoYouAre: {
    id: string
    fullName: string
    email: string
    timeZone: string
    country: string
    professionalLinks: Record<string, string | undefined>
    phone?: string | null
  }
  coreRole: {
    id: string
    primaryDomain: string
  }
  eliteSkillCards: {
    id: string
    selectedSkills: string[]
  }
  toolstackProficiency: {
    id: string
    selectedTools: { category: string; tools: string[] }[]
  }
  domainExperience: {
    id: string
    roles: { title: string; years: number }[]
  }
  industryExperience: {
    id: string
    selectedIndustries: string[]
  }
  availabilityWorkflow: {
    id: string
    weeklyCommitment: number
    workingHours: string[]
    collaborationTools: string[]
    teamStyle: string
    screenSharing: string
    availabilityExceptions: string
  }
  softSkills: {
    id: string
    collaborationStyle: string
    communicationFrequency: string
    conflictResolution: string
    languages: string[]
    teamVsSolo: string
  }
  certifications: {
    id: string
    certificates: { name: string; url: string }[]
  }
  projectQuoting: {
    id: string
    compensationPreference: string
    smallProjectPrice: number
    midProjectPrice: number
    longTermPrice: number
    milestoneTerms: string
    willSubmitProposals: string
  }
  legalAgreements: {
    id: string
    agreements: { id: string; accepted: boolean }[]
    identityVerification: {
      id: string
      idType: string
      taxDocType: string
      addressVerified: boolean
    }
    workAuthorization: {
      id: string
      interested: boolean
    }
  }
}

let REGISTRATIONS: Registration[] = []

const uid = (prefix: string) => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

export function addRegistration(body: any): Registration {
  const reg: Registration = {
    id: uid("reg"),
    userId: null,
    isAccepted: false,
    trashedAt: null,
    trashedBy: null,
    whoYouAre: {
      id: uid("who"),
      fullName: body.whoYouAre.fullName,
      email: body.whoYouAre.email,
      timeZone: body.whoYouAre.timeZone,
      country: body.whoYouAre.country,
      professionalLinks: body.whoYouAre.professionalLinks || {},
      phone: null,
    },
    coreRole: {
      id: uid("core"),
      primaryDomain: body.coreRole.primaryDomain,
    },
    eliteSkillCards: {
      id: uid("skills"),
      selectedSkills: body.eliteSkillCards.selectedSkills ?? [],
    },
    toolstackProficiency: {
      id: uid("tools"),
      selectedTools: body.toolstackProficiency.selectedTools ?? [],
    },
    domainExperience: {
      id: uid("domain"),
      roles: body.domainExperience.roles ?? [],
    },
    industryExperience: {
      id: uid("industry"),
      selectedIndustries: body.industryExperience.selectedIndustries ?? [],
    },
    availabilityWorkflow: {
      id: uid("availability"),
      weeklyCommitment: body.availabilityWorkflow.weeklyCommitment,
      workingHours: body.availabilityWorkflow.workingHours ?? [],
      collaborationTools: body.availabilityWorkflow.collaborationTools ?? [],
      teamStyle: body.availabilityWorkflow.teamStyle,
      screenSharing: body.availabilityWorkflow.screenSharing,
      availabilityExceptions: body.availabilityWorkflow.availabilityExceptions ?? "",
    },
    softSkills: {
      id: uid("soft"),
      collaborationStyle: body.softSkills.collaborationStyle,
      communicationFrequency: body.softSkills.communicationFrequency,
      conflictResolution: body.softSkills.conflictResolution,
      languages: body.softSkills.languages ?? [],
      teamVsSolo: body.softSkills.teamVsSolo,
    },
    certifications: {
      id: uid("cert"),
      certificates: body.certifications.certificates ?? [],
    },
    projectQuoting: {
      id: uid("quoting"),
      compensationPreference: body.projectQuoting.compensationPreference,
      smallProjectPrice: body.projectQuoting.smallProjectPrice,
      midProjectPrice: body.projectQuoting.midProjectPrice,
      longTermPrice: body.projectQuoting.longTermPrice,
      milestoneTerms: body.projectQuoting.milestoneTerms,
      willSubmitProposals: body.projectQuoting.willSubmitProposals,
    },
    legalAgreements: {
      id: uid("legal"),
      agreements: body.legalAgreements.agreements ?? [],
      identityVerification: {
        id: uid("identity"),
        idType: body.legalAgreements.identityVerification.idType,
        taxDocType: body.legalAgreements.identityVerification.taxDocType,
        addressVerified: body.legalAgreements.identityVerification.addressVerified,
      },
      workAuthorization: {
        id: uid("work_auth"),
        interested: body.legalAgreements.workAuthorization.interested,
      },
    },
  }

  REGISTRATIONS.unshift(reg)
  return reg
}

export function listRegistrations(): Registration[] {
  return REGISTRATIONS
}

export function getRegistration(id: string): Registration | undefined {
  return REGISTRATIONS.find((r) => r.id === id)
}

export function acceptRegistration(id: string): { userId: string; username: string; email: string } | null {
  const reg = getRegistration(id)
  if (!reg) return null
  reg.isAccepted = true
  reg.userId = uid("user")
  const base = reg.whoYouAre.fullName.trim().toLowerCase().replace(/\s+/g, "")
  const username = `${base}_${Math.random().toString(36).slice(2, 6)}`
  return { userId: reg.userId, username, email: reg.whoYouAre.email }
}

export function trashRegistration(id: string): boolean {
  const reg = getRegistration(id)
  if (!reg) return false
  reg.trashedAt = new Date().toISOString()
  reg.trashedBy = "admin_mock"
  return true
}

export function untrashRegistration(id: string): boolean {
  const reg = getRegistration(id)
  if (!reg) return false
  reg.trashedAt = null
  reg.trashedBy = null
  return true
}

export function removeRegistration(id: string): boolean {
  const before = REGISTRATIONS.length
  REGISTRATIONS = REGISTRATIONS.filter((r) => r.id !== id)
  return REGISTRATIONS.length < before
}
