import Link from "next/link";
import WaveHand from "./WaveHand";
import Button from "./Button";

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-paper">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 sm:px-10">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-base tracking-tight text-ink sm:text-lg"
          aria-label="Magdalena Marczewska, home"
        >
          <WaveHand />
          <span>Magdalena Marczewska</span>
        </Link>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <Button href="/resume.pdf" chevron>
            Resume
          </Button>
          <Button href="mailto:magssydesigns@gmail.com" variant="solid">
            Contact
          </Button>
        </div>
      </div>
    </header>
  );
}
