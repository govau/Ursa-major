import React from "react";

interface Props {
  children: React.ReactElement;
  alt?: Boolean;
  imgClickUrl: string;
  imgUrl: string;
  imgAlt: string;
  imgCaption: string;
}

const Hero: React.FC<Props> = ({
  children,
  imgClickUrl,
  imgUrl,
  imgAlt,
  imgCaption,
  alt = false,
}) => {
  return (
    <div className={`au-body ${alt ? "au-body--alt" : ""}`}>
      <section className="container-fluid">
        <div className="row">
          <div className="col-sm-6 col-xs-12">
            <div className="content">{children}</div>
          </div>

          <div className="col-md-6 col-xs-12">
            <figure className="hero-image">
              <a href={imgClickUrl}>
                <img
                  className="au-responsive-media-img"
                  src={imgUrl}
                  alt={imgAlt}
                />
              </a>
              <figcaption className="hero-image__caption">
                {imgCaption}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
