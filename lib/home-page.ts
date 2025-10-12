import { connectToDatabase } from "./mongodb"
import {
  HomePage,
  type HomePageDocument,
  type SlideDocument,
  type ServiceDocument,
  type ITCardDocument,
  type IndustryCardDocument,
  type TechnologyCardDocument,
  type QualityServiceDocument,
  type QualityIndustryDocument,
  type TechnologyIndustryDocument,
  type QualityServiceImagesDocument,
  type QualityIndustryImagesDocument,
  type TechnologyIndustryImagesDocument,
  type QualityDigitalServiceDocument,
  type QualityDigitalImagesDocument,
  type QualityDigitalSectionDocument,
  type PLSAdvantageDocument,
  type PLSAdvantageFeatureDocument,
} from "@/models/HomePage"
import { getDigitalServices } from "./digital-services"
import { serializeDocument } from "./serialize"

// Update the initialHeroSlides to include buttonLink
const initialHeroSlides = [
  {
    image: "/assets/2.png",
    head: "Software Development",
    heading: "Custom Software Solutions",
    text: "Bespoke software development tailored for scalability, security, and business efficiency.",
    buttonLink: "/services",
    order: 0,
  },
  {
    image: "/assets/3.png",
    head: "Data and Analytics",
    heading: "Turning Data into Actionable Insights",
    text: "Big data analytics, visualization, and AI-driven business intelligence solutions.",
    buttonLink: "/services/data-analytics",
    order: 1,
  },
]

// Initial services data
const initialServices = [
  {
    title: "Services",
    description: "🔹 Custom Software Solutions\n🔹 Cloud & DevOps Services\n🔹 AI & Emerging Technologies",
    image: "/assets/7.png",
    icon: "/assets/icon5.png",
    order: 0,
  },
  {
    title: "Industries",
    description:
      "🔹 Healthcare & Finance Solutions\n🔹 Retail & E-Commerce Tech\n🔹 Manufacturing & Logistics Optimization",
    image: "/assets/5.png",
    icon: "/assets/icon3.png",
    order: 1,
  },
  {
    title: "Technology",
    description: "🔹 Cutting-Edge AI & ML\n🔹 Blockchain & Web3 Innovations\n🔹 Advanced Data Analytics",
    image: "/assets/11.png",
    icon: "/assets/icon7.png",
    order: 2,
  },
]

// Initial IT cards data
const initialITCards = [
  {
    title: "Software Development",
    description: "🔹 Custom Software Solutions\n🔹 Scalable Architectures\n🔹 Agile Development Practices",
    image: "/assets/6.png",
    icon: "Code",
    order: 0,
  },
  {
    title: "Data and Analytics",
    description: "🔹 Big Data Processing\n🔹 Business Intelligence\n🔹 Predictive Analytics",
    image: "/assets/11.png",
    icon: "Database",
    order: 1,
  },
  {
    title: "Quality Control and Testing",
    description: "🔹 Automated Testing\n🔹 Performance Optimization\n🔹 Quality Assurance Strategies",
    image: "/assets/15.png",
    icon: "CheckSquare",
    order: 2,
  },
]

// Initial industry cards data
const initialIndustryCards = [
  {
    title: "Healthcare",
    description: "🔹 Patient Management Systems\n🔹 Medical Data Security\n🔹 Telehealth Solutions",
    image: "/assets/9.png",
    icon: "Heart",
    order: 0,
  },
  {
    title: "Finance",
    description: "🔹 Banking Software\n🔹 Payment Processing\n🔹 Fraud Detection Systems",
    image: "/assets/17.png",
    icon: "DollarSign",
    order: 1,
  },
  {
    title: "Retail & E-Commerce",
    description: "🔹 Online Store Platforms\n🔹 Inventory Management\n🔹 Customer Analytics",
    image: "/assets/22.png",
    icon: "ShoppingCart",
    order: 2,
  },
]

// Initial technology cards data
const initialTechnologyCards = [
  {
    title: "Artificial Intelligence",
    description: "🔹 Machine Learning\n🔹 Natural Language Processing\n🔹 Computer Vision",
    image: "/assets/5.png",
    icon: "Brain",
    order: 0,
  },
  {
    title: "Cloud Computing",
    description: "🔹 AWS Solutions\n🔹 Azure Integration\n🔹 Google Cloud Platform",
    image: "/assets/7.png",
    icon: "Cloud",
    order: 1,
  },
  {
    title: "Blockchain",
    description: "🔹 Smart Contracts\n🔹 Decentralized Apps\n🔹 Cryptocurrency Solutions",
    image: "/assets/11.png",
    icon: "Link",
    order: 2,
  },
]

