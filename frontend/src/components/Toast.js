function Toast({ error, message, zIndexClass = "z-[70]" }) {
  if (!message && !error) {
    return null;
  }

  return (
    <div className={`pointer-events-none fixed inset-x-0 top-4 ${zIndexClass} flex justify-center px-4`}>
      <div
        className={`rounded-full px-5 py-3 text-sm font-medium shadow-lg ${
          error ? "bg-red-600 text-white" : "bg-blue-900 text-white"
        }`}
      >
        {error || message}
      </div>
    </div>
  );
}

export default Toast;
