import { prisma } from '@/lib/prisma';
import ProjectCard from './ProjectCard';

export default async function Projects({ projects: propProjects }) {
  const projects = propProjects !== undefined ? propProjects : await prisma.project.findMany();
  
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="section container">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textTransform: 'uppercase' }}>FEATURED PROJECTS</h2>
        <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--color-primary)', margin: '0 auto' }}></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
