interface Project {
  _id: string;
  image: string;
  name: string;
  author: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="projectCard bg-dark">
        <img className="projectImg" src={project.image} alt={project.name} />
        <h3 className="projectH3">{project.name}</h3>
        <p className="projectP">{project.author}</p>
    </div>
    );
}

export default ProjectCard;