// Initial quality services data
const initialQualityServices = [
  {
    number: "01",
    title: "Tailored IT Solutions",
    description:
      "Unlock scalable, secure, and AI-powered technology solutions designed to streamline operations, enhance security, and drive efficiency. From custom software development to cloud computing, we deliver solutions that future-proof your business.",
    order: 0,
  },
  {
    number: "02",
    title: "Expert Digital Strategy",
    description:
      "Dominate the digital space with data-driven marketing strategies, advanced SEO, PPC, and omnichannel branding. Our experts craft high-performance campaigns designed to maximize engagement, optimize conversions, and increase ROI.",
    order: 1,
  },
  {
    number: "03",
    title: "End-to-End Business Support",
    description:
      "From enterprise IT consulting to 24/7 technical assistance, our support services ensure seamless business continuity. We proactively manage IT infrastructure, cybersecurity, and system integrations to keep your operations running at peak performance.",
    order: 2,
  },
]

// Initial quality industry data
const initialQualityIndustry = [
  {
    number: "01",
    title: "Healthcare Solutions",
    description:
      "Revolutionize patient care with our cutting-edge healthcare technology solutions. From electronic health records to telemedicine platforms, we help healthcare providers deliver better patient outcomes while optimizing operational efficiency.",
    order: 0,
  },
  {
    number: "02",
    title: "Financial Technology",
    description:
      "Transform your financial services with secure, compliant, and innovative fintech solutions. Our banking software, payment processing systems, and fraud detection tools help financial institutions stay ahead in a rapidly evolving digital landscape.",
    order: 1,
  },
  {
    number: "03",
    title: "Retail & E-Commerce",
    description:
      "Elevate your retail business with seamless omnichannel experiences. Our e-commerce platforms, inventory management systems, and customer analytics tools help retailers increase sales, optimize operations, and build lasting customer relationships.",
    order: 2,
  },
]

// Initial technology industry data
const initialTechnologyIndustry = [
  {
    number: "01",
    title: "AI & Machine Learning",
    description:
      "Harness the power of artificial intelligence to transform your business processes. Our AI solutions include predictive analytics, natural language processing, and computer vision applications that drive innovation and create competitive advantages.",
    order: 0,
  },
  {
    number: "02",
    title: "Cloud Architecture",
    description:
      "Modernize your infrastructure with scalable, secure cloud solutions. We design and implement cloud architectures that optimize performance, reduce costs, and enable rapid deployment of new features and services across your organization.",
    order: 1,
  },
  {
    number: "03",
    title: "Blockchain Technology",
    description:
      "Implement cutting-edge blockchain solutions for enhanced security and transparency. From smart contracts to decentralized applications, our blockchain expertise helps businesses create trustless systems that revolutionize data integrity.",
    order: 2,
  },
]

// Initial quality service images
const initialQualityServiceImages = {
  topImage: "/assets/17.png",
  bottomImage: "/assets/22.png",
}

// Initial quality industry images
const initialQualityIndustryImages = {
  topImage: "/assets/9.png",
  bottomImage: "/assets/15.png",
}

// Initial technology industry images
const initialTechnologyIndustryImages = {
  topImage: "/assets/6.png",
  bottomImage: "/assets/11.png",
}

// Initial quality digital services data
const initialQualityDigitalServices = [
  {
    number: "01",
    title: "Smart Digital Marketing Solutions",
    description:
      "Unlock data-driven marketing strategies designed to boost visibility, attract premium clients, and scale your freelance business. From SEO optimization to social media marketing, we help you establish a powerful online presence.",
    order: 0,
  },
  {
    number: "02",
    title: "High-Impact Growth Strategies",
    description:
      "Maximize your reach with expert-driven digital campaigns. Leverage SEO, PPC, content marketing, and omnichannel branding to increase engagement, optimize conversions, and grow your freelance career like never before.",
    order: 1,
  },
  {
    number: "03",
    title: "End-to-End Digital Support",
    description:
      "From personal branding to lead generation, we provide end-to-end solutions for freelancers. Get expert guidance on social media management, paid ads, and automation to streamline operations and drive long-term success.",
    order: 2,
  },
]

// Initial quality digital images
const initialQualityDigitalImages = {
  topImage: "/assets/9.png",
  bottomImage: "/assets/11.png",
}

// Initial quality digital section
const initialQualityDigitalSection = {
  heading: "Elevate Your Digital Brand with Cutting-Edge Marketing",
  subheading: "DIGITAL MARKETING SOLUTIONS FOR EXPERIENCED PROFESSIONALS 2025",
  services: initialQualityDigitalServices,
  images: initialQualityDigitalImages,
}

