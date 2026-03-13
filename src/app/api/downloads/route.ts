import { NextRequest, NextResponse } from 'next/server';

// Mock download data - in production, this would come from a database or GitHub releases
const downloads = {
  versions: [
    {
      version: '3.0.2',
      releaseDate: '2026-02-15',
      releaseNotes: `
## Fortran² 3.0.2 - Patch Release

### Bug Fixes
- Fixed memory leak in symbolic differentiation
- Resolved performance regression in matrix operations
- Fixed crash when handling very large expressions

### Improvements
- Enhanced error messages for type mismatches
- Better support for nested differentiable blocks

### Dependencies
- Updated internal LLVM version to 18.1
      `.trim(),
      downloads: {
        linux: {
          x64: 'https://github.com/fortran-lang/fortran2/releases/download/v3.0.2/fortran2-3.0.2-linux-x64.tar.gz',
          arm64: 'https://github.com/fortran-lang/fortran2/releases/download/v3.0.2/fortran2-3.0.2-linux-arm64.tar.gz',
        },
        macos: {
          x64: 'https://github.com/fortran-lang/fortran2/releases/download/v3.0.2/fortran2-3.0.2-macos-x64.pkg',
          arm64: 'https://github.com/fortran-lang/fortran2/releases/download/v3.0.2/fortran2-3.0.2-macos-arm64.pkg',
        },
        windows: {
          x64: 'https://github.com/fortran-lang/fortran2/releases/download/v3.0.2/fortran2-3.0.2-windows-x64.msi',
        },
      },
      docker: 'fortranlang/fortran2:3.0.2',
      pip: 'fortran2==3.0.2',
      conda: 'fortran2=3.0.2',
      checksum: {
        linux_x64: 'sha256:abc123...',
        macos_arm64: 'sha256:def456...',
        windows_x64: 'sha256:ghi789...',
      },
    },
    {
      version: '3.0.1',
      releaseDate: '2025-12-10',
      releaseNotes: `
## Fortran² 3.0.1 - Patch Release

### Bug Fixes
- Fixed incorrect gradient computation in nested functions
- Resolved indexing issues in probabilistic modules

### Improvements
- Added support for Apple Silicon native builds
- Improved compilation speed by 15%
      `.trim(),
      downloads: {
        linux: {
          x64: 'https://github.com/fortran-lang/fortran2/releases/download/v3.0.1/fortran2-3.0.1-linux-x64.tar.gz',
          arm64: 'https://github.com/fortran-lang/fortran2/releases/download/v3.0.1/fortran2-3.0.1-linux-arm64.tar.gz',
        },
        macos: {
          x64: 'https://github.com/fortran-lang/fortran2/releases/download/v3.0.1/fortran2-3.0.1-macos-x64.pkg',
          arm64: 'https://github.com/fortran-lang/fortran2/releases/download/v3.0.1/fortran2-3.0.1-macos-arm64.pkg',
        },
        windows: {
          x64: 'https://github.com/fortran-lang/fortran2/releases/download/v3.0.1/fortran2-3.0.1-windows-x64.msi',
        },
      },
      docker: 'fortranlang/fortran2:3.0.1',
      pip: 'fortran2==3.0.1',
      conda: 'fortran2=3.0.1',
      checksum: {
        linux_x64: 'sha256:xyz123...',
      },
    },
    {
      version: '3.0.0',
      releaseDate: '2025-10-01',
      releaseNotes: `
## Fortran² 3.0.0 - Major Release

### New Features
- **Differentiable Programming**: Full support for automatic differentiation
- **Probabilistic Module**: Bayesian inference and stochastic methods
- **Enhanced Symbolic**: Improved symbolic computation capabilities
- **WebAssembly Support**: Run Fortran² in browsers

### Breaking Changes
- Migrated to new syntax for differentiable blocks
- Renamed probabilistic module functions

### Performance
- 2x faster matrix operations
- Reduced memory usage by 30%
- New JIT compilation for faster startup
      `.trim(),
      downloads: {
        linux: {
          x64: 'https://github.com/fortran-lang/fortran2/releases/download/v3.0.0/fortran2-3.0.0-linux-x64.tar.gz',
          arm64: 'https://github.com/fortran-lang/fortran2/releases/download/v3.0.0/fortran2-3.0.0-linux-arm64.tar.gz',
        },
        macos: {
          x64: 'https://github.com/fortran-lang/fortran2/releases/download/v3.0.0/fortran2-3.0.0-macos-x64.pkg',
          arm64: 'https://github.com/fortran-lang/fortran2/releases/download/v3.0.0/fortran2-3.0.0-macos-arm64.pkg',
        },
        windows: {
          x64: 'https://github.com/fortran-lang/fortran2/releases/download/v3.0.0/fortran2-3.0.0-windows-x64.msi',
        },
      },
      docker: 'fortranlang/fortran2:3.0.0',
      pip: 'fortran2==3.0.0',
      conda: 'fortran2=3.0.0',
      checksum: {
        linux_x64: 'sha256:old123...',
      },
    },
  ],
  latestVersion: '3.0.2',
  upcomingFeatures: [
    'GPU acceleration for differentiable programming',
    'Distributed computing support',
    'Enhanced IDE integration',
  ],
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const version = searchParams.get('version');
    const platform = searchParams.get('platform');
    const arch = searchParams.get('arch');

    // Return specific version if requested
    if (version) {
      const foundVersion = downloads.versions.find((v) => v.version === version);
      if (!foundVersion) {
        return NextResponse.json(
          { error: 'Version not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(foundVersion);
    }

    // Return download URLs for specific platform/arch
    if (platform && arch) {
      const latestVersion = downloads.versions[0];
      const platformDownloads = latestVersion.downloads[platform as keyof typeof latestVersion.downloads];
      
      if (!platformDownloads) {
        return NextResponse.json(
          { error: 'Platform not supported' },
          { status: 400 }
        );
      }

      const downloadUrl = platformDownloads[arch as keyof typeof platformDownloads];
      
      if (!downloadUrl) {
        return NextResponse.json(
          { error: 'Architecture not supported for this platform' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        version: latestVersion.version,
        url: downloadUrl,
        checksum: latestVersion.checksum[`${platform}_${arch}` as keyof typeof latestVersion.checksum],
      });
    }

    // Return all versions
    return NextResponse.json(downloads);
  } catch (error) {
    console.error('Downloads API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
