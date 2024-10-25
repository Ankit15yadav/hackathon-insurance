// src/app/(app)/dashboard/layout.tsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <div className="flex flex-col min-h-screen">
                <div className="flex flex-1">
                    <AppSidebar />
                    <SidebarTrigger
                        className=" size-16"
                    />
                    {children}
                </div>
            </div>
        </SidebarProvider>
    );
}
