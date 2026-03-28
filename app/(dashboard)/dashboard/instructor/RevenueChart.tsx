"use client";
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const DATA = [
    { month: "Sep", revenue: 420 },
    { month: "Oct", revenue: 680 },
    { month: "Nov", revenue: 890 },
    { month: "Dec", revenue: 1120 },
    { month: "Jan", revenue: 1340 },
    { month: "Feb", revenue: 1580 },
    { month: "Mar", revenue: 1890 },
];

export default function RevenueChart() {
    return (
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DATA} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                        <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#D4A017" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#D4A017" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a2e47" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7a90" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#6b7a90" }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
                    <Tooltip
                        contentStyle={{ backgroundColor: "#0A1628", border: "1px solid #1a2e47", borderRadius: "12px", fontSize: "13px" }}
                        labelStyle={{ color: "#6b7a90" }}
                        itemStyle={{ color: "#D4A017" }}
                        formatter={(value) => [`$${value}`, "Revenue"]}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#D4A017" strokeWidth={2} fill="url(#goldGrad)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
