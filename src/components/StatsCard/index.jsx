export function StatsCard({ icon, icon2, title, stats, activity }) {
  return (
    <div className="rounded bg-[#2D2D2D] text-white p-6">
      <div className="flex justify-between items-center mb-2">
        <h1 className="font-bold text-4xl">{stats}</h1>
        {icon}
      </div>
      {title && <h3 className="mb-2 font-medium">{title}</h3>}
      {activity && (
        <div className="flex gap-2 justify-start items-center">
          <span className="inline-flex items-center justify-center rounded-full w-5 h-5 bg-primary/50">
            {icon2}
          </span>
          <span className="text-xs text-gray-300">{activity}</span>
        </div>
      )}
    </div>
  );
}
