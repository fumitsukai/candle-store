export default function FormError({
  error,
}: {
  error: string[] | undefined | string;
}) {
  return (
    <div className="text-red-400 text-xs font-thin">
      <p>{error}</p>
    </div>
  );
}
