// import Link from "next/link"
// import Image from "next/image"
// import { getAllServices } from "@/lib/services"
// import { Button } from "@/components/ui/button"
// import { ArrowRight } from "lucide-react"

// // Add cache: 'no-store' to ensure fresh data on each request
// export const revalidate = 0

// export default async function ServicesPage() {
//   // This will fetch fresh data on each page load
//   const services = await getAllServices()

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}
//       <div className="relative h-[300px] bg-[#003087]">
//         <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">Our Services</h1>
//           <div className="text-xl font-medium text-center">Enterprise-grade solutions for modern businesses</div>
//         </div>
//       </div>

//       {/* Services List */}
//       <div className="container mx-auto px-4 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {services.map((service) => (
//             <div
//               key={service.id}
//               className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
//             >
//               <div className="relative h-48 w-full">
//                 <Image
//                   src={service.image || "/placeholder.svg?height=400&width=600"}
//                   alt={service.title}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div className="p-6">
//                 <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
//                 <p className="text-gray-600 mb-4">{service.subtitle}</p>
//                 <Link href={`/services/${service.slug}`}>
//                   <Button className="w-full flex items-center justify-center">
//                     Learn More <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           ))}

//           {services.length === 0 && (
//             <div className="col-span-full flex justify-center items-center p-12 border rounded-lg">
//               <p className="text-gray-500">No services found. Please add services through the admin dashboard.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
