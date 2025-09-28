"use client"
import { UserPlus } from "lucide-react"
import { motion } from "framer-motion"

export default function FooterCard() {
  return (
    <div className="container mx-auto px-4 dark:bg-white">
      <footer className="relative bg-[#003087] text-white py-6 md:py-8 rounded-t-2xl shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 justify-between px-6 flex-wrap">
          {/* Left Section - Icon & Text */}
          <div className="flex items-center gap-3 w-full md:w-auto text-center md:text-left">
            <UserPlus className="w-8 h-8 text-white" />
            <span className="text-base md:text-2xl font-semibold leading-snug">
              Stay Connected - Opportunities For Independent Professionals
            </span>
          </div>

          {/* Right Section - Button */}
          <motion.a
            href="/freelancer-register"
            className="px-8 py-3 text-white rounded-lg font-bold contrast-100 bg-[#FF6B35] hover:text-white transition"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            REGISTER TODAY
          </motion.a>
        </div>

        {/* Bottom Border */}
        <div className="absolute bottom-0 left-0 w-full h-[6px] bg-[#FF6B35] rounded-b-lg" />
      </footer>
    </div>
  )
}
