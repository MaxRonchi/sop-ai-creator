import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { 
  HomeIcon, 
  DocumentPlusIcon, 
  ClipboardDocumentListIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Create SOP", href: "/dashboard/create", icon: DocumentPlusIcon },
  { name: "My SOPs", href: "/dashboard/sops", icon: ClipboardDocumentListIcon },
  { name: "Analytics", href: "/dashboard/analytics", icon: ChartBarIcon },
];

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col bg-white border-r">
      <div className="flex h-16 items-center px-4 border-b">
        <h1 className="text-xl font-semibold">SOP Creator</h1>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            >
              <item.icon
                className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-blue-600"
                aria-hidden="true"
              />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex flex-shrink-0 border-t p-4">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center">
            <UserButton afterSignOutUrl="/" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Account</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
