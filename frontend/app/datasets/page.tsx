import { DatasetGallery } from "../components/DatasetGallery";

export default function DatasetsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-8">
          Explore Datasets
        </h1>
        <DatasetGallery />
      </div>
    </main>
  );
}