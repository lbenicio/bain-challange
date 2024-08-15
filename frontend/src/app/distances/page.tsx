import DistanceList from "../components/distance-list";

export default function Distances() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-50">
      <h1 className="text-black mt-5 text-4xl">Distances</h1>
      <DistanceList />
    </main>
  );
}
