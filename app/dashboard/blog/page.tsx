import { get } from "@/shared/utils/api";
import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const fetchBlogs = async () => {
  try {
    return await get("/blog");
  } catch (error) {}
};
export default async function Blog() {
  const data = await fetchBlogs();
  return (
    <div className="p-3 grid grid-cols-4">
      {data?.data?.map((blog: any) => (
        <Card key={blog?.id}>
          <CardHeader>
            <Image
              src={blog?.image}
              className="max-h-52 object-cover w-full"
              classNames={{
                wrapper: "w-full !max-w-full",
              }}
              isBlurred
              isZoomed
            />
          </CardHeader>
          <CardBody>
            <h5 className="mb-2 font-bold">{blog?.title}</h5>
            <p className=" text-sm">{blog?.description}</p>
            <Button className="mt-4" color="secondary" variant="flat" as={Link} href={`/dashboard/blog/${blog?.slug}`}>
              See details
            </Button>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
