'use client'
import NewApplicationPage from "@/app/components/application/ApplicationForm"
import { DashboardSidebar } from "@/app/components/common/Sidebar"

const ApplicationFormPage = () => {
  return (
    <div className="flex h-screen">
      <DashboardSidebar userType="user" />
      <NewApplicationPage />
    </div>
  )
}
export default ApplicationFormPage;