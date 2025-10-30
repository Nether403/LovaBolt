import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BoltBuilderProvider } from './contexts/BoltBuilderContext';
import ErrorBoundary from './components/ErrorBoundary';
import WelcomePage from './components/WelcomePage';
import WizardLayout from './components/WizardLayout';

function App() {
  return (
    <ErrorBoundary>
      <BoltBuilderProvider>
      <div className="min-h-screen bg-black overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.2)_0%,transparent_70%)] pointer-events-none" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-element top-[15%] left-[20%] transform-gpu rotate-45 hover:rotate-90 transition-transform duration-1000" 
               style={{animationDelay: '-2.5s', animationDuration: '14s'}}>
            <div className="w-32 h-32 text-blue-500/60 animate-float-slow">
              <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
                <path d="m3.3 7 8.7 5 8.7-5"/>
                <path d="M12 22V12"/>
              </svg>
            </div>
          </div>
          
          <div className="floating-element bottom-[20%] right-[15%] transform-gpu -rotate-12 hover:rotate-45 transition-transform duration-1000"
               style={{animationDelay: '-4s', animationDuration: '18s'}}>
            <div className="w-40 h-40 text-purple-500/60 animate-float-medium">
              <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"/>
                <path d="m7 16.5-4.74-2.85"/>
                <path d="m7 16.5 5-3"/>
                <path d="M7 16.5v5.17"/>
                <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"/>
                <path d="m17 16.5-5-3"/>
                <path d="m17 16.5 4.74-2.85"/>
                <path d="M17 16.5v5.17"/>
                <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"/>
                <path d="M12 8 7.26 5.15"/>
                <path d="m12 8 4.74-2.85"/>
                <path d="M12 13.5V8"/>
              </svg>
            </div>
          </div>
          
          <div className="floating-element top-[40%] right-[25%] transform-gpu rotate-12 hover:-rotate-45 transition-transform duration-1000"
               style={{animationDelay: '-1s', animationDuration: '16s'}}>
            <div className="w-28 h-28 text-teal-500/60 animate-float-fast">
              <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              </svg>
            </div>
          </div>
          
          <div className="floating-element bottom-[30%] left-[25%] transform-gpu -rotate-45 hover:rotate-90 transition-transform duration-1000"
               style={{animationDelay: '-3.5s', animationDuration: '15s'}}>
            <div className="w-24 h-24 text-pink-500/60 animate-float-slow">
              <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
              </svg>
            </div>
          </div>
          
          <div className="floating-element top-[25%] right-[20%] transform-gpu hover:scale-110 transition-transform duration-1000"
               style={{animationDelay: '-5s', animationDuration: '17s'}}>
            <div className="w-20 h-20 text-yellow-500/60 animate-pulse">
              <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
              </svg>
            </div>
          </div>
          
          {/* Gradient Orbs */}
          <div className="floating-element top-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-2xl animate-float-slow"
               style={{animationDelay: '-2s', animationDuration: '20s'}} />
          <div className="floating-element top-3/4 right-1/4 w-64 h-64 bg-gradient-to-br from-teal-500/30 to-blue-500/30 rounded-full blur-2xl animate-float-medium"
               style={{animationDelay: '-6s', animationDuration: '19s'}} />
          <div className="floating-element top-1/2 right-1/3 w-40 h-40 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-2xl animate-float-fast"
               style={{animationDelay: '-4.5s', animationDuration: '21s'}} />
        </div>

        <div className="relative z-10">
          <Router>
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/wizard" element={<WizardLayout />} />
              <Route path="/*" element={<WizardLayout />} />
            </Routes>
          </Router>
        </div>
      </div>
    </BoltBuilderProvider>
    </ErrorBoundary>
  );
}

export default App;