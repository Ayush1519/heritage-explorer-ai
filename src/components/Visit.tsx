import { useEffect } from "react";

const EXTERNAL_URL =
  "https://deshdiscover.netlify.app/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRzdgP9nW1leHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAadz5U5B7NIeJ6Xi6gP9YswDfFyEu5_qK6ZmrQ4coVNaHyCkv-k2jp7y2GP3EA_aem_MGr2pvZjMZprozhsUSZdGw";

export default function Visit() {
  // Ensure page scroll is locked when viewing iframe
  useEffect(() => {
    const originalOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = originalOverflow;
    };
  }, []);

  // Render a full-page iframe that looks like a native page of this app.
  // We intentionally avoid showing the external domain or extra UI so it appears as part of the site.
  return (
    <div className="w-full h-screen bg-background -mt-40">
      <div className="h-14 flex items-center px-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-heritage flex items-center justify-center text-white">🌐</div>
          <div>
            <p className="font-semibold">Explore</p>
            <p className="text-xs text-muted-foreground">Interactive content</p>
          </div>
        </div>
      </div>

      <iframe
        title="DeshDiscover"
        src={EXTERNAL_URL}
        className="w-full h-[calc(100vh-56px)] border-0"
        sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
}
