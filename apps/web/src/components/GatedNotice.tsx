
export function GatedNotice({ message }: { message: string }) {
  return (
    <div className="gated-overlay">
      <div style={{ opacity: 0.3, pointerEvents: 'none' }}>
        {/* We will wrap content with this or just display a message */}
        <div style={{ padding: '2rem', border: '1px dashed #333' }}>
           {message}
        </div>
      </div>
    </div>
  );
}

