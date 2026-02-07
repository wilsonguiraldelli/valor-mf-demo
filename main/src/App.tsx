import { Suspense } from "react";

import Header from "header";
import FollowButton from "followButton";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Suspense
        fallback={
          <div className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-background" />
        }
      >
        <Header
          title="Valor Module Federation Demo"
          avatarSrc="https://github.com/shadcn.png"
          avatarFallback="CN"
          message="Welcome, Guest"
        />
      </Suspense>

      <main className="flex min-h-screen items-center justify-center pt-16">
        <Suspense
          fallback={<div className="text-muted-foreground">Loading...</div>}
        >
          <FollowButton linkedinUrl="https://www.linkedin.com/in/wilsonguiraldelli/" />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
