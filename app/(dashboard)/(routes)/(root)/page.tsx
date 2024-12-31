import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'


export default function Home() {
  return (
    <div>
      <header>
            <SignedOut>
              <SignInButton mode='modal' />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
      </header>
    </div>
  );
}
