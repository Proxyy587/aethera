"use client"

import React from "react"
import { useUser } from "@clerk/nextjs"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, EyeOff, Moon, Sun, Laptop } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"

const themes = [
  { name: "light", label: "Light", icon: Sun, image: "/light.svg" },
  { name: "dark", label: "Dark", icon: Moon, image: "/dark.svg" },
  { name: "system", label: "System", icon: Laptop, image: "/system.svg" },
]

const apiTools = [
  { name: "Email API", key: "em_1234567890" },
  { name: "Analytics API", key: "an_0987654321" },
  { name: "Payment API", key: "pa_1357924680" },
]

export default function SettingsPage() {
  const { user } = useUser()
  const { theme, setTheme } = useTheme()
  const [visibleKeys, setVisibleKeys] = React.useState<{ [key: string]: boolean }>({})

  const toggleKeyVisibility = (toolName: string) => {
    setVisibleKeys(prev => ({ ...prev, [toolName]: !prev[toolName] }))
  }

  const handleSaveChanges = () => {
    toast({
      title: "Changes saved",
      description: "Your profile changes have been saved successfully.",
    })
  }

  const handleRegenerateKey = (toolName: string) => {
    toast({
      title: "API Key Regenerated",
      description: `A new key for ${toolName} has been generated.`,
    })
  }

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <Tabs defaultValue="profile" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>STATIC VALUES FOR NOW.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User avatar"} />
                  <AvatarFallback>{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button>Change Avatar</Button>
              </div>
              <div className="grid gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue={user?.firstName || ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue={user?.lastName || ""} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user?.emailAddresses[0].emailAddress || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue={user?.username || ""} />
                </div>
              </div>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the application.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {themes.map((themeOption) => (
                  <div
                    key={themeOption.name}
                    className={`relative cursor-pointer rounded-lg overflow-hidden transition-all ${
                      theme === themeOption.name ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setTheme(themeOption.name)}
                  >
                    <Image width={50} height={50} src={themeOption.image} alt={themeOption.label} className="w-full h-auto" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                      <themeOption.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2 text-center">
                      {themeOption.label}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-keys">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys for different tools.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiTools.map((tool) => (
                  <div key={tool.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{tool.name}</h3>
                      <p className="text-sm text-muted-foreground font-mono">
                        {visibleKeys[tool.name] ? tool.key : "••••••••••••••••"}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleKeyVisibility(tool.name)}
                      >
                        <span className="sr-only">{visibleKeys[tool.name] ? "Hide" : "Show"} API key</span>
                        {visibleKeys[tool.name] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline" onClick={() => handleRegenerateKey(tool.name)}>Regenerate</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}