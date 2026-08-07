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
            backgroundColor: 'var(--color-surface)', 
            borderRadius: '16px',
            border: '1px solid var(--color-border)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ height: '200px', backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {project.imageUrl ? (
                <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ color: 'var(--color-text-secondary)' }}>No Image</span>
              )}
            </div>
            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: 'var(--color-primary)', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{project.category}</span>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{project.title}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', flex: 1 }}>{project.description}</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {project.detailsUrl && (
                  <a href={project.detailsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ textAlign: 'center', flex: 1, padding: '0.75rem 1rem' }}>
                    Project Details
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ textAlign: 'center', flex: 1, padding: '0.75rem 1rem' }}>
                    View Project
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
