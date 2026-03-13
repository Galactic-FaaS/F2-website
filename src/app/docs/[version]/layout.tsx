'use client';

import { VersionSelector, Sidebar } from '@/components/docs';
import { useParams } from 'next/navigation';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const version = params.version as string || 'v3.0';

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar currentVersion={version} />
      
      {/* Main content area */}
      <div className="flex-1 md:pl-72">
        {/* Top bar with version selector */}
        <div className="sticky top-16 z-30 flex h-16 items-center gap-4 border-b border-border-dark bg-deep-space/80 px-6 backdrop-blur-sm">
          <VersionSelector currentVersion={version} />
        </div>
        
        {/* Page content */}
        {children}
      </div>
    </div>
  );
}