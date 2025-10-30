export default function StarsSection() {
  return (
    <section className="text-center py-16">
      <h2 className="text-lg font-medium mb-8">STARS in VieCharm</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="w-[280px] aspect-[3/4] bg-gray-200 rounded" />
        ))}
      </div>
    </section>
  );
}