// Export the getInitialQualityDigitalSection function
export function getInitialQualityDigitalSection() {
  return initialQualityDigitalSection
}

// Initial PLS Advantage data
const initialPLSAdvantage = {
  title: "PLS Competitive Advantage",
  subtitle: "Unmatched Competitive Edge: Future-Ready Solutions for American Businesses",
  description:
    "Harness the power of AI, automation, and digital transformation to drive scalability, security, and data-driven growth. With decades of expertise, we equip businesses with the tools to outperform, adapt, and lead in an evolving market.",
  yearsExperience: 25,
  yearsTitle: "Years of Industry Leadership",
  features: [
    { text: "AI & Automation" },
    { text: "Enterprise Security" },
    { text: "Cloud Mastery" },
    { text: "Data-Driven Growth" },
    { text: "Omnichannel Optimization" },
    { text: "Regulatory Compliance" },
  ],
  buttonText: "LEARN MORE",
  buttonLink: "/services",
  images: {
    mainImage: "/assets/13.png",
    secondaryImage: "/assets/12.png",
    tertiaryImage: "/assets/15.png",
  },
}

// Get home page data
export async function getHomePage(): Promise<HomePageDocument | null> {
  try {
    await connectToDatabase()

    // Find the home page document
    const homePageDoc = await HomePage.findOne().lean()

    if (!homePageDoc) {
      console.log("No home page document found, creating default")
      // return createDefaultHomePage();  // Assuming createDefaultHomePage is not defined, removing this line
    }

    // Get digital services (already properly serialized)
    const digitalServices = await getDigitalServices()

    // Serialize the home page document to handle ObjectIds
    const serializedDoc = homePageDoc ? serializeDocument(homePageDoc) : null

    return {
      heroSlides: serializedDoc?.heroSlides || [],
      services: serializedDoc?.services || [],
      itCards: serializedDoc?.itCards || [],
      industryCards: serializedDoc?.industryCards || [],
      technologyCards: serializedDoc?.technologyCards || [],
      qualityServices: serializedDoc?.qualityServices || [],
      qualityIndustry: serializedDoc?.qualityIndustry || [],
      technologyIndustry: serializedDoc?.technologyIndustry || [],
      qualityServiceImages: serializedDoc?.qualityServiceImages || {
        topImage: "/assets/17.png",
        bottomImage: "/assets/22.png",
      },
      qualityIndustryImages: serializedDoc?.qualityIndustryImages || {
        topImage: "/assets/9.png",
        bottomImage: "/assets/15.png",
      },
      technologyIndustryImages: serializedDoc?.technologyIndustryImages || {
        topImage: "/assets/6.png",
        bottomImage: "/assets/11.png",
      },
      digitalServices: digitalServices || [],
      qualityDigitalSection: serializedDoc?.qualityDigitalSection || initialQualityDigitalSection,
      plsAdvantage: serializedDoc?.plsAdvantage || initialPLSAdvantage,
    }
  } catch (error) {
    console.error("Error getting home page:", error)
    return null
  }
}

// Update entire home page
export async function updateHomePage(data: Partial<HomePageDocument>): Promise<HomePageDocument | null> {
  console.log("updateHomePage function called")

  try {
    await connectToDatabase()

    // Get current home page
    let homePage = await HomePage.findOne()

    if (!homePage) {
      // If home page doesn't exist, create it with the provided data
      const initialData = {
        heroSlides: data.heroSlides || initialHeroSlides,
        services: data.services || initialServices,
        itCards: data.itCards || initialITCards,
        industryCards: data.industryCards || initialIndustryCards,
        technologyCards: data.technologyCards || initialTechnologyCards,
        qualityServices: data.qualityServices || initialQualityServices,
        qualityIndustry: data.qualityIndustry || initialQualityIndustry,
        technologyIndustry: data.technologyIndustry || initialTechnologyIndustry,
        qualityServiceImages: data.qualityServiceImages || initialQualityServiceImages,
        qualityIndustryImages: initialQualityIndustryImages,
        technologyIndustryImages: initialTechnologyIndustryImages,
        qualityDigitalSection: data.qualityDigitalSection || initialQualityDigitalSection,
        plsAdvantage: data.plsAdvantage || initialPLSAdvantage,
      }

      homePage = await HomePage.create(initialData)
    } else {
      // Update existing home page with the provided data
      Object.assign(homePage, data)
      await homePage.save()
    }

    return homePage
  } catch (error) {
    console.error("Error updating home page:", error)
    throw error
  }
}

