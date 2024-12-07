import { Card, Title, Text } from "@tremor/react";
import { PlusIcon, DocumentIcon, ClockIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500">Manage your Standard Operating Procedures</p>
        </div>
        <Link
          href="/dashboard/create"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create New SOP
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="space-y-2">
          <div className="flex items-center space-x-2">
            <DocumentIcon className="h-5 w-5 text-blue-500" />
            <Title>Total SOPs</Title>
          </div>
          <Text>0 SOPs created</Text>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center space-x-2">
            <ClockIcon className="h-5 w-5 text-yellow-500" />
            <Title>In Progress</Title>
          </div>
          <Text>0 SOPs in progress</Text>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center space-x-2">
            <DocumentIcon className="h-5 w-5 text-green-500" />
            <Title>Completed</Title>
          </div>
          <Text>0 SOPs completed</Text>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <Title>Recent SOPs</Title>
          <div className="mt-4">
            <div className="text-center py-8">
              <Text>No SOPs created yet</Text>
              <Link
                href="/dashboard/create"
                className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
              >
                Create your first SOP
              </Link>
            </div>
          </div>
        </Card>

        <Card>
          <Title>Resource Usage</Title>
          <div className="mt-4">
            <div className="text-center py-8">
              <Text>No resource data available</Text>
              <Text className="text-sm text-gray-500 mt-1">
                Resource statistics will appear as you create SOPs
              </Text>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
