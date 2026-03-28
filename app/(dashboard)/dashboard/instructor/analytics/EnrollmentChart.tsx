"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const DATA = [
    { month: "Sep", enrollments: 85 },
    { month: "Oct", enrollments: 120 },
    { month: "Nov", enrollments: 142 },
    { month: "Dec", enrollments: 168 },
    { month: "Jan", enrollments: 195 },
    { month: "Feb", enrollments: 225 },
    { month: "Mar", enrollments: 280 },
];

export default function EnrollmentChart() {
    return (
        <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DATA} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a2e47" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7a90" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#6b7a90" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: "#0A1628", border: "1px solid #1a2e47", borderRadius: "12px", fontSize: "13px" }} labelStyle={{ color: "#6b7a90" }} itemStyle={{ color: "#2DD4BF" }} />
                    <Bar dataKey="enrollments" fill="#2DD4BF" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
