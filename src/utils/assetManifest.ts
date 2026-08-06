interface AssetManifest {
  name?: string;
  version?: string;
  basePath?: string;
  assets: Record<string, string>;
}

let cachedManifest: AssetManifest | null = null;
let manifestFetchPromise: Promise<AssetManifest | null> | null = null;

export const loadAssetManifest = async (): Promise<AssetManifest | null> => {
  if (cachedManifest) return cachedManifest;
  if (manifestFetchPromise) return manifestFetchPromise;

  manifestFetchPromise = fetch('/asset-manifest.json')
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data: AssetManifest) => {
      cachedManifest = data;
      return data;
    })
    .catch((err) => {
      console.warn('[AssetManifest] Could not load /asset-manifest.json:', err);
      return null;
    });

  return manifestFetchPromise;
};

export const resolveManifestAsset = (rawSrc: string): string => {
  if (!rawSrc) return '/images/igaf-logo.jpg';
  
  // If cached manifest exists, check exact or partial key match
  if (cachedManifest && cachedManifest.assets) {
    const rawLower = rawSrc.toLowerCase();
    for (const [key, path] of Object.entries(cachedManifest.assets)) {
      if (rawLower.includes(key.toLowerCase())) {
        return path;
      }
    }
  }

  // Standardized fallback paths
  const filename = rawSrc.split('/').pop() || '';
  const clean = filename.split('?')[0].split('#')[0].toLowerCase();

  if (clean.includes('rice')) return '/images/rice-mill.jpg';
  if (clean.includes('grinding')) return '/images/grinding-machine.jpg';
  if (clean.includes('chaff')) return '/images/chaff-cutter.jpg';
  if (clean.includes('hammer')) return '/images/hammer-mill.jpg';
  if (clean.includes('garri')) return '/images/garri-processing.jpg';
  if (clean.includes('water')) return '/images/water-pump.jpg';
  if (clean.includes('tiller') || clean.includes('power')) return '/images/power-tiller.jpg';
  if (clean.includes('destoner') || clean.includes('grain')) return '/images/grain-destoner.jpg';
  if (clean.includes('maize') || clean.includes('sheller')) return '/images/maize-sheller.jpg';
  if (clean.includes('spare') || clean.includes('parts')) return '/images/spare-parts.jpg';
  if (clean.includes('igaf') || clean.includes('logo')) return '/images/igaf-logo.jpg';

  return clean ? `/images/${clean}` : '/images/igaf-logo.jpg';
};
