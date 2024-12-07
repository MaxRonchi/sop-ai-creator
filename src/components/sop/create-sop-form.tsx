"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, Title, Button, TextInput, Textarea, DatePicker } from "@tremor/react";
import { PlusIcon, SparklesIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const taskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  cost: z.number().min(0).default(0),
});

const resourceSchema = z.object({
  name: z.string().min(1, "Resource name is required"),
  type: z.string().min(1, "Resource type is required"),
  cost: z.number().min(0),
  quantity: z.number().min(1).default(1),
});

const sopSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  prompt: z.string().optional(),
  tasks: z.array(taskSchema).optional(),
  resources: z.array(resourceSchema).optional(),
});

type SopFormData = z.infer<typeof sopSchema>;

export function CreateSOPForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SopFormData>({
    resolver: zodResolver(sopSchema),
    defaultValues: {
      tasks: [],
      resources: [],
    },
  });

  const onSubmit = async (data: SopFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/sops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          tasks,
          resources,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create SOP");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Error creating SOP:", error);
      alert("Failed to create SOP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getAISuggestion = async () => {
    try {
      setIsLoading(true);
      const prompt = watch("prompt");
      
      if (!prompt) {
        alert("Please enter a prompt for AI suggestions");
        return;
      }

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("AI suggestion failed");
      }

      const data = await response.json();
      setAiSuggestion(data.content || "");
    } catch (error) {
      console.error("Error getting AI suggestion:", error);
      alert("Failed to get AI suggestion. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = () => {
    setTasks([
      ...tasks,
      {
        title: "",
        description: "",
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        cost: 0,
      },
    ]);
  };

  const addResource = () => {
    setResources([
      ...resources,
      {
        name: "",
        type: "",
        cost: 0,
        quantity: 1,
      },
    ]);
  };

  const updateTask = (index: number, field: string, value: any) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      [field]: value,
    };
    setTasks(updatedTasks);
  };

  const updateResource = (index: number, field: string, value: any) => {
    const updatedResources = [...resources];
    updatedResources[index] = {
      ...updatedResources[index],
      [field]: value,
    };
    setResources(updatedResources);
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const removeResource = (index: number) => {
    setResources(resources.filter((_, i) => i !== index));
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <Title>Create New SOP</Title>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <TextInput
            {...register("title")}
            placeholder="Enter SOP title"
            error={!!errors.title}
            errorMessage={errors.title?.message}
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea
            {...register("description")}
            placeholder="Enter SOP description"
            error={!!errors.description}
            errorMessage={errors.description?.message}
            className="mt-1"
          />
        </div>

        <div className="border-t pt-4">
          <label className="block text-sm font-medium text-gray-700">
            AI Assistant
          </label>
          <div className="mt-1">
            <Textarea
              {...register("prompt")}
              placeholder="Describe what you want to create an SOP for..."
              rows={3}
            />
            <Button
              type="button"
              variant="secondary"
              className="mt-2"
              onClick={getAISuggestion}
              disabled={isLoading}
              icon={SparklesIcon}
            >
              Get AI Suggestions
            </Button>
          </div>

          {aiSuggestion && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <h4 className="text-sm font-medium text-blue-800">AI Suggestion:</h4>
              <p className="mt-1 text-sm text-blue-700 whitespace-pre-wrap">
                {aiSuggestion}
              </p>
              <Button
                type="button"
                variant="light"
                className="mt-2"
                onClick={() => {
                  setValue("description", aiSuggestion);
                }}
              >
                Use This Suggestion
              </Button>
            </div>
          )}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Tasks</h3>
            <Button type="button" variant="secondary" onClick={addTask} icon={PlusIcon}>
              Add Task
            </Button>
          </div>
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <div key={index} className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg">
                <div className="flex-1 space-y-4">
                  <TextInput
                    placeholder="Task title"
                    value={task.title}
                    onChange={(e) => updateTask(index, "title", e.target.value)}
                  />
                  <Textarea
                    placeholder="Task description"
                    value={task.description}
                    onChange={(e) => updateTask(index, "description", e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <DatePicker
                      className="max-w-full"
                      value={new Date(task.startDate)}
                      onValueChange={(date) => updateTask(index, "startDate", date?.toISOString())}
                      placeholder="Start date"
                    />
                    <DatePicker
                      className="max-w-full"
                      value={new Date(task.endDate)}
                      onValueChange={(date) => updateTask(index, "endDate", date?.toISOString())}
                      placeholder="End date"
                    />
                  </div>
                  <TextInput
                    type="number"
                    placeholder="Cost"
                    value={task.cost}
                    onChange={(e) => updateTask(index, "cost", parseFloat(e.target.value))}
                  />
                </div>
                <Button
                  type="button"
                  variant="light"
                  color="red"
                  icon={TrashIcon}
                  onClick={() => removeTask(index)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Resources</h3>
            <Button type="button" variant="secondary" onClick={addResource} icon={PlusIcon}>
              Add Resource
            </Button>
          </div>
          <div className="space-y-4">
            {resources.map((resource, index) => (
              <div key={index} className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg">
                <div className="flex-1 space-y-4">
                  <TextInput
                    placeholder="Resource name"
                    value={resource.name}
                    onChange={(e) => updateResource(index, "name", e.target.value)}
                  />
                  <TextInput
                    placeholder="Resource type"
                    value={resource.type}
                    onChange={(e) => updateResource(index, "type", e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <TextInput
                      type="number"
                      placeholder="Cost"
                      value={resource.cost}
                      onChange={(e) => updateResource(index, "cost", parseFloat(e.target.value))}
                    />
                    <TextInput
                      type="number"
                      placeholder="Quantity"
                      value={resource.quantity}
                      onChange={(e) => updateResource(index, "quantity", parseInt(e.target.value))}
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="light"
                  color="red"
                  icon={TrashIcon}
                  onClick={() => removeResource(index)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end border-t pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            loading={isLoading}
            icon={PlusIcon}
          >
            Create SOP
          </Button>
        </div>
      </form>
    </Card>
  );
}
