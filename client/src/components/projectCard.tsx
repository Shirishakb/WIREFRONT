interface Project {
  _id: string;
  image: string;
  projectName: string;
  author: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="project-card">
        <img src={project.image} alt={project.projectName} />
        <h3>{project.projectName}</h3>
        <p>{project.author}</p>
    </div>
    );
}

export default ProjectCard;