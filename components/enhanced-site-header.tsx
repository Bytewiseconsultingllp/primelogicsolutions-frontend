"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import MegaMenu from "./mega-menu"
import { MobileMenu } from "./mobile-menu"
import { fetchDynamicMenuData } from "@/lib/navigation-utils"
import type { MenuItemType } from "@/types/menu"
import { useQuery } from "@tanstack/react-query"

export default function EnhancedSiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)

  // Fetch menu data from the database
  const { data: menuData = [], isLoading } = useQuery({
    queryKey: ["navigation"],
    queryFn: fetchDynamicMenuData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Measure header height for mega menu positioning
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight)
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === headerRef.current) {
          setHeaderHeight(entry.contentRect.height)
        }
      }
    })

    const currentHeaderRef = headerRef.current
    if (currentHeaderRef) {
      resizeObserver.observe(currentHeaderRef)
    }

    return () => {
      if (currentHeaderRef) {
        resizeObserver.unobserve(currentHeaderRef)
      }
    }
  }, [])

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  // Fallback menu data in case of loading or error
  const fallbackMenuData: MenuItemType[] = [
    { id: 1, title: "Home", href: "/" },
    { id: 2, title: "Services", href: "/services" },
    { id: 3, title: "Industries", href: "/industries" },
    { id: 4, title: "Technologies", href: "/technologies" },
    { id: 5, title: "About", href: "/about" },
    { id: 6, title: "Contact", href: "/contact" },
  ]

  const displayMenuData = menuData.length > 0 ? menuData : fallbackMenuData

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 px-4 z-50 w-full transition-all duration-300 ease-in-out",
        scrolled ? "bg-primary text-white py-12" : "bg-white text-primary py-4",
      )}
      style={{ "--header-height": `${headerHeight}px` } as React.CSSProperties}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center relative z-10">
          {scrolled ? (
            <Image
              src="/assets/logo.jpg" // Image for after scrolling
              alt="Logo scrolled"
              width={120}
              height={120}
              className="h-16 w-auto transition-all duration-300"
              priority
            />
          ) : (
            <Image
              src="/assets/plogic.png" // Image for before scrolling
              alt="Logo default"
              width={150}
              height={150}
              className="h-16 w-auto transition-all duration-300"
              priority
            />
          )}
        </Link>

        {/* Desktop Navigation with MegaMenu */}
        <MegaMenu items={displayMenuData} isScrolled={scrolled} />

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <Button
            variant="outline"
            className={cn(
              "transition-all duration-300",
              scrolled
                ? "text-white border-white bg-inherit hover:bg-white/20"
                : "text-[#FF6B35] border-[#FF6B35] bg-inherit hover:bg-primary hover:text-white hover:bg-[#FF6B35] ",
            )}
            asChild
          >
            <Link href="/get-started">GET STARTED</Link>
          </Button>

          <Button
            variant="outline"
            className={cn(
              "transition-all duration-300",
              scrolled
                ? "text-white border-white bg-transparent hover:bg-white/20"
                : "text-white border-[#FF6B35] bg-transparent hover:bg-primary hover:text-white hover:bg-[#FF6B35]",
            )}
            asChild
          >
            <Link href="./getQuote">GET QUOTE</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className={cn(
            "lg:hidden p-2 rounded-md focus:outline-none",
            scrolled ? "hover:bg-white/10 text-white" : "hover:bg-primary/10 text-primary",
          )}
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Mobile menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} menuData={displayMenuData} />
    </header>
  )
}
