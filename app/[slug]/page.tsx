import { notFound } from "next/navigation"
import { getPageBySlug } from "@/lib/pages"
import { DynamicComponent } from "@/components/dynamic-component"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function Page({ params }: PageProps) {
  // Await the params as required by Next.js 15
  const { slug: rawSlug } = await params
  
  // Convert empty slug to "/" for the home page
  const slug = rawSlug === "" ? "/" : `/${rawSlug}`

  console.log("Rendering page with slug:", slug)
  const page = await getPageBySlug(slug)

  if (!page) {
    console.log("Page not found for slug:", slug)
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container mx-auto">
          <h1 className="my-8 text-3xl font-bold">{page.title}</h1>
          <div className="space-y-8">
            {page.sections.map((section, index) => (
              <DynamicComponent key={index} component={section.component} data={section.data} />
            ))}
            {page.sections.length === 0 && (
              <div className="p-4 border rounded-md">
                <p>This page has no content sections yet.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
