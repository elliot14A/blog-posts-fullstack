import React, { FC } from "react";
import Link from "next/link";
import DeleteModal from "./ui/DeleteModel";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Settings, Trash } from "lucide-react";

interface BlogPostProps {
  email: string;
  name: string;
  title: string;
  content: string;
  tag: string;
  imageUrl: string;
  id: string;
  currentUser: string;
  userId: string;
}

const BlogPost: FC<BlogPostProps> = ({
  email,
  name,
  title,
  content,
  tag,
  imageUrl,
  id,
  currentUser,
  userId,
}) => {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const router = useRouter();
  return (
    <Link id={id} href={`/dashboard/blogposts/${id}`}>
      <div className="border border-black w-full bg-white rounded-lg p-6 md:p-8 lg:p-10">
        <div className="flex justify-between">
          <div className="flex flex-col md:flex-row md:items-center mb-4">
            <div className="text-xl font-bold md:mr-4">{title}</div>
            <div className="text-gray-600 text-sm">by {name}</div>
          </div>
          <div>
            {currentUser === userId ? (
              <div className="flex items-center gap-5">
                <Trash
                  onClick={() => {
                    setShowDeleteModal(showDeleteModal ? false : true);
                  }}
                  className="h-6 w-6"
                />
                <Link href={`/dashboard/blogposts/edit/${id}`}>
                  <Settings className="h-6 w-6" />
                </Link>
              </div>
            ) : null}
          </div>
        </div>
        <img className="rounded-t-lg h-56 w-full" src={imageUrl} alt="" />
        <p className="text-gray-700 mb-4">{content}</p>
        <div className="text-sm text-gray-500">Tags: {tag}</div>
        <div className="text-sm text-gray-500">Contact: {email}</div>
      </div>
      {showDeleteModal ? (
        <DeleteModal
          id={id}
          handleState={() => setShowDeleteModal(!showDeleteModal)}
          navigate={() => {
            router.push("/dashboard");
            toast.success("deleted successfully");
          }}
        />
      ) : null}
    </Link>
  );
};

export default BlogPost;
