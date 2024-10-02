"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUser } from "@clerk/nextjs"
import { getSubscriber } from "@/actions/get.stats"
interface ChartData {
  date: string;
  count: number;
}

const CustomTooltip: React.FC<{
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border rounded-lg shadow-lg">
        <p className="font-medium">{`${label}`}</p>
        <p className="text-primary">{`Subscribers: ${payload[0].value}`}</p>
      </div>
    )
  }
  return null
}

export default function SubscribersChart() {
  const [period, setPeriod] = useState<"7" | "30" | "90">("7")
  const [data, setData] = useState<ChartData[]>([])
  const { user } = useUser()

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const subscribers = await getSubscriber({ newsLetterOwnerId: user.username!, period })

        const formattedData: ChartData[] = Object.entries(subscribers).map(([date, count]) => ({
          date,
          count,
        }))

        setData(formattedData)
      }
    }
    fetchData()
  }, [user, period])

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Subscribers Overview</CardTitle>
        <Select onValueChange={(value: "7" | "30" | "90") => setPeriod(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Past 7 Days</SelectItem>
            <SelectItem value="30">Past 30 Days</SelectItem>
            <SelectItem value="90">Past 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-6">Shows new subscribers for the selected period</p>
        <div className="h-[300px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" />
              <XAxis 
                dataKey="date" 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="count"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}