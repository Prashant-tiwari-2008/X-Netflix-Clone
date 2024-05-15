import NewPost from "@/components/NewPost";
import Feed from "@/components/NewsFeed";


export default function Home() {
  return (
    <div className="max-w-xl mx-auto border-r border-l min-h-screen">
      <h1 className="font-bold text-xl border-b-2 p-3">Home</h1>
      <NewPost />
      <Feed />
    </div>
  );
}
