export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-2 border border-red-400">
      {message}
    </div>
  );
}
