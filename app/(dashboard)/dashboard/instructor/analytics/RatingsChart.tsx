"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const DATA = [
    { stars: "5★", count: 412, color: "#D4A017" },
    { stars: "4★", count: 268, color: "#D4A017" },
    { stars: "3★", count: 98, color: "#6b7a90" },
    { stars: "2★", count: 42, color: "#6b7a90" },
    { stars: "1★", count: 22, color: "#6b7a90" },
];

export default function RatingsChart() {
    return (
        <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DATA} layout="vertical" margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a2e47" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 12, fill: "#6b7a90" }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="stars" tick={{ fontSize: 12, fill: "#6b7a90" }} axisLine={false} tickLine={false} width={35} />
                    <Tooltip contentStyle={{ backgroundColor: "#0A1628", border: "1px solid #1a2e47", borderRadius: "12px", fontSize: "13px" }} labelStyle={{ color: "#6b7a90" }} itemStyle={{ color: "#D4A017" }} />
                    <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                        {DATA.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
