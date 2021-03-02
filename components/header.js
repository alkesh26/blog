import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between mb-8">
      <div>
        <div className="relative w-24 h-24">
          <img
            className="rounded-full border border-gray-100 shadow-sm"
            src="./../alkesh.jpg"
            width="100"
            height="100"
            alt="Alkesh"
          />
        </div>
      </div>

      <div className="flex flex-row">
        <Link href="/">
          <a className="pr-5 pt-5 font-medium text-gray-700">Home</a>
        </Link>
        <Link href="/about">
          <a className="pr-5 pt-5 font-medium text-gray-700">About Me</a>
        </Link>
      </div>
    </header>
  );
}
