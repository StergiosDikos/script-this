import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Mic, Edit, Wand2, Lightbulb, Users, Fingerprint, Zap } from 'lucide-react'

export default function EarlyAccessLandingPage() {
  console.log('in landing page');
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/join-waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setSubmitMessage('Thank you for joining our waitlist!')
        setEmail('')
      } else {
        setSubmitMessage('An error occurred. Please try again.')
      }
    } catch (error) {
      setSubmitMessage('An error occurred. Please try again.')
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-[#0a061e] text-white overflow-hidden">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
            <span className="text-xl sm:text-2xl font-normal">script</span>
            <span className="text-xl sm:text-2xl font-normal text-gray-400">/this</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/*Removed Join Waitlist Button*/}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 pt-12 sm:pt-20 pb-16 sm:pb-32">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-purple-400 to-blue-500 bg-clip-text text-transparent">
            Transform Your Ideas into<br className="hidden sm:inline" />
            Compelling Scripts
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
            Create Content 10x Faster
          </h2>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-12">
            Script This is an AI-powered tool that helps creators turn their ideas into engaging video content for TikTok, YouTube, and LinkedIn.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-auto flex-grow text-black placeholder-gray-500"
              required
            />
            <Button type="submit" className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90" disabled={isSubmitting}>
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </Button>
          </form>
          {submitMessage && (
            <p className="mt-4 text-sm text-green-400">{submitMessage}</p>
          )}
        </div>

        {/* Product Showcase */}
        <div className="relative mt-12 sm:mt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/20 to-blue-600/20 rounded-2xl" />
          <div className="relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl">
            <div className="aspect-[16/9] relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-11-24%20at%208.17.38%E2%80%AFPM-0oWeFPdfz9OekEiGpCiqb3EHjikiTF.png"
                alt="script/this interface showing the script editor with Hook, Story, and Call to Action sections"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <section id="how-it-works" className="mt-16 sm:mt-32">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">Create Your Script in Three Steps</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: Mic, title: "Input Your Ideas", description: "Type your thoughts or use voice input to describe your content concept" },
              { icon: Edit, title: "Refine Your Message", description: "Set preferences and collaborate with AI to enhance your script" },
              { icon: Wand2, title: "Generate Your Script", description: "Get a polished script or outline, tailored to your audience" }
            ].map((step, index) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6 shadow-xl">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="mt-16 sm:mt-32">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">Key Features</h2>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {[
              { icon: Lightbulb, title: "Insight Extraction", description: "AI-powered analysis to identify and highlight your most compelling ideas" },
              { icon: Users, title: "Audience Connection", description: "Craft messages that resonate with your specific audience" },
              { icon: Fingerprint, title: "Authentic Expression", description: "Preserve your unique tone and style in every script" },
              { icon: Zap, title: "Dynamic Adaptation", description: "Easily adjust content for different platforms and video lengths" }
            ].map((feature, index) => (
              <div key={index} className="bg-[#0B0A1F] backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6 shadow-xl">
                <div className="flex items-start">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg sm:text-xl font-semibold">{feature.title}</h3>
                    <p className="text-gray-400 mt-1 text-sm sm:text-base">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Early Access CTA */}
        <section className="mt-16 sm:mt-32 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">Get Early Access to Script This</h2>
          {/*Removed "Join our waitlist" subheading*/}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-auto flex-grow text-black placeholder-gray-500"
              required
            />
            <Button type="submit" className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90">
              Join Waitlist
            </Button>
          </form>
          {submitMessage && (
            <p className="mt-4 text-sm text-green-400">{submitMessage}</p>
          )}
          
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900/50 py-6 sm:py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm sm:text-base">&copy; {new Date().getFullYear()} script/this. All rights reserved.</p>
          <div className="mt-4">
            <Link href="/privacy" className="text-xs sm:text-sm text-gray-400 hover:text-white mr-4">Privacy Policy</Link>
            <Link href="/terms" className="text-xs sm:text-sm text-gray-400 hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </footer>

      {/* Gradient Orbs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-64 sm:w-96 h-64 sm:h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}