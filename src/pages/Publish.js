import { useState } from "react";
import axios from "axios";

const PostAd = ({ token, toggleLoginForm, toggle }) => {
  const [isPictureSending, setIsPictureSending] = useState(false);
  const [data, setData] = useState(null);
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState(null);
  const [describe, setDescribe] = useState(null);
  const [brand, setBrand] = useState(null);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [state, setState] = useState(null);
  const [location, setLocation] = useState(null);
  const [price, setPrice] = useState(null);

  const handleSendPicture = async (event) => {
    event.preventDefault();
    setIsPictureSending(true);

    //Je viens créer mon formData qui contiendra les infos à transmettre au serveur
    const formData = new FormData();
    formData.append("picture", picture);
    formData.append("title", title);
    formData.append("describe", describe);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("state", state);
    formData.append("location", location);
    formData.append("price", price);

    //je viens transmettre mon formData au serveur express
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setData(response.data);
      setIsPictureSending(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  return token ? (
    <div className="publish-main">
      <div className="publish-container">
        <h2>Vends ton article</h2>
        <form onSubmit={handleSendPicture}>
          <div className="file-select">
            <div className="file-button">
              {isPictureSending === true ? (
                <h1>Image en cours d'uplaod</h1>
              ) : (
                data && (
                  <img
                    src={data.secure_url}
                    style={{ width: "200px" }}
                    alt=""
                  />
                )
              )}
              <label htmlFor="file" className="label-file">
                <span className="input-sign">+</span>
                <span>Ajoute une photo</span>
              </label>
              <input
                value={picture}
                onChange={(event) => {
                  setPicture(event.target.files[0]);
                }}
                type="file"
                className="input-file"
              />
            </div>
          </div>
          <div className="text-input-section">
            <div className="text-input">
              <h4>Titre</h4>
              <input
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                type="text"
                placeholder="ex : Chemise Sézane verte"
              />
            </div>
            <div className="text-input">
              <h4>Décris ton article</h4>
              <textarea
                value={describe}
                name="description"
                rows="5"
                placeholder="ex : Porté quelquesfois, taille correctement..."
                onChange={(event) => {
                  setDescribe(event.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="text-input-section">
            <div className="text-input">
              <h4>Marque</h4>
              <input
                value={brand}
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
                type="text"
                placeholder="ex : Zara"
              />
            </div>
            <div className="text-input">
              <h4>Taille</h4>
              <input
                value={size}
                onChange={(event) => {
                  setSize(event.target.value);
                }}
                type="text"
                placeholder="ex : L / 40 / 12"
              />
            </div>
            <div className="text-input">
              <h4>Couleur</h4>
              <input
                value={color}
                onChange={(event) => {
                  setColor(event.target.value);
                }}
                type="text"
                placeholder="ex : Fushia"
              />
            </div>
            <div className="text-input">
              <h4>Etat</h4>
              <input
                value={state}
                onChange={(event) => {
                  setState(event.target.value);
                }}
                type="text"
                placeholder="ex : Neuf avec étiquette"
              />
            </div>
            <div className="text-input">
              <h4>Lieu</h4>
              <input
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
                type="text"
                placeholder="ex : Paris"
              />
            </div>
          </div>
          <div className="text-input-section">
            <div className="text-input">
              <h4>Prix</h4>
              <div className="checkbox-section">
                <input
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                  type="text"
                  id="price"
                  placeholder="0,00€"
                ></input>
                <div className="checkbox-input">
                  <label for="exchange" className="checkbox-design"></label>
                  <input
                    type="checkbox"
                    name="exchange"
                    id="exchange"
                    value="exchange"
                  ></input>
                  <span>Je suis interressé.e par les échanges</span>
                </div>
              </div>
            </div>
          </div>
          <div className="button-publish">
            <button type="submit" className="form-validation">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <p>Hello</p>
  );
};

export default PostAd;
