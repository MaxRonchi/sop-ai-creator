import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI-Powered SOP Creator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create detailed Standard Operating Procedures with AI assistance, resource tracking, and cost analysis
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-blue-600 text-2xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">AI Assistance</h3>
            <p className="text-gray-600">
              Get intelligent suggestions and automate the creation of detailed procedures
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-blue-600 text-2xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Resource Dashboard</h3>
            <p className="text-gray-600">
              Track resources, timelines, and costs in a comprehensive dashboard
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-blue-600 text-2xl mb-4">📈</div>
            <h3 className="text-xl font-semibold mb-2">Cost Analysis</h3>
            <p className="text-gray-600">
              Automatically calculate and optimize costs for your procedures
            </p>
          </div>
        </div>

        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Get Started</h2>
          <div className="flex justify-center">
            <SignIn afterSignInUrl="/dashboard" />
          </div>
        </div>

        <div className="mt-16 text-center text-gray-600">
          <p className="mb-4">
            Perfect for web agencies, development teams, and business operations
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/dashboard" 
              className="text-blue-600 hover:text-blue-800"
            >
              Dashboard
            </Link>
            <Link 
              href="/dashboard/create" 
              className="text-blue-600 hover:text-blue-800"
            >
              Create SOP
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
