"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Heart,
  Laptop,
  Heading as Seedling,
  Bot,
  BookOpen,
  Palette,
  PiggyBank,
  Code,
  Bookmark,
  ImageIcon,
  Wallet,
  Upload,
  Warehouse,
  MessageCircle,
  StickyNote,
  CheckSquare,
  Download,
  Puzzle,
  UserX,
  Instagram,
  Send,
  Mail,
  Search,
  ExternalLink,
} from "lucide-react"

const iconMap: { [key: string]: any } = {
  Laptop,
  Seedling,
  Bot,
  BookOpen,
  Palette,
  PiggyBank,
  Code,
  Bookmark,
  ImageIcon,
  Wallet,
  Upload,
  Warehouse,
  MessageCircle,
  StickyNote,
  CheckSquare,
  Download,
  Puzzle,
  UserX,
  ExternalLink,
}

interface Project {
  id: string
  name: string
  url: string
  icon: string
  featured: boolean
}

const defaultProjects: Project[] = []

export default function Portfolio() {
  const [searchTerm, setSearchTerm] = useState("")
  const [projects, setProjects] = useState<Project[]>(defaultProjects)

  useEffect(() => {
    // Load projects from admin panel
    const savedProjects = localStorage.getItem("admin_projects")
    if (savedProjects) {
      try {
        const parsedProjects = JSON.parse(savedProjects)
        setProjects(parsedProjects)
      } catch (error) {
        console.log("Error loading projects:", error)
        setProjects([])
      }
    } else {
      setProjects([])
    }
  }, [])

  const filteredProjects = projects.filter((project) => project.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleRedirect = (url: string) => {
    const element = document.activeElement as HTMLElement
    if (element) {
      element.style.transform = "scale(0.95)"
      element.style.opacity = "0.7"
    }

    setTimeout(() => {
      window.open(url, "_blank")
      if (element) {
        element.style.transform = "scale(1)"
        element.style.opacity = "1"
      }
    }, 150)
  }

  const getIconComponent = (iconString: string) => {
    if (iconString.startsWith("http") || iconString.startsWith("data:")) {
      return (
        <img
          src={iconString || "/placeholder.svg"}
          alt="Project icon"
          className="w-4 h-4 sm:w-5 sm:h-5 object-cover rounded"
        />
      )
    }
    const IconComponent = iconMap[iconString] || ExternalLink
    return <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-4 py-8 sm:px-6 sm:py-12">
        {/* Profile Section */}
        <div className="text-center mb-8 sm:mb-12 animate-in fade-in duration-700">
          <img
            src="https://files.catbox.moe/cj07ak.png"
            alt="Levi Setiadi"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 sm:mb-4 object-cover transition-transform hover:scale-105 duration-300"
          />
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">Levi Setiadi</h1>
          <p className="text-gray-600 text-sm mb-3 sm:mb-4">@leavealive_</p>
          <p className="text-gray-700 text-sm mb-4 sm:mb-6">Tanyakan apa saja tentang pemrograman</p>

          <Button
            onClick={() => handleRedirect("https://saweria.co/levisetiadi")}
            className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg py-2.5 sm:py-3 mb-6 sm:mb-8 font-medium text-sm sm:text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Heart className="w-4 h-4 mr-2" />
            Support My Work
          </Button>
        </div>

        <div className="relative mb-4 sm:mb-6 animate-in slide-in-from-top duration-500 delay-200">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-gray-300 transition-all duration-200 text-sm sm:text-base"
          />
        </div>

        <div className="space-y-2 sm:space-y-3">
          {/* Featured Projects Section */}
          {filteredProjects.some(p => p.featured) && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Paling Banyak Dikunjungi
              </h2>
              <div className="space-y-2">
                {filteredProjects.filter(project => project.featured).map((project, index) => (
                  <Card
                    key={project.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 border border-blue-200 bg-blue-50 hover:bg-blue-100 hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom duration-500"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => handleRedirect(project.url)}
                  >
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-1.5 sm:p-2 bg-blue-200 rounded-lg transition-colors duration-200">
                          {getIconComponent(project.icon)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 text-sm sm:text-base">{project.name}</h3>
                        </div>
                        <div className="px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded-full">Featured</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Other Projects Section */}
          {filteredProjects.some(p => !p.featured) && (
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                Project Lainnya
              </h2>
              <div className="space-y-2">
                {filteredProjects.filter(project => !project.featured).map((project, index) => (
                  <Card
                    key={project.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom duration-500"
                    style={{ animationDelay: `${(index + filteredProjects.filter(p => p.featured).length) * 50}ms` }}
                    onClick={() => handleRedirect(project.url)}
                  >
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-1.5 sm:p-2 bg-gray-100 rounded-lg transition-colors duration-200">
                          {getIconComponent(project.icon)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 text-sm sm:text-base">{project.name}</h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {filteredProjects.length === 0 && projects.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Tidak ada project yang ditemukan dengan kata kunci "{searchTerm}"</p>
          </div>
        )}

        {projects.length === 0 && (
          <div className="text-center py-8">
            <Card
              className="border-dashed border-2 border-gray-300 bg-gray-50"
            >
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Code className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-2">Belum ada project yang tersedia</p>
                <p className="text-sm text-gray-400">Admin belum menambahkan project apapun</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 animate-in fade-in duration-700 delay-500">
          <div className="flex justify-center space-x-3 sm:space-x-4">
            <button
              onClick={() => handleRedirect("https://instagram.com/leavealive_")}
              className="p-2 sm:p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
            <button
              onClick={() => handleRedirect("https://t.me/allnine_c")}
              className="p-2 sm:p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
            <button
              onClick={() => (window.location.href = "mailto:levisetiadinine@gmail.com")}
              className="p-2 sm:p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
