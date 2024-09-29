"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", count: 2400 },
  { month: "Feb", count: 1398 },
  { month: "Mar", count: 9800 },
  { month: "Apr", count: 3908 },
  { month: "May", count: 4800 },
  { month: "Jun", count: 3800 },
  { month: "Jul", count: 4300 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
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
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Active Subscribers</CardTitle>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-primary mr-2" />
          <span className="text-sm text-muted-foreground">Subscribers</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-6">Shows all active subscribers</p>
        <div className="h-[300px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
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