import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Projects() {
  const projects = await prisma.project.findMany();
  
  if (projects.length === 0) return null;

  return (
    <section id="projects" className="section container">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>FEATURED PROJECTS</h2>
        <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--color-primary)', margin: '0 auto' }}></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {projects.map(project => (
          <div key={project.id} style={{ 
            backgroundColor: 'rgba(255,255,255,0.05)', 
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ height: '200px', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {project.imageUrl ? (
                <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ color: '#888' }}>No Image</span>
              )}
            </div>
            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: 'var(--color-primary)', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{project.category}</span>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{project.title}</h3>
              <p style={{ color: '#e2e8f0', fontSize: '0.9rem', marginBottom: '2rem', flex: 1 }}>{project.description}</p>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ textAlign: 'center' }}>
                  View Project Instance
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
