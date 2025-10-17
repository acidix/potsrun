"use client";

import React from "react";
import Image from "next/image";

const Products = () => {
  return (
    <>
      <style jsx>{`
        /* Hide paragraphs by default on desktop */
        @media (min-width: 768px) {
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
        
        /* Mobile styles - always show paragraphs with muted background */
        @media (max-width: 767px) {
          .single-products-box::before {
            opacity: 0.8;
          }
          
          .single-products-box .content p {
            display: block;
          }
        }
      `}</style>
      <section id="shop" className="products-area pt-100 pb-70">
        <div className="container">
          <div className="section-title">
            <h2>Lauf mit uns - Werde Teil von PotsRun!</h2>
            <p>
              Du möchtest endlich mit dem Laufen anfangen oder suchst eine
              motivierende Gruppe, die dich auf deinem Weg begleitet? Dann bist
              du bei PotsRun genau richtig! Egal, ob du gerade erst deine ersten
              Kilometer wagst oder schon Erfahrung hast - in unserer
              Laufgemeinschaft in Potsdam findest du Gleichgesinnte, die dich
              unterstützen, anspornen und mit dir gemeinsam an deinen Zielen
              arbeiten. Bei uns zählt nicht die Geschwindigkeit, sondern die
              Freude an der Bewegung und das gemeinsame Erleben.
            </p>
            <p>
              Mach den ersten Schritt und schließ dich uns an - wir freuen uns
              auf dich! Schreib uns einfach oder komm direkt zu einem unserer
              Lauftreffs. Deine neuen Laufbuddys warten auf dich!
            </p>
            <p>#PotsRun #LaufenInPotsdam #GemeinsamStärker</p>
          </div>

          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="single-products-box">
                <Image
                  src="/images/potsrun/products/footb-product1.jpg"
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

            <div className="col-lg-3 col-sm-6">
              <div className="single-products-box">
                <Image
                  src="/images/potsrun/products/footb-product2.jpg"
                  alt="image"
                  width={750}
                  height={1000}
                />

                <div className="content">
                  <h3>Warum wir?</h3>
                  <p>
                    Wir laufen in einem entspannten Tempo, das sich an die
                    Gruppe anpasst. Warum noch allein laufen, wenn es zusammen
                    so viel mehr Spaß macht? Komm vorbei und spüre die Energie
                    der Gemeinschaft. Deine nächsten Schritte starten hier!
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="single-products-box">
                <Image
                  src="/images/potsrun/products/footb-product3.jpg"
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

            <div className="col-lg-3 col-sm-6">
              <div className="single-products-box">
                <Image
                  src="/images/potsrun/products/footb-product4.jpg"
                  alt="image"
                  width={750}
                  height={1000}
                />

                <div className="content">
                  <h3>Kontakt</h3>
                  <p>
                    Du möchtest bei uns mitlaufen oder hast Fragen? Egal, ob per
                    Mail, Social Media oder persönlich beim Lauf – wir freuen
                    uns, dich kennenzulernen. Lauf mit uns los!
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