// Update hero slides
export async function updateHeroSlides(slides: Partial<SlideDocument>[]): Promise<boolean> {
  console.log("updateHeroSlides function called")

  try {
    await connectToDatabase()

    // Get current home page
    const homePage = await HomePage.findOne()

    if (!homePage) {
      // If home page doesn't exist, create it with the provided slides
      await HomePage.create({
        heroSlides: slides,
        services: initialServices,
        itCards: initialITCards,
        industryCards: initialIndustryCards,
        technologyCards: initialTechnologyCards,
        qualityServices: initialQualityServices,
        qualityIndustry: initialQualityIndustry,
        technologyIndustry: initialTechnologyIndustry,
        qualityServiceImages: initialQualityServiceImages,
        qualityIndustryImages: initialQualityIndustryImages,
        technologyIndustryImages: initialTechnologyIndustryImages,
        qualityDigitalSection: initialQualityDigitalSection,
        plsAdvantage: initialPLSAdvantage,
      })
    } else {
      // Update existing home page with the provided slides
      homePage.heroSlides = slides as SlideDocument[]
      await homePage.save()
    }

    return true
  } catch (error) {
    console.error("Error updating hero slides:", error)
    return false
  }
}

// Update services
export async function updateServices(services: Partial<ServiceDocument>[]): Promise<boolean> {
  console.log("updateServices function called")

  try {
    await connectToDatabase()

    // Get current home page
    const homePage = await HomePage.findOne()

    if (!homePage) {
      // If home page doesn't exist, create it with the provided services
      await HomePage.create({
        heroSlides: initialHeroSlides,
        services: services,
        itCards: initialITCards,
        industryCards: initialIndustryCards,
        technologyCards: initialTechnologyCards,
        qualityServices: initialQualityServices,
        qualityIndustry: initialQualityIndustry,
        technologyIndustry: initialTechnologyIndustry,
        qualityServiceImages: initialQualityServiceImages,
        qualityIndustryImages: initialQualityIndustryImages,
        technologyIndustryImages: initialTechnologyIndustryImages,
        qualityDigitalSection: initialQualityDigitalSection,
        plsAdvantage: initialPLSAdvantage,
      })
    } else {
      // Update existing home page with the provided services
      homePage.services = services as ServiceDocument[]
      await homePage.save()
    }

    return true
  } catch (error) {
    console.error("Error updating services:", error)
    return false
  }
}

// Update IT cards
export async function updateITCards(itCards: Partial<ITCardDocument>[]): Promise<boolean> {
  console.log("updateITCards function called")

  try {
    await connectToDatabase()

    // Get current home page
    const homePage = await HomePage.findOne()

    if (!homePage) {
      // If home page doesn't exist, create it with the provided IT cards
      await HomePage.create({
        heroSlides: initialHeroSlides,
        services: initialServices,
        itCards: itCards,
        industryCards: initialIndustryCards,
        technologyCards: initialTechnologyCards,
        qualityServices: initialQualityServices,
        qualityIndustry: initialQualityIndustry,
        technologyIndustry: initialTechnologyIndustry,
        qualityServiceImages: initialQualityServiceImages,
        qualityIndustryImages: initialQualityIndustryImages,
        technologyIndustryImages: initialTechnologyIndustryImages,
        qualityDigitalSection: initialQualityDigitalSection,
        plsAdvantage: initialPLSAdvantage,
      })
    } else {
      // Update existing home page with the provided IT cards
      homePage.itCards = itCards as ITCardDocument[]
      await homePage.save()
    }

    return true
  } catch (error) {
    console.error("Error updating IT cards:", error)
    return false
  }
}

// Update industry cards
export async function updateIndustryCards(industryCards: Partial<IndustryCardDocument>[]): Promise<boolean> {
  console.log("updateIndustryCards function called")

  try {
    await connectToDatabase()

    // Get current home page
    const homePage = await HomePage.findOne()

    if (!homePage) {
      // If home page doesn't exist, create it with the provided industry cards
      await HomePage.create({
        heroSlides: initialHeroSlides,
        services: initialServices,
        itCards: initialITCards,
        industryCards: industryCards,
        technologyCards: initialTechnologyCards,
        qualityServices: initialQualityServices,
        qualityIndustry: initialQualityIndustry,
        technologyIndustry: initialTechnologyIndustry,
        qualityServiceImages: initialQualityServiceImages,
        qualityIndustryImages: initialQualityIndustryImages,
        technologyIndustryImages: initialTechnologyIndustryImages,
        qualityDigitalSection: initialQualityDigitalSection,
        plsAdvantage: initialPLSAdvantage,
      })
    } else {
      // Update existing home page with the provided industry cards
      homePage.industryCards = industryCards as IndustryCardDocument[]
      await homePage.save()
    }

    return true
  } catch (error) {
    console.error("Error updating industry cards:", error)
    return false
  }
}

