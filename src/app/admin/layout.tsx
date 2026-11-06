import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel & Content Management System | Muhammad Faiz Waheed",
  description: "Executive Content Management System (CMS) for Muhammad Faiz Waheed Portfolio.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-background text-content-primary">{children}</div>;
}

