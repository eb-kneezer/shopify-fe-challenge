import { DisplayText } from "@shopify/polaris";
import Card from "../../Components/Card/Card";
import { ModalContentType } from "../../context";

const Favorites = () => {
  const faves = localStorage.getItem("nasaFaves");

  return (
    <div>
      <header>
        <div className='container'>
          <div className='brand__name'>
            <a href='/'>
              <DisplayText size='medium'>SPACESTAGRAM</DisplayText>
            </a>
          </div>

          <nav>
            <ul>
              <li>
                <a href='/'>Favorites</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div
        style={{ textAlign: "center", padding: "20px 0px" }}
        className='heading'>
        <DisplayText size='medium'>Favorites</DisplayText>
      </div>
      <section className='main__container'>
        {faves && JSON.parse(faves).length ? (
          JSON.parse(faves).map((fave: ModalContentType) => (
            <Card
              key={fave.id}
              id={fave.id}
              header={fave.header}
              mediaType={fave.mediaType}
              description={fave.description}
              mediaSrc={fave.mediaSrc}
              date={fave.date}
            />
          ))
        ) : (
          <DisplayText size='small'>you have no favorite images</DisplayText>
        )}
      </section>
    </div>
  );
};

export default Favorites;