// Update technology cards
export async function updateTechnologyCards(technologyCards: Partial<TechnologyCardDocument>[]): Promise<boolean> {
  console.log("updateTechnologyCards function called")

  try {
    await connectToDatabase()

    // Get current home page
    const homePage = await HomePage.findOne()

    if (!homePage) {
      // If home page doesn't exist, create it with the provided technology cards
      await HomePage.create({
        heroSlides: initialHeroSlides,
        services: initialServices,
        itCards: initialITCards,
        industryCards: initialIndustryCards,
        technologyCards: technologyCards,
        qualityServices: initialQualityServices,
        qualityIndustry: initialQualityIndustry,
        technologyIndustry: initialTechnologyIndustry,
        qualityServiceImages: initialQualityServiceImages,
        qualityIndustryImages: initialQualityIndustryImages,
        technologyIndustryImages: initialTechnologyIndustryImages,
        qualityDigitalSection: initialQualityDigitalSection,
        plsAdvantage: initialPLSAdvantage,
      })
    } else {
      // Update existing home page with the provided technology cards
      homePage.technologyCards = technologyCards as TechnologyCardDocument[]
      await homePage.save()
    }

    return true
  } catch (error) {
    console.error("Error updating technology cards:", error)
    return false
  }
}

// Update quality services
export async function updateQualityServices(qualityServices: Partial<QualityServiceDocument>[]): Promise<boolean> {
  console.log("updateQualityServices function called with data:", qualityServices)

  try {
    await connectToDatabase()

    // Get current home page
    const homePage = await HomePage.findOne()

    if (!homePage) {
      // If home page doesn't exist, create it with the provided quality services
      console.log("Creating new home page with quality services")
      await HomePage.create({
        heroSlides: initialHeroSlides,
        services: initialServices,
        itCards: initialITCards,
        industryCards: initialIndustryCards,
        technologyCards: initialTechnologyCards,
        qualityServices: qualityServices,
        qualityIndustry: initialQualityIndustry,
        technologyIndustry: initialTechnologyIndustry,
        qualityServiceImages: initialQualityServiceImages,
        qualityIndustryImages: initialQualityIndustryImages,
        technologyIndustryImages: initialTechnologyIndustryImages,
        qualityDigitalSection: initialQualityDigitalSection,
        plsAdvantage: initialPLSAdvantage,
      })
    } else {
      // Update existing home page with the provided quality services
      console.log("Updating existing home page with quality services")
      homePage.qualityServices = qualityServices as QualityServiceDocument[]
      await homePage.save()
    }

    return true
  } catch (error) {
    console.error("Error updating quality services:", error)
    return false
  }
}

// Update quality industry
export async function updateQualityIndustry(qualityIndustry: Partial<QualityIndustryDocument>[]): Promise<boolean> {
  console.log("updateQualityIndustry function called")

  try {
    await connectToDatabase()

    // Get current home page
    const homePage = await HomePage.findOne()

    if (!homePage) {
      // If home page doesn't exist, create it with the provided quality industry
      await HomePage.create({
        heroSlides: initialHeroSlides,
        services: initialServices,
        itCards: initialITCards,
        industryCards: initialIndustryCards,
        technologyCards: initialTechnologyCards,
        qualityServices: initialQualityServices,
        qualityIndustry: qualityIndustry,
        technologyIndustry: initialTechnologyIndustry,
        qualityServiceImages: initialQualityServiceImages,
        qualityIndustryImages: initialQualityIndustryImages,
        technologyIndustryImages: initialTechnologyIndustryImages,
        qualityDigitalSection: initialQualityDigitalSection,
        plsAdvantage: initialPLSAdvantage,
      })
    } else {
      // Update existing home page with the provided quality industry
      homePage.qualityIndustry = qualityIndustry as QualityIndustryDocument[]
      await homePage.save()
    }

    return true
  } catch (error) {
    console.error("Error updating quality industry:", error)
    return false
  }
}

