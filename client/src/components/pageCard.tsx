interface Page {
    _id: string;
    image: string;
    name: string;
    width: number;
    height: number;
  }
  
  const PageCard = ({ page }: { page: Page }) => {
    console.log('pageImg', page.image);
    return (
      <div className="pageCard bg-dark">
          <img className="pageImg" src={page.image} alt={page.name} />
          <h3 className="pageH3">{page.name}</h3>
      </div>
      );
  }
  
  export default PageCard;