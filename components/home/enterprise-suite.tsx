"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"

const EnterpriseSuite = () => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const imagePaths = [
    "/assets/enterprise.png",
    "/images/enterprise.png",
    "/enterprise.png",
    "/interconnected-business-network.png",
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const currentImage = imagePaths[currentImageIndex]

  // Reset loading state on image change
  useEffect(() => {
    setImageLoaded(false)
  }, [currentImage])

  // Try the next image in the list if the current one fails
  const tryNextImage = () => {
    if (currentImageIndex < imagePaths.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
      setImageError(false)
    } else {
      setImageError(true)
    }
  }

  return (
    <motion.section
      className="py-16 px-4 sm:px-6 lg:px-8 dark:bg-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="max-w-7xl mx-auto bg-[#003087] rounded-2xl overflow-hidden text-white">
        <div className="grid md:grid-cols-3 items-center">
          {/* Image Section */}
          <motion.div
            className="col-span-2 relative h-full min-h-[600px] bg-[#003087]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full h-full min-h-[600px]">
              <Image
                src={currentImage}
                alt="Enterprise Suite"
                fill
                priority
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, 66vw"
                onLoad={() => setImageLoaded(true)}
                onError={tryNextImage}
              />

              {/* Show spinner while loading */}
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              
            </div>
          </motion.div>

          {/* Content Section */}
          <div className="p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="text-3xl text-white font-bold mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Introducing PLS&apos;s Enterprise Suite:
              </motion.h2>

              <motion.p
                className="mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Your gateway to premier talent acquisition and comprehensive workforce management tools.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}

export default EnterpriseSuite
