const LoadingSkeleton = () => {
  return (
    <section className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/50 mb-8">
      <div className="mb-8">
        <div className="h-10 bg-slate-200 rounded-xl w-1/3 mb-3 animate-pulse" />
        <div className="h-5 bg-slate-200 rounded-lg w-2/3 animate-pulse" />
      </div>

      <div className="space-y-10">
        <div className="space-y-4">
          <div className="h-6 bg-slate-200 rounded-lg w-1/4 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200/50">
                <div className="h-4 bg-slate-200 rounded w-1/3 mb-3 animate-pulse" />
                <div className="h-11 bg-slate-200 rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-6 bg-slate-200 rounded-lg w-1/4 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200/50">
                <div className="h-4 bg-slate-200 rounded w-1/3 mb-3 animate-pulse" />
                <div className="h-11 bg-slate-200 rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-6 bg-slate-200 rounded-lg w-1/3 animate-pulse" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200/50">
                <div className="h-4 bg-slate-200 rounded w-1/3 mb-3 animate-pulse" />
                <div className="h-11 bg-slate-200 rounded-lg animate-pulse" />
                <div className="h-9 bg-slate-200 rounded-lg mt-2 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-6 bg-slate-200 rounded-lg w-1/5 animate-pulse" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200/50">
                <div className="h-4 bg-slate-200 rounded w-1/4 mb-3 animate-pulse" />
                <div className="h-11 bg-slate-200 rounded-lg animate-pulse" />
                <div className="h-9 bg-slate-200 rounded-lg mt-2 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoadingSkeleton;
