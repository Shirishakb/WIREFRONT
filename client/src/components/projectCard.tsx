interface Project {
  image: string;
  name: string;
  author: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="project-card">
        <img src={project.image} alt={project.name} />
        <h3>{project.name}</h3>
        <p>{project.author}</p>
    </div>
    );
}

export default ProjectCard;