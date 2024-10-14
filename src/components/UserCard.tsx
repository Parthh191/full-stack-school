import prisma from "@/lib/prisma";
import Image from "next/image";

// Ensure the UserCard is an async function since we're dealing with async operations
const UserCard = async ({
  type,
}: {
  type: "admin" | "teacher" | "student" | "parent";
}) => {
  // Mapping Prisma models with explicit type checking
  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  };

  // Ensure that the model is accessed properly and checked for null cases
  const model = modelMap[type];
  if (!model) {
    throw new Error(`Model for type ${type} not found`);
  }

  // Fetching count of records for the specific model type
  const data = await model.count();

  return (
    <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>
        <Image src="/more.png" alt="" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">{data}</h1>
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
    </div>
  );
};

export default UserCard;
