export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-navy-900">
            {/* Sidebar and dashboard shell will go here */}
            <main className="lg:pl-64">{children}</main>
        </div>
    );
}
