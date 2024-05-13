'use client'
import NewPost from "@/components/NewPost";
import Feed from "@/components/NewsFeed";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="w-full">
      <h1 className="font-bold text-xl border-b-2 p-3">Home</h1>
      {session && <NewPost />}
      <Feed />
    </div>
  );
}
