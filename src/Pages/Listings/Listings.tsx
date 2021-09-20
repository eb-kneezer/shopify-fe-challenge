import { DisplayText } from "@shopify/polaris";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import Card from "../../Components/Card/Card";
import Modal from "../../Components/Modal/Modal";

import Loader from "react-loader-spinner";
import "./listings.scss";

const Listings = () => {
  const [value, setValue] = useState("");

  const history = useHistory();

  let { query } = useParams<{ query: string }>();
  console.log(query);

  // console.log(isLoading, data.collection.items);

  const { isLoading, data } = useQuery("nasaQuery", () => {
    return fetch(`https://images-api.nasa.gov/search?q=${query}`).then(
      response => response.json()
    );
  });
  useEffect(() => {}, []);

  return (
    <div className='listings'>
      <Modal />
      <header>
        <div className='container'>
          <div className='brand__name'>
            <DisplayText size='medium'>SPACESTAGRAM</DisplayText>
          </div>

          <nav>
            <ul>
              <li>
                <a href='/'>Favorites</a>
              </li>
              <li>
                <a href='/'>Go Home</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <section className='controls'>
        <div className='input-container'>
          <form
            onSubmit={e => {
              history.push(`/listings/${value}`);
              setValue("");
            }}
            style={{ width: "100%", display: "flex", alignItems: "center" }}>
            <input
              onChange={e => setValue(e.target.value)}
              value={value}
              type='text'
              placeholder='what are you looking for?'
            />
            <button>
              <i className='fas fa-satellite-dish'></i>
            </button>
          </form>
        </div>
      </section>
      <main>
        {data ? (
          <div className='main__container'>
            {data.collection.items
              .filter((datum: any) => datum.data[0].media_type === "image")
              .map((datum: any) => (
                <Card
                  key={datum.data[0].nasa_id}
                  id={datum.data[0].nasa_id}
                  header={datum.data[0].title}
                  mediaType={datum.data[0].media_type}
                  description={datum.data[0].description}
                  mediaSrc={datum.links[0].href}
                  date={datum.data[0].date_created}
                />
              ))}
          </div>
        ) : isLoading ? (
          <div className='loader__container'>
            <Loader color='#000' type='BallTriangle' />
          </div>
        ) : (
          <div className='loader__container'>
            <h1>Houston, we have a problem.</h1>
          </div>
        )}
      </main>
      <footer></footer>
    </div>
  );
};

export default Listings;
