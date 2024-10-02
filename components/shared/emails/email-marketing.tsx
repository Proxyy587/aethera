"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Plus, Send, Users, BarChart, ExternalLink } from "lucide-react";
import Modal from "@/components/widgets/modal";
import { Icons } from "@/components/ui/icons";
import { useUser } from "@clerk/nextjs";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import EmailOverviewCard from "@/components/cards/email-overview-card";
import SubscribersChart from "@/components/cards/subscriber-chart";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

type Props = {
  campaign?: {
    name: string;
    id: string;
    customers: string[];
    createdAt: Date;
  }[];
  subscription?: {
    plan: "STANDARD" | "PRO" | "ULTIMATE";
    credits: number;
  } | null;
};

export default function EmailMarketing({ campaign, subscription }: Props) {
  const router = useRouter();
  const [campaignName, setCampaignName] = useState("");
  const { isSignedIn, user, isLoaded } = useUser();
  const [copied, setCopied] = useState(false);

  const onCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (campaignName.length <= 2) {
      toast({
        title: "Error",
        description: "Campaign name must be at least 3 characters long",
      });
      return;
    }

    const formattedTitle = campaignName.replace(/\s+/g, "-").replace(/&/g, "-");
    router.push(`/dashboard/editor?subject=${formattedTitle}`);
  };

  const handleCopyClick = () => {
    const url = `${user?.username}.${process.env.NEXT_PUBLIC_WEBSITE_URL}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      toast({
        title: "Copied",
        description: "URL copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleViewSite = () => {
    window.open(process.env.NODE_ENV === 'development' ? `http://${user?.username}.localhost:3000` : `httpss://${user?.username}.${process.env.NEXT_PUBLIC_WEBSITE_URL}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, <span className="text-primary">{isSignedIn ? user.fullName : "Guest"}</span>
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your email marketing performance.
        </p>
      </header>
      <Separator className="mb-8" />
      <main className="space-y-8">
        <section className="flex flex-wrap gap-4 justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">Quick Actions</h2>
            <p className="text-sm text-muted-foreground">Create or manage your campaigns</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Modal
              title="Create a new campaign"
              description="Set up a new email marketing campaign"
              trigger={
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Create Campaign
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
                <Button className="w-full" type="submit">
                  Create Campaign
                </Button>
              </form>
            </Modal>
            <Button variant="outline">
              <Send className="mr-2 h-4 w-4" /> View Campaigns
            </Button>
          </div>
        </section>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Your email marketing stats at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <EmailOverviewCard />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
              <CardDescription>Your current plan and usage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Plan</span>
                <span className="text-primary font-semibold">{subscription?.plan || "FREE"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Credits</span>
                <span>{subscription?.credits || 0} remaining</span>
              </div>
              <Button className="w-full" variant="outline">Upgrade Plan</Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Campaigns</CardTitle>
              <CardDescription>Your latest email marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-2 font-medium">Name</th>
                      <th className="pb-2 font-medium">Sent</th>
                      <th className="pb-2 font-medium">Open Rate</th>
                      <th className="pb-2 font-medium">Click Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaign?.slice(0, 5).map((c) => (
                      <tr key={c.id} className="border-b last:border-b-0">
                        <td className="py-3">{c.name}</td>
                        <td className="py-3">{c.customers.length}</td>
                        <td className="py-3">23%</td>
                        <td className="py-3">12%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
              <CardDescription>Helpful links and tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Your Subscription Page</h4>
                <div
                  className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors"
                  onClick={handleCopyClick}
                >
                  <span className="text-sm truncate mr-2">
                    {`${user?.username}.${process.env.NEXT_PUBLIC_WEBSITE_URL}`.slice(0, 32)}...
                  </span>
                  <Button variant="outline" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  className="w-full mt-2" 
                  variant="outline" 
                  onClick={handleViewSite}
                >
                  <ExternalLink className="mr-2 h-4 w-4" /> View Site
                </Button>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Helpful Links</h4>
                <ul className="space-y-1">
                  <li>
                    <Button variant="link" className="p-0 h-auto">Email Marketing Best Practices</Button>
                  </li>
                  <li>
                    <Button variant="link" className="p-0 h-auto">Campaign Analytics Guide</Button>
                  </li>
                  <li>
                    <Button variant="link" className="p-0 h-auto">Subscriber Management Tips</Button>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Subscriber Growth</CardTitle>
            <CardDescription>Your audience growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <SubscribersChart />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}