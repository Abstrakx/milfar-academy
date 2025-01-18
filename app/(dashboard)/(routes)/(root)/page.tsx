import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          logoImageUrl: '/logo.png',
        }
      }}
    >
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
  </ClerkProvider>
  );
}
