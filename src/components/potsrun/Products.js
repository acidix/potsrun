"use client";

import React from "react";
import Image from "next/image";

const Products = () => {
  return (
    <>
      <style jsx>{`
        @media (min-width: 1300px) {
          .custom-col {
            flex: 0 0 25%;
            max-width: 25%;
          }
          .single-products-box .content p {
            display: none;
            transition: all 0.3s ease;
          }

          .single-products-box:hover .content p {
            display: block;
          }

          .single-products-box:hover::before {
            opacity: 0.8;
          }
        }
        @media (min-width: 768px) and (max-width: 1299px) {
          .custom-col {
            flex: 0 0 50%;
            max-width: 50%;
          }
        }
        @media (max-width: 767px) {
          .custom-col {
            flex: 0 0 100%;
            max-width: 100%;
          }
          .single-products-box .content p {
            display: block;
          }
          .single-products-box img {
            height: auto !important;
          }
        }
      `}</style>
      <section id="shop" className="products-area pt-100 pb-70">
        <div className="container">
          <div className="section-title">
            <h2>
              <span style={{ color: "#1f9ed9" }}>Lauf mit uns</span> - Werde
              Teil von PotsRun!
            </h2>
            <p>
              Du möchtest endlich mit dem Laufen anfangen oder suchst eine
              motivierende Gruppe, die dich auf deinem Weg begleitet? Dann bist
              du bei PotsRun genau richtig!
            </p>
            <p>
              Mach den ersten Schritt und schließ dich uns an - wir freuen uns
              auf dich! Schreib uns einfach oder komm direkt zu einem unserer
              Lauftreffs - die Teilnahme ist kostenfrei. Deine neuen Laufbuddys
              warten auf dich!
            </p>
            <p style={{ color: "#1f9ed9" }}>
              #PotsRun #RunTogether #LaufenInPotsdam
            </p>
          </div>

          <div className="row">
            <div className="custom-col">
              <div className="single-products-box">
                <Image
                  src="/images/potsrun/products/potsrun1.jpg"
                  alt="image"
                  width={750}
                  height={1000}
                />

                <div className="content">
                  <h3>Für wen?</h3>
                  <p>
                    Egal ob du gerade erst deine ersten Kilometer wagst oder
                    schon Erfahrungen hast – in unserer Laufgemeinschaft in
                    Potsdam findest du Gleichgesinnte, die dich unterstützen,
                    anspornen und mit dir gemeinsam an deinen Zielen arbeiten.
                    Bei uns zählt nicht die Geschwindigkeit, sondern die Freude
                    an der Bewegung und das gemeinsame Erleben!
                  </p>
                </div>
              </div>
            </div>

            <div className="custom-col">
              <div className="single-products-box">
                <Image
                  src="/images/potsrun/products/potsrun2.jpg"
                  alt="image"
                  width={750}
                  height={1000}
                />

                <div className="content">
                  <h3>Warum wir?</h3>
                  <p>
                    Wir laufen in einem entspannten Tempo (Pace 6:10 - 6:30),
                    das sich an die Gruppe anpasst. Warum noch allein laufen,
                    wenn es zusammen so viel mehr Spaß macht? Komm vorbei und
                    spüre die Energie der Gemeinschaft. Deine nächsten Schritte
                    starten hier!
                  </p>
                </div>
              </div>
            </div>

            <div className="custom-col">
              <div className="single-products-box">
                <Image
                  src="/images/potsrun/products/potsrun3.jpg"
                  alt="image"
                  width={750}
                  height={1000}
                />

                <div className="content">
                  <h3>Wann und Wo?</h3>
                  <p>
                    Jeden Donnerstag um 19 Uhr findest du uns entweder in
                    Babelsberg auf dem Weberplatz, am Dampfmaschinenhaus in der
                    Breiten Straße, vor der BioCompany an der Schiffbauergasse
                    oder bei unserem Kooperationspartner dem Laufladen
                    Meilenweit. Nie mehr allein laufen, dank unseres Netzwerkes!
                  </p>
                </div>
              </div>
            </div>

            <div className="custom-col">
              <div className="single-products-box">
                <Image
                  src="/images/potsrun/products/potsrun4.jpg"
                  alt="image"
                  width={750}
                  height={1000}
                />

                <div className="content">
                  <h3>Kontakt</h3>
                  <p>
                    Du möchtest bei uns mitlaufen oder hast Fragen? Egal, ob per{" "}
                    <a href="mailto:info@potsrun.de">Mail</a>,{" "}
                    <a
                      href="https://www.instagram.com/potsrun/?hl=de"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Social Media
                    </a>{" "}
                    oder persönlich beim Lauf – wir freuen uns, dich
                    kennenzulernen. Lauf mit uns los!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
