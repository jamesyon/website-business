import { createClient } from '@/lib/supabase/server'
import Nav from '@/components/landing/Nav'
import Hero from '@/components/landing/Hero'
import Marquee from '@/components/landing/Marquee'
import Services from '@/components/landing/Services'
import Work from '@/components/landing/Work'
import Process from '@/components/landing/Process'
import Testimonials from '@/components/landing/Testimonials'
import CTABanner from '@/components/landing/CTABanner'
import ContactForm from '@/components/landing/ContactForm'
import Footer from '@/components/landing/Footer'
import type { Project, Testimonial } from '@/types'

export const revalidate = 3600

export default async function Home() {
  let projects: Project[] = []
  let testimonials: Testimonial[] = []

  try {
    const supabase = await createClient()
    const [{ data: projectData }, { data: testimonialData }] = await Promise.all([
      supabase.from('projects').select('*').eq('published', true).order('sort_order'),
      supabase.from('testimonials').select('*').eq('published', true).order('sort_order'),
    ])
    projects = projectData ?? []
    testimonials = testimonialData ?? []
  } catch {
    // Supabase not configured yet — page renders with fallback state
  }

  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Work projects={projects} />
      <Process />
      <Testimonials testimonials={testimonials} />
      <CTABanner />
      <ContactForm />
      <Footer />
    </>
  )
}
