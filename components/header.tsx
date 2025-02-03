export default function Header({ name }: { name: string }) {
  return (
    <h1 className="text-lg font-semibold text-center place-self-center">
      {name}
    </h1>
  );
}
