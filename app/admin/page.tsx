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
      setProjects(JSON.parse(savedProjects))
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
        id: Date.now().toString(),
        name: newProject.name,
        url: newProject.url,
        icon: newProject.icon || "https://via.placeholder.com/32",
        featured: newProject.featured,
      }
      saveProjects([...projects, project])
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
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={project.icon || "/placeholder.svg"}
                          alt={project.name}
                          className="w-8 h-8 rounded object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">{project.name}</h3>
                          <p className="text-sm text-gray-500">{project.url}</p>
                          {project.featured && (
                            <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mt-1">
                              Unggulan
                            </span>
                          )}
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
