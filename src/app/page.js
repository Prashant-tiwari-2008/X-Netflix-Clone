import NewPost from "@/components/NewPost";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full">
      <h1 className="font-bold text-xl border-b-2 p-3">Home</h1>
      <NewPost/>
    </div>
  );
}
