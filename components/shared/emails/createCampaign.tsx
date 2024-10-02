'use client'

import React, { useState, useEffect } from "react"
import { Trash2, Edit3, Plus, Search, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Modal from "@/components/widgets/modal"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/ui/icons"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useClerk } from "@clerk/nextjs"
import { getCampaigns, getCampaign } from "@/actions/save.email"
import { deleteEmail } from "@/actions/delete.email"

export default function CreateCampaign() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { user } = useClerk()
  const [campaignName, setCampaignName] = useState("")
  const [selectedEditor, setSelectedEditor] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [campaigns, setCampaigns] = useState<any[]>([])

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (user?.id) {
        const fetchedCampaigns = await getCampaigns(user.id);
        setCampaigns(fetchedCampaigns);
      }
    };
    fetchCampaigns();
  }, [user]);

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedCampaigns = filteredCampaigns.sort((a, b) => {
    return sortOrder === "asc"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sortedCampaigns.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(sortedCampaigns.length / itemsPerPage)

  const onCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (campaignName.length <= 2) {
      toast({
        title: "Error",
        description: "Campaign name cannot be less than 2 characters",
      })
      setLoading(false)
      return
    }

    if (!selectedEditor) {
      toast({
        title: "Error",
        description: "Please select an editor",
      })
      setLoading(false)
      return
    }

    const formattedTitle = campaignName.replace(/\s+/g, "-").replace(/&/g, "-")
    router.push(`/dashboard/editor?subject=${formattedTitle}&editor=${selectedEditor}`)
  }

  const handleEditCampaign = async (campaignId: string) => {
    const campaign = await getCampaign(campaignId);
    if (campaign) {
      router.push(`/dashboard/editor?subject=${encodeURIComponent(campaign.title)}&editor=${campaign.editorType}&id=${campaign.id}`);
    }
  };

  const handleDeleteCampaign = async (campaignId: string) => {
    const result = await deleteEmail({ emailId: campaignId });
    if (result.message) {
      toast({
        title: "Success",
        description: result.message,
      });
      const updatedCampaigns = campaigns.filter(campaign => campaign._id !== campaignId);
      setCampaigns(updatedCampaigns);
    } else if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Campaigns</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-64"
            />
          </div>
          <Modal
            title="Create New Campaign"
            description="Add your customers and create a marketing campaign"
            trigger={
              <Button className="rounded-full" size="sm">
                <Plus className="mr-2 h-4 w-4" /> New Campaign
              </Button>
            }
          >
            <form className="space-y-4" onSubmit={onCreateCampaign}>
              <Input
                type="text"
                placeholder="Campaign Name"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
              <div className="space-y-2">
                <p className="text-sm font-medium">Select an editor:</p>
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant={selectedEditor === "visual" ? "default" : "outline"}
                    onClick={() => setSelectedEditor("visual")}
                  >
                    Visual Editor
                  </Button>
                  <Button
                    type="button"
                    variant={selectedEditor === "unlayer" ? "default" : "outline"}
                    onClick={() => setSelectedEditor("unlayer")}
                  >
                    Unlayer Editor
                  </Button>
                  <Button
                    type="button"
                    variant={selectedEditor === "html" ? "default" : "outline"}
                    onClick={() => setSelectedEditor("html")}
                  >
                    HTML Editor
                  </Button>
                </div>
              </div>
              <Button className="w-full" disabled={loading} type="submit">
                {loading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Create Campaign"
                )}
              </Button>
            </form>
          </Modal>
        </div>
      </div>

      <div className="bg-accent/20 rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-accent/50">
          <h2 className="text-lg font-semibold">Campaign List</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
          </Button>
        </div>

        <ul className="divide-y divide-accent/80">
          {currentItems.map((campaign) => (
            <li key={campaign._id} className="flex items-center justify-between p-4 hover:bg-muted">
              <Link
                href={`/dashboard/editor?subject=${encodeURIComponent(campaign.title)}&editor=${campaign.editorType}&id=${campaign._id}`}
                className="text-lg font-medium hover:underline"
              >
                {campaign.title}
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{campaign.editorType}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => handleEditCampaign(campaign._id)}>
                      <Edit3 className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleDeleteCampaign(campaign._id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Items per page:</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => setItemsPerPage(parseInt(value))}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="16">16</SelectItem>
              <SelectItem value="24">24</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}