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

const defaultProjects = [
  { id: "1", name: "L.AI - Lepai", url: "https://lepai.my.id", icon: "Laptop", featured: true },
  { id: "2", name: "Grow a Garden - Info Stok", url: "https://gagstok.netlify.app/", icon: "Seedling", featured: true },
  { id: "3", name: "Alevia AI", url: "https://alevia.netlify.app/", icon: "Bot", featured: true },
  { id: "4", name: "AdaQur'an", url: "https://adaquran.netlify.app/", icon: "BookOpen", featured: true },
  { id: "5", name: "MarkpadC", url: "https://markpadc.netlify.app", icon: "Code", featured: false },
  { id: "6", name: "ColorPall", url: "https://colorpall.vercel.app/", icon: "Palette", featured: false },
  { id: "7", name: "Al-Qur'an Website", url: "https://alquran-website.vercel.app/", icon: "BookOpen", featured: false },
  { id: "8", name: "Tabungin aja", url: "https://tabunginaja.netlify.app/", icon: "PiggyBank", featured: false },
  { id: "9", name: "XCodeBro", url: "https://xcodebro.netlify.app/", icon: "Code", featured: false },
  {
    id: "10",
    name: "Smart Bookmark Link",
    url: "https://smart-bookmark.netlify.app/",
    icon: "Bookmark",
    featured: false,
  },
  { id: "11", name: "Up Scale Image", url: "https://upsclaceimg.netlify.app/", icon: "ImageIcon", featured: false },
  { id: "12", name: "Uangku", url: "https://uangku-levv.vercel.app/", icon: "Wallet", featured: false },
  { id: "13", name: "UpEcha", url: "https://upecha.netlify.app/", icon: "Upload", featured: false },
  { id: "14", name: "AInventory", url: "https://ainven.netlify.app", icon: "Warehouse", featured: false },
  {
    id: "15",
    name: "Ngeluh Dulu Baru Tenang",
    url: "https://ngeluh.koyeb.app",
    icon: "MessageCircle",
    featured: false,
  },
  { id: "16", name: "Twenty Note", url: "https://twentynote.netlify.app/", icon: "StickyNote", featured: false },
  { id: "17", name: "Bunny Task", url: "https://bunnytask.netlify.app/", icon: "CheckSquare", featured: false },
  { id: "18", name: "Alevia Downloader", url: "https://aleviadl.netlify.app/", icon: "Download", featured: false },
  { id: "19", name: "9Mod", url: "https://9mod.com/", icon: "Puzzle", featured: false },
  { id: "20", name: "Ayo Anon", url: "https://ayoanon.netlify.app/", icon: "UserX", featured: false },
]

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

export default function Portfolio() {
  const [searchTerm, setSearchTerm] = useState("")
  const [projects, setProjects] = useState<Project[]>(defaultProjects)

  useEffect(() => {
    const adminProjects = localStorage.getItem("admin_projects")
    if (adminProjects) {
      try {
        const parsedProjects = JSON.parse(adminProjects)
        if (parsedProjects.length > 0) {
          setProjects(parsedProjects)
        }
      } catch (error) {
        console.log("[v0] Error loading admin projects:", error)
      }
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
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom duration-500"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => handleRedirect(project.url)}
            >
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 sm:p-2 bg-gray-100 rounded-lg transition-colors duration-200 group-hover:bg-gray-200">
                    {getIconComponent(project.icon)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base">{project.name}</h3>
                  </div>
                  {project.featured && (
                    <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Featured</div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Tidak ada project yang ditemukan</p>
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
