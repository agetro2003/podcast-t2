/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { SheetContext } from "../context/SheetContext";
import Loading from "./Loading";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import Style from "./TestimonialSlider.module.css";

function Testimonial({ name, picture, title, message }) {
  return (
    <div className={Style.stretch}>
      <div className={Style.mask}>
        <img className={Style.image} src={picture} />
      </div>
      <div className={`card ${Style.testimonial} ${Style.flex}`}>
        <div>
          <h3 className="title">{name}</h3>
          <p className={`textGradient ${Style.title}`}>{title}</p>
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [showTest, setShowTest] = useState([]);
  const {
    language,
    podcasters: { data, loading },
  } = useContext(SheetContext);

  useEffect(() => {
    if (data && data.error) setError(data.error);
    if (data && !data.error) {
      console.log(data[0].language);
      console.log(language);
      console.log(data[0].language === language);
      const filteredData = data.filter((item) => item.language === language);
      console.log(filteredData);
      setTestimonials(
        filteredData.map((client, index) => ({
          id: index,
          name: client.name,
          picture: client.picture,
          title: client.reviewTitle,
          message: client.reviewMessage,
        }))
      );
      console.log(testimonials);
    }
  }, [data, language]);

  const handlePrev = () => {
    setIndex(index === 0 ? testimonials.length - 3 : index - 1);
  };

  const handleNext = () => {
    setIndex((index + 1) % (testimonials.length - 2));
  };

  if (loading) return <Loading />;
  if (error) return <h1>{error}</h1>;

  return (
    <section className={Style.bgDark}>
      <div className={`container padding-y ${Style.flex}`} id="testimonials">
        <h2 className="title">Reseñas de clientes</h2>
        <div className={Style.slider}>
          <button className={Style.sliderBtn} onClick={handlePrev}>
            <FaAngleLeft className={Style.arrow} />
          </button>
          {testimonials.slice(index, index + 3).map((testimonial) => (
            <Testimonial key={testimonial.id} {...testimonial} />
          ))}
          <button className={Style.sliderBtn} onClick={handleNext}>
            <FaAngleRight className={Style.arrow} />
          </button>
        </div>
      </div>
    </section>
  );
}
