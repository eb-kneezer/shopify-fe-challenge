import { DisplayText, Heading } from "@shopify/polaris";
import { useState } from "react";
import { useHistory } from "react-router";
import logo from "../../Assets/nasa-logo.svg";

import "./landing.scss";

const Landing = () => {
  const [value, setValue] = useState("");
  const history = useHistory();

  return (
    <div className='landing'>
      <div className='landing__left'></div>
      <div className='landing__right'>
        <div className='landing__content'>
          <div className='landing__right--header'>
            <DisplayText size='extraLarge'>SPACESTAGRAM</DisplayText>
          </div>
          <div className='landing__right--description'>
            <Heading>Image sharing from the final frontier</Heading>
          </div>
          <div className='landing__right--search'>
            <form
              onSubmit={e => {
                e.preventDefault();
                history.push(`listings/${value}`);
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
        </div>
        <div className='landing__info'>
          <div className='landing__info--image'>
            <img src={logo} alt='nasa-logo' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
