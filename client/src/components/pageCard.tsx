interface Page {
    _id: string;
    image: string;
    name: string;
    width: number;
    height: number;
  }
  
  const PageCard = ({ page }: { page: Page }) => {
    return (
      <div className="project-card">
          <img src={page.image} alt={page.name} />
          <h3>{page.name}</h3>
      </div>
      );
  }
  
  export default PageCard;