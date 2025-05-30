import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
// cn utility might be used if this component itself had conditional styling, but not for now.
// import { cn } from '@/lib/utils'; 

interface MainAppLayoutProps {
  children: React.ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        {/* Main content area configuration based on Layout Requirements */}
        {/* - pt-[70px]: Account for fixed Header height */}
        {/* - pl-64: Account for fixed Left Sidebar width */}
        {/* - pr-0 md:pr-72: Account for fixed Right Sidebar width on medium screens and up */}
        {/* - bg-background: Specified background color */}
        <main className="flex-1 pt-[70px] pl-64 pr-0 md:pr-72 bg-background">
          {/* Inner div for padding as per mainContent.layout.p-4 */}
          {/* min-h-[calc(100vh-70px)] ensures this area can fill screen height below header */}
          <div className="p-4 min-h-[calc(100vh-70px)]">
            {children}
          </div>
        </main>
        {/* Right Sidebar Area */}
        {/* - hidden md:block: Show only on medium screens and up, common responsive pattern */}
        {/* - fixed top-[70px] right-0: Positioning below header, fixed to right */}
        {/* - w-72: Specified width */}
        {/* - h-[calc(100vh-70px)]: Full height below header */}
        {/* - overflow-y-auto: Scroll content within right sidebar */}
        {/* - p-4: Padding */}
        {/* - border-l: Visual separation */}
        {/* - bg-background: Match main content area's background for the container */}
        <aside className="hidden md:block fixed top-[70px] right-0 w-72 h-[calc(100vh-70px)] overflow-y-auto p-4 border-l border-border bg-background">
          <div className="space-y-4">
            {/* Placeholder content mimicking Facebook's right sidebar components */}
            <div className="bg-card p-3 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-sm text-card-foreground">Stories</h3>
                <div className="space-x-1">
                    <button className="text-xs text-primary hover:underline">Archive</button>
                    <span className="text-xs text-muted-foreground">·</span>
                    <button className="text-xs text-primary hover:underline">Settings</button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Your friends' stories and updates will appear here. Add your own!</p>
              {/* In a real app, <StoriesSection /> component would be rendered here */}
            </div>
            <div className="bg-card p-3 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-sm text-card-foreground">Suggested Groups</h3>
                    <button className="text-xs text-primary hover:underline">See All</button>
                </div>
              <p className="text-xs text-muted-foreground">Discover new communities and groups based on your interests.</p>
              {/* In a real app, <SuggestedGroups /> component would be rendered here */}
            </div>
            {/* Other right sidebar content like contacts/chat might go here */}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default MainAppLayout;
