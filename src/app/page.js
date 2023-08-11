import Image from 'next/image';
import Link from 'next/link';
import Logo from '../images/logo.png';

export default function Home() {
  return (
    <div>

      <main>
        <div className="text-center">
          <Image
            src= {Logo}// Replace with the actual path to your logo image
            alt="RemembrWhn Logo"
            width={200}
            height={200}
          />
          <p className="text-lg mt-4 mb-8">
            Preserve your cherished memories in time capsules with RemembrWhn. Create capsules with notes, photos, and more, set to unlock at the perfect moment. Collaborate with friends, share the joy, and unlock memories together. Welcome to RemembrWhn – where moments matter.
          </p>
          <div>
            <Link href="/sign-up">
              Get Started
            </Link>
            <Link href="/login">
              Log In
            </Link>
          </div>
        </div>
      </main>

      {/* Footer or other sections */}
    </div>
  );
}
