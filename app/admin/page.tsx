"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, User, Plus, Edit, Trash2, ExternalLink } from "lucide-react"

interface Project {
  id: string
  name: string
  url: string
  icon: string
  featured: boolean
}

export default function AdminLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [projects, setProjects] = useState<Project[]>([])
  const [isAddingProject, setIsAddingProject] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [newProject, setNewProject] = useState({
    name: "",
    url: "",
    icon: "",
    featured: false,
  })

  // Default projects with proper featured status
  const defaultProjects: Project[] = [
    // PALING BANYAK DIKUNJUNGI (Featured projects)
    { id: "1", name: "L.AI - Lepai", url: "https://lepai.my.id", icon: "Laptop", featured: true },
    { id: "2", name: "Grow a Garden - Info Stok", url: "https://gagstok.netlify.app/", icon: "Seedling", featured: true },
    { id: "3", name: "Alevia AI", url: "https://alevia.netlify.app/", icon: "Bot", featured: true },
    { id: "4", name: "AdaQur'an", url: "https://adaquran.netlify.app/", icon: "BookOpen", featured: true },
    
    // PROJECT LAINNYA (Non-featured projects)
    { id: "5", name: "MarkpadC", url: "https://markpadc.netlify.app", icon: "Code", featured: false },
    { id: "6", name: "ColorPall", url: "https://colorpall.vercel.app/", icon: "Palette", featured: false },
    { id: "7", name: "Al-Qur'an Website", url: "https://alquran-website.vercel.app/", icon: "BookOpen", featured: false },
    { id: "8", name: "Tabungin aja", url: "https://tabunginaja.netlify.app/", icon: "PiggyBank", featured: false },
    { id: "9", name: "XCodeBro", url: "https://xcodebro.netlify.app/", icon: "Code", featured: false },
    { id: "10", name: "Smart Bookmark Link", url: "https://smart-bookmark.netlify.app/", icon: "Bookmark", featured: false },
    { id: "11", name: "Up Scale Image", url: "https://upsclaceimg.netlify.app/", icon: "ImageIcon", featured: false },
    { id: "12", name: "Uangku", url: "https://uangku-levv.vercel.app/", icon: "Wallet", featured: false },
    { id: "13", name: "UpEcha", url: "https://upecha.netlify.app/", icon: "Upload", featured: false },
    { id: "14", name: "AInventory", url: "https://ainven.netlify.app", icon: "Warehouse", featured: false },
    { id: "15", name: "Ngeluh Dulu Baru Tenang", url: "https://ngeluh.koyeb.app", icon: "MessageCircle", featured: false },
    { id: "16", name: "Twenty Note", url: "https://twentynote.netlify.app/", icon: "StickyNote", featured: false },
    { id: "17", name: "Bunny Task", url: "https://bunnytask.netlify.app/", icon: "CheckSquare", featured: false },
    { id: "18", name: "Alevia Downloader", url: "https://aleviadl.netlify.app/", icon: "Download", featured: false },
    { id: "19", name: "9Mod", url: "https://9mod.com/", icon: "Puzzle", featured: false },
    { id: "20", name: "Ayo Anon", url: "https://ayoanon.netlify.app/", icon: "UserX", featured: false },
  ]

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    setTimeout(() => {
      if (username === "levnine" && password === "levnine") {
        setIsAuthenticated(true)
        localStorage.setItem("admin_authenticated", "true")
      } else {
        setError("Username atau password salah")
      }
      setIsLoading(false)
    }, 500)
  }

  useEffect(() => {
    const isAuth = localStorage.getItem("admin_authenticated")
    if (isAuth === "true") {
      setIsAuthenticated(true)
    }

    const savedProjects = localStorage.getItem("admin_projects")
    if (savedProjects) {
      try {
        const parsedProjects = JSON.parse(savedProjects)
        setProjects(parsedProjects)
      } catch (error) {
        // If there's an error parsing, use default projects
        setProjects(defaultProjects)
        localStorage.setItem("admin_projects", JSON.stringify(defaultProjects))
      }
    } else {
      // If no saved projects, use default projects
      setProjects(defaultProjects)
      localStorage.setItem("admin_projects", JSON.stringify(defaultProjects))
    }
  }, [])

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("admin_authenticated")
    setUsername("")
    setPassword("")
  }

  const saveProjects = (updatedProjects: Project[]) => {
    setProjects(updatedProjects)
    localStorage.setItem("admin_projects", JSON.stringify(updatedProjects))
  }

  const handleAddProject = () => {
    if (newProject.name && newProject.url) {
      const project: Project = {
        id: `new_${Date.now()}`,
        name: newProject.name,
        url: newProject.url,
        icon: newProject.icon || "https://via.placeholder.com/32",
        featured: newProject.featured,
      }
      // Add new project at the beginning (teratas)
      saveProjects([project, ...projects])
      setNewProject({ name: "", url: "", icon: "", featured: false })
      setIsAddingProject(false)
    }
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setNewProject({
      name: project.name,
      url: project.url,
      icon: project.icon,
      featured: project.featured,
    })
  }

  const handleUpdateProject = () => {
    if (editingProject && newProject.name && newProject.url) {
      const updatedProjects = projects.map((p) =>
        p.id === editingProject.id ? { ...editingProject, ...newProject } : p,
      )
      saveProjects(updatedProjects)
      setEditingProject(null)
      setNewProject({ name: "", url: "", icon: "", featured: false })
    }
  }

  const handleDeleteProject = (id: string) => {
    if (confirm("Yakin ingin menghapus project ini?")) {
      saveProjects(projects.filter((p) => p.id !== id))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setNewProject((prev) => ({ ...prev, icon: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Kelola project dan link website</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>

          <div className="mb-6">
            <Button onClick={() => setIsAddingProject(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Project
            </Button>
          </div>

          {(isAddingProject || editingProject) && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{editingProject ? "Edit Project" : "Tambah Project Baru"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Project</label>
                  <Input
                    value={newProject.name}
                    onChange={(e) => setNewProject((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Masukkan nama project"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL Link</label>
                  <Input
                    value={newProject.url}
                    onChange={(e) => setNewProject((prev) => ({ ...prev, url: e.target.value }))}
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Icon/Favicon</label>
                  <div className="flex items-center space-x-4">
                    <Input type="file" accept="image/*" onChange={handleImageUpload} className="flex-1" />
                    {newProject.icon && (
                      <img
                        src={newProject.icon || "/placeholder.svg"}
                        alt="Preview"
                        className="w-8 h-8 rounded object-cover"
                      />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Upload gambar atau masukkan URL gambar</p>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={newProject.featured}
                    onChange={(e) => setNewProject((prev) => ({ ...prev, featured: e.target.checked }))}
                    className="rounded"
                  />
                  <label htmlFor="featured" className="text-sm text-gray-700">
                    Project Unggulan
                  </label>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={editingProject ? handleUpdateProject : handleAddProject}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {editingProject ? "Update" : "Simpan"}
                  </Button>
                  <Button
                    onClick={() => {
                      setIsAddingProject(false)
                      setEditingProject(null)
                      setNewProject({ name: "", url: "", icon: "", featured: false })
                    }}
                    variant="outline"
                  >
                    Batal
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Daftar Project ({projects.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {projects.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Belum ada project. Tambahkan project pertama Anda!</p>
              ) : (
                <div className="space-y-4">
                  {/* Featured Projects Section */}
                  {projects.some(p => p.featured) && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Paling Banyak Dikunjungi ({projects.filter(p => p.featured).length})
                      </h4>
                      <div className="space-y-2">
                        {projects.filter(project => project.featured).map((project) => (
                          <div
                            key={project.id}
                            className="flex items-center justify-between p-4 border border-blue-200 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                          >
                            <div className="flex items-center space-x-3">
                              <img
                                src={project.icon || "/placeholder.svg"}
                                alt={project.name}
                                className="w-8 h-8 rounded object-cover"
                              />
                              <div>
                                <h3 className="font-medium text-gray-900 text-sm sm:text-base">{project.name}</h3>
                                <p className="text-sm text-gray-500">{project.url}</p>
                                <span className="inline-block px-2 py-1 text-xs bg-blue-200 text-blue-800 rounded-full mt-1">
                                  Featured
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline" onClick={() => window.open(project.url, "_blank")}>
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleEditProject(project)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteProject(project.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Other Projects Section */}
                  {projects.some(p => !p.featured) && (
                    <div
                    >
                      <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                        Project Lainnya ({projects.filter(p => !p.featured).length})
                      </h4>
                      <div className="space-y-2">
                        {projects.filter(project => !project.featured).map((project) => (
                          <div
                            key={project.id}
                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                          >
                            <div className="flex items-center space-x-3">
                              <img
                                src={project.icon || "/placeholder.svg"}
                                alt={project.name}
                                className="w-8 h-8 rounded object-cover"
                              />
                              <div>
                                <h3 className="font-medium text-gray-900 text-sm sm:text-base">{project.name}</h3>
                                <p className="text-sm text-gray-500">{project.url}</p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline" onClick={() => window.open(project.url, "_blank")}>
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleEditProject(project)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteProject(project.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-in fade-in duration-500">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Admin Login</CardTitle>
          <p className="text-gray-600">Masuk ke panel admin</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  placeholder="Masukkan username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  placeholder="Masukkan password"
                  required
                />
              </div>
            </div>

            {error && <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded-lg">{error}</div>}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
