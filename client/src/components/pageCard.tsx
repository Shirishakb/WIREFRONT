interface Page {
    _id: string;
    image: string;
    pageName: string;
    width: number;
    height: number;
  }
  
  const PageCard = ({ page }: { page: Page }) => {
    if (!page.image) {
      page.image = "../public/placeholder2.png";
    }

    return (
      <div className="pageCard bg-dark">
          <img className="pageImg" src={page.image} alt={page.pageName} />
          <h3 className="pageH3">{page.pageName}</h3>
      </div>
      );
  }
  
  export default PageCard;