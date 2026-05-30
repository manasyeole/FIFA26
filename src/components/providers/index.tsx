"use client";

/**
 * Root providers wrapper.
 * Add context providers here as the app grows (auth, theme, analytics, etc.)
 * Keeps layout.tsx clean — one import instead of nested providers.
 *
 * Usage in layout.tsx:
 *   <Providers>{children}</Providers>
 */
export function Providers({ children }: { children: React.ReactNode }) {
  // Phase 2: wrap with SupabaseProvider
  // Phase 3: wrap with AuthProvider
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>; // intentional — future providers wrap here
}
