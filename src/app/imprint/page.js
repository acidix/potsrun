export default async function Page() {
  return (
    <>
      {/* Start Page Banner Area */}
      <div
        className="page-banner-area"
        style={{
          height: "auto",
        }}
      >
        <div className="back-home">
          <a href="/">
            <i className="bx bxs-left-arrow-alt"></i> Back Home
          </a>
        </div>
      </div>

      {/* Start Blog Details Area */}
      <section id="blog" className="blog-details-area ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 offset-lg-2">
              <div className="blog-details-desc">
                <h1>Impressum</h1>

                <h2>Angaben gemäß § 5 TMG</h2>
                <p>
                  <strong>Mirko Seiffert</strong>
                  <br />
                  Zeppelinstraße 57
                  <br />
                  14471 Potsdam
                  <br />
                  Deutschland
                </p>

                <h2>Kontakt</h2>
                <p>
                  E-Mail:{" "}
                  <a href="mailto:kontakt@potsrun.de">kontakt@potsrun.de</a>
                </p>
                <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
                <p>
                  Mirko Seiffert
                  <br />
                  Zeppelinstraße 57, 14471 Potsdam
                </p>

                <h2>EU-Streitschlichtung</h2>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur
                  Online-Streitbeilegung (OS) bereit:
                  <br />
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                  .<br />
                  Meine E-Mail-Adresse finden Sie oben im Impressum.
                </p>

                <h2>Haftung für Inhalte</h2>
                <p>
                  Als Diensteanbieter bin ich gemäß § 7 Abs.1 TMG für eigene
                  Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                  verantwortlich. Nach §§ 8 bis 10 TMG bin ich als
                  Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                  gespeicherte fremde Informationen zu überwachen oder nach
                  Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                  hinweisen.
                </p>
                <p>
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                  Informationen nach den allgemeinen Gesetzen bleiben hiervon
                  unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
                  Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
                  möglich. Bei Bekanntwerden von entsprechenden
                  Rechtsverletzungen werde ich diese Inhalte umgehend entfernen.
                </p>

                <h2>Haftung für Links</h2>
                <p>
                  Mein Angebot enthält Links zu externen Websites Dritter, auf
                  deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für
                  diese fremden Inhalte auch keine Gewähr übernehmen. Für die
                  Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
                  oder Betreiber der Seiten verantwortlich. Die verlinkten
                  Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
                  Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
                  Zeitpunkt der Verlinkung nicht erkennbar.
                </p>
                <p>
                  Eine permanente inhaltliche Kontrolle der verlinkten Seiten
                  ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung
                  nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werde
                  ich derartige Links umgehend entfernen.
                </p>

                <h2>Urheberrecht</h2>
                <p>
                  Die durch mich erstellten Inhalte und Werke auf diesen Seiten
                  unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
                  Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb
                  der Grenzen des Urheberrechts bedürfen der schriftlichen
                  Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads
                  und Kopien dieser Seite sind nur für den privaten, nicht
                  kommerziellen Gebrauch gestattet.
                </p>
                <p>
                  Soweit die Inhalte auf dieser Seite nicht von mir erstellt
                  wurden, werden die Urheberrechte Dritter beachtet.
                  Insbesondere werden Inhalte Dritter als solche gekennzeichnet.
                  Sollten Sie trotzdem auf eine Urheberrechtsverletzung
                  aufmerksam werden, bitte ich um einen entsprechenden Hinweis.
                  Bei Bekanntwerden von Rechtsverletzungen werde ich derartige
                  Inhalte umgehend entfernen.
                </p>

                <p>
                  <strong>Stand:</strong> 17.10.2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
