import Navigation from "./components/navigation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-50">
      <h1 className="text-black mt-5 text-4xl">Main page</h1>
      <Navigation />
    </main>
  );
}