// Update technology industry
export async function updateTechnologyIndustry(
  technologyIndustry: Partial<TechnologyIndustryDocument>[],
): Promise<boolean> {
  console.log("updateTechnologyIndustry function called with data:", technologyIndustry)

  try {
    await connectToDatabase()

    // Get current home page
    const homePage = await HomePage.findOne()

    if (!homePage) {
      // If home page doesn't exist, create it with the provided technology industry
      console.log("Creating new home page with technology industry")
      await HomePage.create({
        heroSlides: initialHeroSlides,
        services: initialServices,
        itCards: initialITCards,
        industryCards: initialIndustryCards,
        technologyCards: initialTechnologyCards,
        qualityServices: initialQualityServices,
        qualityIndustry: initialQualityIndustry,
        technologyIndustry: technologyIndustry,
        qualityServiceImages: initialQualityServiceImages,
        qualityIndustryImages: initialQualityIndustryImages,
        technologyIndustryImages: initialTechnologyIndustryImages,
        qualityDigitalSection: initialQualityDigitalSection,
        plsAdvantage: initialPLSAdvantage,
      })
    } else {
      // Update existing home page with the provided technology industry
      console.log("Updating existing home page with technology industry")
      homePage.technologyIndustry = technologyIndustry as TechnologyIndustryDocument[]
      await homePage.save()
    }

    return true
  } catch (error) {
    console.error("Error updating technology industry:", error)
    return false
  }
}

// Update quality service images
export async function updateQualityServiceImages(images: Partial<QualityServiceImagesDocument>): Promise<boolean> {
  console.log("updateQualityServiceImages function called with data:", images)

  try {
    await connectToDatabase()

    // Get current home page
    const homePage = await HomePage.findOne()

    if (!homePage) {
      // If home page doesn't exist, create it with the provided quality service images
      console.log("Creating new home page with quality service images")
      const initialData = {
        heroSlides: initialHeroSlides,
        services: initialServices,
        itCards: initialITCards,
        industryCards: initialIndustryCards,
        technologyCards: initialTechnologyCards,
        qualityServices: initialQualityServices,
        qualityIndustry: initialQualityIndustry,
        technologyIndustry: initialTechnologyIndustry,
        qualityServiceImages: {
          topImage: images.topImage || initialQualityServiceImages.topImage,
          bottomImage: images.bottomImage || initialQualityServiceImages.bottomImage,
        },
        qualityIndustryImages: initialQualityIndustryImages,
        technologyIndustryImages: initialTechnologyIndustryImages,
        qualityDigitalSection: initialQualityDigitalSection,
        plsAdvantage: initialPLSAdvantage,
      }

      await HomePage.create(initialData)
    } else {
      // Get current images
      const currentImages = homePage.qualityServiceImages || initialQualityServiceImages

      // Update only the provided images, keep existing ones for fields not provided
      homePage.qualityServiceImages = {
        topImage: images.topImage || currentImages.topImage,
        bottomImage: images.bottomImage || currentImages.bottomImage,
      } as QualityServiceImagesDocument

      await homePage.save()
    }

    return true
  } catch (error) {
    console.error("Error updating quality service images:", error)
    return false
  }
}

// Update quality industry images
export async function updateQualityIndustryImages(images: Partial<QualityIndustryImagesDocument>): Promise<boolean> {
  console.log("updateQualityIndustryImages function called")

  try {
    await connectToDatabase()

    // Get current home page
    const homePage = await HomePage.findOne()

    if (!homePage) {
      // If home page doesn't exist, create it with the provided quality industry images
      const initialData = {
        heroSlides: initialHeroSlides,
        services: initialServices,
        itCards: initialITCards,
        industryCards: initialIndustryCards,
        technologyCards: initialTechnologyCards,
        qualityServices: initialQualityServices,
        qualityIndustry: initialQualityIndustry,
        technologyIndustry: initialTechnologyIndustry,
        qualityServiceImages: initialQualityServiceImages,
        qualityIndustryImages: {
          topImage: images.topImage || initialQualityIndustryImages.topImage,
          bottomImage: images.bottomImage || initialQualityIndustryImages.bottomImage,
        },
        technologyIndustryImages: initialTechnologyIndustryImages,
        qualityDigitalSection: initialQualityDigitalSection,
        plsAdvantage: initialPLSAdvantage,
      }

      await HomePage.create(initialData)
    } else {
      // Get current images
      const currentImages = homePage.qualityIndustryImages || initialQualityIndustryImages

      // Update only the provided images, keep existing ones for fields not provided
      homePage.qualityIndustryImages = {
        topImage: images.topImage || currentImages.topImage,
        bottomImage: images.bottomImage || currentImages.bottomImage,
      } as QualityIndustryImagesDocument

      await homePage.save()
    }

    return true
  } catch (error) {
    console.error("Error updating quality industry images:", error)
    return false
  }
}

