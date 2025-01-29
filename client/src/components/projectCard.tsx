interface Project {
  _id: string;
  image: string;
  projectName: string;
  author: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (

    <div className="projectCard bg-dark">
        <img className="projectImg" src={project.image} alt={project.projectName} />
        <h3 className="projectH3">{project.projectName}</h3>
        <p className="projectP">{project.author}</p>
    </div>
    );
}

export default ProjectCard;