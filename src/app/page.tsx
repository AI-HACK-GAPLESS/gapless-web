import { Button } from '@/shared/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const ROUTES = {
  DISCORD:
    'https://discord.com/oauth2/authorize?client_id=1360520654771847211&permissions=18428094303232&integration_type=0&scope=bot',
  SLACK: '',
};

export default function Home() {
  return (
    <div className="min-h-svh">
      <header className="px-10 fixed top-0 left-0 h-16 w-full flex justify-center items-center border-b border-[#343134]">
        <div className="container flex gap-4">
          <Image src="/logo.png" alt="Logo" width={24} height={24} />
          <span className="text-[#A9ABB8] font-bold">GAPLESS</span>
        </div>
      </header>
      <main className="w-full flex flex-col bg-gradient-to-b from-[#1A1C21] to-[#2B2D36]">
        <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
          <div className="relative z-50 flex flex-col justify-center items-center">
            <Image
              src="/logo.png"
              alt="GAPLESS"
              width={140}
              height={140}
              priority
            />

            <h3 className="mt-20 text-[#A9ABB8] font-semibold text-lg">
              TEAM AI_COHOLIC
            </h3>
            <h2 className="mt-4 font-bold text-8xl">GAPLESS</h2>

            <div className="mt-20 flex gap-8">
              <Link href={ROUTES.DISCORD} target="_blank">
                <Button className="bg-[#5865F2] hover:scale-97 hover:bg-[#5865F2] text-white">
                  <Image
                    src="/discord.png"
                    alt="Discord icon"
                    width={24}
                    height={24}
                  />
                  Invite Discord
                </Button>
              </Link>
              {/* <Link href={ROUTES.SLACK} target="_blank"> */}
              <Link href="#">
                <Button className="bg-white text-black hover:bg-white hover:scale-97">
                  <Image
                    src="/slack.png"
                    alt="Slack icon"
                    width={24}
                    height={24}
                  />
                  Invite Slack
                </Button>
              </Link>
            </div>
          </div>
          <div className="absolute w-[120%] h-[50%] bottom-0 bg-gradient-to-b from-[#FF2081] to-[#3EBBC3] rounded-t-[50%] opacity-50 blur-xl" />
        </section>
      </main>
      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
