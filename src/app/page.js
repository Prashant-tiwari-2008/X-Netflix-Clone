import NewPost from "@/components/NewPost";
import Feed from "@/components/NewsFeed";


export default function Home() {
  return (
    <div className="w-full">
      <h1 className="font-bold text-xl border-b-2 p-3">Home</h1>
      <NewPost />
      <Feed />
    </div>
  );
}
