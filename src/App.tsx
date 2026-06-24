import { lazy, Suspense, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useBoltBuilderStore } from './stores/boltBuilderStore';
import { startWizardSession, updateWizardStep } from './utils/metricsTracking';
import ErrorBoundary from './components/ErrorBoundary';
import WelcomePage from './components/WelcomePage';
import WizardLayout from './components/WizardLayout';
import { SkipLink } from './components/accessibility/SkipLink';
import { NetworkStatus } from './components/NetworkStatus';

const ChatWelcome = lazy(() => import('./pages/ChatWelcome'));
const SignInPage = lazy(() => import('./pages/auth/SignInPage'));
const SignUpPage = lazy(() => import('./pages/auth/SignUpPage'));
const AuthCallback = lazy(() => import('./pages/auth/AuthCallback'));
const GalleryPage = lazy(() => import('./pages/gallery'));
const SharedProjectPage = lazy(() => import('./pages/share/SharedProject'));
const MyProjects = lazy(() => import('./pages/projects/MyProjects'));

const FloatingLines = lazy(() => import('./components/ui/FloatingLines'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

function WebGLBackground() {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1f1640_0%,#000_55%)]" />
    );
  }

  return (
    <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
      <FloatingLines
        enabledWaves={['top', 'middle', 'bottom']}
        lineCount={[10, 15, 20]}
        lineDistance={[8, 6, 4]}
        bendRadius={5.0}
        bendStrength={-0.5}
        interactive={true}
        parallax={true}
      />
    </Suspense>
  );
}

function WizardSessionTracker() {
  const currentStep = useBoltBuilderStore((s) => s.currentStep);
  const sessionStartedRef = useRef(false);

  // Start session tracking once on mount
  useEffect(() => {
    if (!sessionStartedRef.current) {
      startWizardSession();
      sessionStartedRef.current = true;
    }
  }, []);

  // Sync step tracking when step changes
  useEffect(() => {
    updateWizardStep(currentStep);
  }, [currentStep]);

  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <WizardSessionTracker />
        {/* Skip navigation links for accessibility */}
        <SkipLink href="#main-content">Skip to main content</SkipLink>
        <div className="min-h-screen bg-black overflow-hidden">
          {/* Floating Lines Background */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <WebGLBackground />
          </div>

          <div className="relative z-10">
            <Router>
              <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route
                  path="/chat"
                  element={
                    <Suspense fallback={<div className="min-h-screen bg-black" />}>
                      <ChatWelcome />
                    </Suspense>
                  }
                />
                <Route
                  path="/auth/sign-in"
                  element={
                    <Suspense fallback={<div className="min-h-screen bg-black" />}>
                      <SignInPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/auth/sign-up"
                  element={
                    <Suspense fallback={<div className="min-h-screen bg-black" />}>
                      <SignUpPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/auth/callback"
                  element={
                    <Suspense fallback={<div className="min-h-screen bg-black" />}>
                      <AuthCallback />
                    </Suspense>
                  }
                />
                <Route path="/wizard" element={<WizardLayout />} />
                {/* Convenience aliases for the common muscle-memory URLs so they
                    don't fall through to the catch-all wizard route. */}
                <Route path="/signin" element={<Navigate to="/auth/sign-in" replace />} />
                <Route path="/signup" element={<Navigate to="/auth/sign-up" replace />} />
                <Route path="/sign-in" element={<Navigate to="/auth/sign-in" replace />} />
                <Route path="/sign-up" element={<Navigate to="/auth/sign-up" replace />} />
                <Route
                  path="/projects"
                  element={
                    <Suspense fallback={<div className="min-h-screen bg-black" />}>
                      <MyProjects />
                    </Suspense>
                  }
                />
                <Route
                  path="/share/:projectId"
                  element={
                    <Suspense fallback={<div className="min-h-screen bg-black" />}>
                      <SharedProjectPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/gallery"
                  element={
                    <Suspense fallback={<div className="min-h-screen bg-black" />}>
                      <GalleryPage />
                    </Suspense>
                  }
                />
                <Route path="/*" element={<WizardLayout />} />
              </Routes>
            </Router>
          </div>

          {/* Network status indicator for mobile optimization */}
          <NetworkStatus />
        </div>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
