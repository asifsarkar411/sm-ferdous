import { prisma } from '@/lib/prisma';
import ProjectCard from './ProjectCard';

export default async function Projects({ projects: propProjects }) {
  const projects = propProjects !== undefined ? propProjects : await prisma.project.findMany().catch(() => []);
  
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="section container">
      <div className="section-header">
        <h2 className="section-title">Featured Projects</h2>
        <div className="section-divider"></div>
        <p className="section-subtitle">Real-world applications, frontend architectures, and IoT engineering solutions.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
