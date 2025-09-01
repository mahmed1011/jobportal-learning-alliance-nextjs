// app/components/Header.jsx
import Link from "next/link";
export default function Header() {
    return (
        <header className="bg-[#3b3a3c] text-white p-4">
            <div className="max-w-7xl mx-auto flex justify-center items-center">
                <Link href="/">
                    <img src="/images/logo-right.png" alt="Logo" className="cursor-pointer" />
                </Link>
            </div>
        </header>
    );
}