// Update technology industry images
export async function updateTechnologyIndustryImages(
  images: Partial<TechnologyIndustryImagesDocument>,
): Promise<boolean> {
  console.log("updateTechnologyIndustryImages function called with data:", images)

  try {
    await connectToDatabase()

    // Get current home page
    const homePage = await HomePage.findOne()

    if (!homePage) {
      // If home page doesn't exist, create it with the provided technology industry images
      console.log("Creating new home page with technology industry images")
      const initialData = {
        heroSlides: initialHeroSlides,
        services: initialServices,
        itCards: initialITCards,
        industryCards: initialIndustryCards,
        technologyCards: initialTechnologyCards,
        qualityServices: initialQualityServices,
        qualityIndustry: initialQualityIndustry,
        technologyIndustry: initialTechnologyIndustry,
        qualityServiceImages: initialQualityServiceImages,
        qualityIndustryImages: initialQualityIndustryImages,
        technologyIndustryImages: {
          topImage: images.topImage || initialTechnologyIndustryImages.topImage,
          bottomImage: images.bottomImage || initialTechnologyIndustryImages.bottomImage,
        },
        qualityDigitalSection: initialQualityDigitalSection,
        plsAdvantage: initialPLSAdvantage,
      }

      await HomePage.create(initialData)
    } else {
      // Get current images
      const currentImages = homePage.technologyIndustryImages || initialTechnologyIndustryImages

      // Update only the provided images, keep existing ones for fields not provided
      homePage.technologyIndustryImages = {
        topImage: images.topImage || currentImages.topImage,
        bottomImage: images.bottomImage || currentImages.bottomImage,
      } as TechnologyIndustryImagesDocument

      await homePage.save()
    }

    return true
  } catch (error) {
    console.error("Error updating technology industry images:", error)
    return false
  }
}

// Update quality digital section
export async function updateQualityDigitalSection(data: Partial<QualityDigitalSectionDocument>): Promise<boolean> {
  console.log("updateQualityDigitalSection function called")

  try {
    await connectToDatabase()

    // Get current home page
    const homePage = await HomePage.findOne()

    if (!homePage) {
      // If home page doesn't exist, create it with the provided quality digital section
      const initialData = {
        heroSlides: initialHeroSlides,
        services: initialServices,
        itCards: initialITCards,
        industryCards: initialIndustryCards,
        technologyCards: initialTechnologyCards,
        qualityServices: initialQualityServices,
        qualityIndustry: initialQualityIndustry,
        technologyIndustry: initialTechnologyIndustry,
        qualityServiceImages: initialQualityServiceImages,
        qualityIndustryImages: initialQualityIndustryImages,
        technologyIndustryImages: initialTechnologyIndustryImages,
        qualityDigitalSection: {
          heading: data.heading || initialQualityDigitalSection.heading,
          subheading: data.subheading || initialQualityDigitalSection.subheading,
          services: data.services || initialQualityDigitalSection.services,
          images: data.images || initialQualityDigitalSection.images,
        },
        plsAdvantage: initialPLSAdvantage,
      }

      await HomePage.create(initialData)
    } else {
      // If quality digital section doesn't exist, create it
      if (!homePage.qualityDigitalSection) {
        homePage.qualityDigitalSection = {
          heading: data.heading || initialQualityDigitalSection.heading,
          subheading: data.subheading || initialQualityDigitalSection.subheading,
          services: data.services || initialQualityDigitalSection.services,
          images: data.images || initialQualityDigitalSection.images,
        } as QualityDigitalSectionDocument
      } else {
        // Update existing quality digital section with the provided data
        if (data.heading) homePage.qualityDigitalSection.heading = data.heading
        if (data.subheading) homePage.qualityDigitalSection.subheading = data.subheading
        if (data.services) homePage.qualityDigitalSection.services = data.services as QualityDigitalServiceDocument[]
        if (data.images) homePage.qualityDigitalSection.images = data.images as QualityDigitalImagesDocument
      }

      await homePage.save()
    }

    return true
  } catch (error) {
    console.error("Error updating quality digital section:", error)
    return false
  }
}

