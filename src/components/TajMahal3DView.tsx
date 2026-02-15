import { motion } from "framer-motion";
import { Eye } from "lucide-react";

interface Heritage3DViewProps {
  title: string;
  embedUrl: string;
  description: string;
  height?: string;
  instructions?: string;
}

export function Heritage3DView({
  title,
  embedUrl,
  description,
  height = "h-96",
  instructions = "🎯 Use your mouse to explore • Scroll to zoom • Drag to pan the view",
}: Heritage3DViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl overflow-hidden border border-border bg-muted flex flex-col ${height}`}
    >
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-800 relative">
        {/* 3D/Panorama View Embed */}
        <iframe
          title={title}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          src={embedUrl}
          allowFullScreen
        />
      </div>

      {/* Fallback if embed doesn't work */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900/90 to-blue-800/90 text-white opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
        <Eye className="w-12 h-12 mb-3" />
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-sm text-blue-200">{description}</p>
        <a
          href={embedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 px-4 py-2 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-100 transition pointer-events-auto"
        >
          Open Full View
        </a>
      </div>
    </motion.div>
  );
}

// Legacy component for backward compatibility
interface TajMahal3DViewProps {
  height?: string;
}

export function TajMahal3DView({ height = "h-96" }: TajMahal3DViewProps) {
  return (
    <Heritage3DView
      title="Taj Mahal 3D View"
      embedUrl="https://share.google/rcuNF56k8WFiiJyOK"
      description="Explore the iconic monument in 3D"
      height={height}
    />
  );
}

