import { useStore } from './store/useStore';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { CourseView } from './components/CourseView';
import { ReferenceView } from './components/ReferenceView';
import { TestsView } from './components/TestsView';
import { SettingsModal } from './components/SettingsModal';
import { CelebrationLayer } from './components/CelebrationLayer';
import { layout } from './styles/tokens';

export default function App() {
  const view = useStore((s) => s.view);
  const settingsOpen = useStore((s) => s.settingsOpen);

  return (
    <div className="grid h-screen" style={{ gridTemplateRows: `${layout.headerHeight} 1fr` }}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <div
        className="grid overflow-hidden"
        style={{ gridTemplateColumns: `${layout.sidebarWidth} 1fr` }}
      >
        <Sidebar />
        <main
          id="main-content"
          tabIndex={-1}
          className="overflow-y-auto bg-bg focus:outline-none"
        >
          {view === 'home' && <HomeView />}
          {view === 'course' && <CourseView />}
          {view === 'reference' && <ReferenceView />}
          {view === 'tests' && <TestsView />}
        </main>
      </div>
      {settingsOpen && <SettingsModal />}
      <CelebrationLayer />
    </div>
  );
}