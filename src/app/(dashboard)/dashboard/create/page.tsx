import { CreateSOPForm } from "@/components/sop/create-sop-form";

export default function CreateSOPPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create New SOP</h1>
        <p className="text-gray-500">
          Create a new Standard Operating Procedure with AI assistance
        </p>
      </div>

      <CreateSOPForm />
    </div>
  );
}
