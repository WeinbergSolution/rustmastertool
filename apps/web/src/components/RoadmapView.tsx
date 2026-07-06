import { Lock } from 'lucide-react';

interface RoadmapViewProps {
  title: string;
  message: string;
}

export function RoadmapView({ title, message }: RoadmapViewProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      padding: '4rem 2rem',
      textAlign: 'center',
      backgroundColor: 'var(--bg-panel)',
      borderRadius: '8px',
      border: '1px dashed var(--border-color)',
      color: 'var(--text-muted)'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: 'rgba(205, 65, 43, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        color: 'var(--accent-rust)'
      }}>
        <Lock size={32} />
      </div>
      
      <h2 style={{
        margin: '0 0 1rem 0',
        color: 'var(--text-primary)',
        fontSize: '1.5rem'
      }}>
        {title}
      </h2>
      
      <p style={{
        margin: 0,
        maxWidth: '500px',
        lineHeight: '1.6',
        fontSize: '1rem'
      }}>
        {message}
      </p>
      
      <div style={{ marginTop: '2rem' }}>
        <span className="badge" style={{ backgroundColor: 'var(--accent-rust)' }}>
          Roadmap Phase 1.5
        </span>
      </div>
    </div>
  );
}