// Add a new function to update PLS Advantage
export async function updatePLSAdvantage(data: Partial<PLSAdvantageDocument>): Promise<boolean> {
  console.log("updatePLSAdvantage function called with data:", data)

  try {
    await connectToDatabase()

    // Get current home page
    const homePage = await HomePage.findOne()

    if (!homePage) {
      // If home page doesn't exist, create it with the provided PLS Advantage
      console.log("Creating new home page with PLS Advantage")
      const initialData = {
        heroSlides: initialHeroSlides,
        services: initialServices,
        itCards: initialITCards,
        industryCards: initialIndustryCards,
        technologyCards: initialTechnologyCards,
        qualityServices: initialQualityServices,
        qualityIndustry: initialQualityIndustry,
        technologyIndustry: initialTechnologyIndustry,
        qualityServiceImages: initialQualityServiceImages,
        qualityIndustryImages: initialQualityIndustryImages,
        technologyIndustryImages: initialTechnologyIndustryImages,
        qualityDigitalSection: initialQualityDigitalSection,
        plsAdvantage: {
          title: data.title || initialPLSAdvantage.title,
          subtitle: data.subtitle || initialPLSAdvantage.subtitle,
          description: data.description || initialPLSAdvantage.description,
          yearsExperience: data.yearsExperience || initialPLSAdvantage.yearsExperience,
          yearsTitle: data.yearsTitle || initialPLSAdvantage.yearsTitle,
          features: data.features || initialPLSAdvantage.features,
          buttonText: data.buttonText || initialPLSAdvantage.buttonText,
          buttonLink: data.buttonLink || initialPLSAdvantage.buttonLink,
          images: data.images || initialPLSAdvantage.images,
        },
      }

      await HomePage.create(initialData)
    } else {
      // If PLS Advantage doesn't exist, create it
      if (!homePage.plsAdvantage) {
        console.log("Creating PLS Advantage in existing home page")
        homePage.plsAdvantage = {
          title: data.title || initialPLSAdvantage.title,
          subtitle: data.subtitle || initialPLSAdvantage.subtitle,
          description: data.description || initialPLSAdvantage.description,
          yearsExperience: data.yearsExperience || initialPLSAdvantage.yearsExperience,
          yearsTitle: data.yearsTitle || initialPLSAdvantage.yearsTitle,
          features: data.features || initialPLSAdvantage.features,
          buttonText: data.buttonText || initialPLSAdvantage.buttonText,
          buttonLink: data.buttonLink || initialPLSAdvantage.buttonLink,
          images: data.images || initialPLSAdvantage.images,
        } as PLSAdvantageDocument
      } else {
        // Update existing PLS Advantage with the provided data
        console.log("Updating existing PLS Advantage")
        if (data.title) homePage.plsAdvantage.title = data.title
        if (data.subtitle) homePage.plsAdvantage.subtitle = data.subtitle
        if (data.description) homePage.plsAdvantage.description = data.description
        if (data.yearsExperience) homePage.plsAdvantage.yearsExperience = data.yearsExperience
        if (data.yearsTitle) homePage.plsAdvantage.yearsTitle = data.yearsTitle
        if (data.features) homePage.plsAdvantage.features = data.features as PLSAdvantageFeatureDocument[]
        if (data.buttonText) homePage.plsAdvantage.buttonText = data.buttonText
        if (data.buttonLink) homePage.plsAdvantage.buttonLink = data.buttonLink
        if (data.images) homePage.plsAdvantage.images = data.images
      }

      await homePage.save()
    }

    return true
  } catch (error) {
    console.error("Error updating PLS Advantage:", error)
    return false
  }
}

// Get initial hero slides
export function getInitialHeroSlides(): Partial<SlideDocument>[] {
  return initialHeroSlides
}

// Get initial services
export function getInitialServices(): Partial<ServiceDocument>[] {
  return initialServices
}

// Get initial IT cards
export function getInitialITCards(): Partial<ITCardDocument>[] {
  return initialITCards
}

// Get initial industry cards
export function getInitialIndustryCards(): Partial<IndustryCardDocument>[] {
  return initialIndustryCards
}

// Get initial technology cards
export function getInitialTechnologyCards(): Partial<TechnologyCardDocument>[] {
  return initialTechnologyCards
}

// Get initial quality services
export function getInitialQualityServices(): Partial<QualityServiceDocument>[] {
  return initialQualityServices
}

// Get initial quality industry
export function getInitialQualityIndustry(): Partial<QualityIndustryDocument>[] {
  return initialQualityIndustry
}

// Get initial technology industry
export function getInitialTechnologyIndustry(): Partial<TechnologyIndustryDocument>[] {
  return initialTechnologyIndustry
}

// Get initial quality service images
export function getInitialQualityServiceImages(): Partial<QualityServiceImagesDocument> {
  return initialQualityServiceImages
}

// Get initial quality industry images
export function getInitialQualityIndustryImages(): Partial<QualityIndustryImagesDocument> {
  return initialQualityIndustryImages
}

// Get initial technology industry images
export function getInitialTechnologyIndustryImages(): Partial<TechnologyIndustryImagesDocument> {
  return initialTechnologyIndustryImages
}

// Get initial PLS Advantage
export function getInitialPLSAdvantage(): Partial<PLSAdvantageDocument> {
  return initialPLSAdvantage
}
