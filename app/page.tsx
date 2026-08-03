"use client";

import Image from "next/image";
import {
  ChangeEvent,
  FormEvent,
  useMemo,
  useRef,
  useState,
} from "react";

import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

const PHONE_DISPLAY = "07 67 32 27 04";
const PHONE_LINK = "+33767322704";
const EMAIL = "girardplomberie@gmail.com";

const serviceGroups = [
  {
    index: "01",
    title: "Fuites & dépannage sanitaire",
    summary:
      "Recherche du problème, réparation et remise en service des équipements du quotidien.",
    items: [
      "Recherche et réparation de fuite",
      "Réparation de tuyauterie",
      "Dépannage sanitaire",
      "Réparation de WC, douche et robinetterie",
      "Plomberie extérieure",
    ],
  },
  {
    index: "02",
    title: "Débouchage & évacuations",
    summary:
      "Intervention sur les évacuations lentes ou bouchées, avec la méthode adaptée à la situation.",
    items: [
      "Débouchage d’évier ou de douche",
      "Débouchage de canalisation",
      "Dégorgement",
      "Débouchage à jet haute pression",
      "Débouchage au furet électrique",
    ],
  },
  {
    index: "03",
    title: "Installations sanitaires",
    summary:
      "Pose ou remplacement des équipements sanitaires et de leurs raccordements.",
    items: [
      "Installation de WC",
      "Installation de douche",
      "Installation de robinetterie",
      "Installation de chauffe-eau",
      "Changement de radiateur",
    ],
  },
  {
    index: "04",
    title: "Chauffe-eau & ballon d’eau chaude",
    summary:
      "Diagnostic, réparation, installation ou remplacement selon l’état de l’équipement.",
    items: [
      "Réparation de chauffe-eau",
      "Remplacement de chauffe-eau",
      "Remplacement de ballon d’eau chaude",
      "Raccordements et remise en service",
    ],
  },
];

const quoteServices = [
  "Recherche ou réparation de fuite",
  "Réparation de tuyauterie",
  "Dépannage sanitaire",
  "Installation ou réparation de WC",
  "Installation ou réparation de douche",
  "Installation ou réparation de robinetterie",
  "Débouchage d’évier ou de douche",
  "Débouchage de canalisation",
  "Dégorgement",
  "Débouchage à jet haute pression",
  "Débouchage au furet électrique",
  "Installation, réparation ou remplacement de chauffe-eau / ballon d’eau chaude",
  "Changement de radiateur",
  "Réparation de plomberie extérieure",
];

const reviews = [
  {
    name: "Alexandre Karsenty",
    text:
      "Monsieur Girard est venu pour une petite fuite sous mon chauffe-eau. J’ai apprécié son efficacité, sa pédagogie, sa sympathie et son intégrité. Je le recommande à 100 %.",
    date: "Avis Google récent",
  },
  {
    name: "Matthias Moyon",
    text:
      "Prix très bon, annoncé en avance et sans problème. Artisan consciencieux, professionnel, pédagogue, compétent et très agréable.",
    date: "Avis Google récent",
  },
  {
    name: "Anthony Ayoub",
    text:
      "Il a réparé l’évier de ma cuisine et débouché les canalisations rapidement et proprement. Tarif raisonnable, personne agréable et humaine.",
    date: "Avis Google",
  },
  {
    name: "Hélène Fulachier",
    text:
      "Efficace et compétent. Il prend le temps d’expliquer les alternatives et a changé mon ballon d’eau chaude rapidement et proprement.",
    date: "Avis Google",
  },
  {
    name: "Guillaume Aubert",
    text:
      "Remplacement de chauffe-eau effectué rapidement et proprement. Plombier compétent, aimable et intervention soignée.",
    date: "Avis Google",
  },
];

const gallery = [
  {
    src: "/girard-plomberie/remplacement-ballon-eau-chaude.jpg",
    alt: "Remplacement d’un ballon d’eau chaude par Girard Plomberie",
    title: "Ballon d’eau chaude",
    note: "Remplacement et raccordements",
  },
  {
    src: "/girard-plomberie/lavabo-sur-wc.jpg",
    alt: "Lavabo installé sur un WC standard",
    title: "Sanitaire compact",
    note: "Lavabo sur WC standard",
  },
  {
    src: "/girard-plomberie/attente-machine-a-laver.jpg",
    alt: "Création d’une arrivée d’eau froide et d’une évacuation pour machine à laver",
    title: "Raccordement sur mesure",
    note: "Arrivée d’eau et évacuation pour machine à laver",
  },
];

const propertyTypes = [
  "Appartement",
  "Maison",
  "Local professionnel",
  "Copropriété",
  "Autre",
];

const preferredTimes = [
  "Matin",
  "Après-midi",
  "Fin de journée",
  "Peu importe",
];

type QuoteData = {
  services: string[];
  urgency: string;
  propertyType: string;
  details: string;
  address: string;
  postcode: string;
  preferredDate: string;
  preferredTime: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consent: boolean;
  companyWebsite: string;
};

const initialQuoteData: QuoteData = {
  services: [],
  urgency: "",
  propertyType: "",
  details: "",
  address: "",
  postcode: "",
  preferredDate: "",
  preferredTime: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  consent: false,
  companyWebsite: "",
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12.5 4.2 4.2L19 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function QuoteWorkflow() {
  const [step, setStep] = useState(0);
  const [quoteData, setQuoteData] = useState<QuoteData>(initialQuoteData);
  const [photos, setPhotos] = useState<File[]>([]);
  const [formError, setFormError] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [confirmationSent, setConfirmationSent] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stepTitles = [
    "Votre besoin",
    "Le contexte",
    "Le lieu et la date",
    "Vos coordonnées",
  ];

  const selectedPhotoSize = useMemo(
    () => photos.reduce((total, photo) => total + photo.size, 0),
    [photos],
  );

  function updateField<K extends keyof QuoteData>(
    key: K,
    value: QuoteData[K],
  ) {
    setQuoteData((current) => ({ ...current, [key]: value }));
    setFormError("");
  }

  function toggleService(service: string) {
    setQuoteData((current) => ({
      ...current,
      services: current.services.includes(service)
        ? current.services.filter((item) => item !== service)
        : [...current.services, service],
    }));
    setFormError("");
  }

  function validateCurrentStep() {
    if (step === 0) {
      if (quoteData.services.length === 0) return "Sélectionnez au moins un service.";
      if (!quoteData.urgency) return "Indiquez le délai souhaité.";
    }

    if (step === 1 && !quoteData.propertyType) {
      return "Sélectionnez le type de propriété.";
    }

    if (step === 2) {
      if (!quoteData.address.trim()) return "Indiquez l’adresse de l’intervention.";
      if (!quoteData.postcode.trim()) return "Indiquez le code postal.";
      if (!quoteData.preferredDate) return "Choisissez une date souhaitée.";
      if (!quoteData.preferredTime) return "Sélectionnez un moment de la journée.";
    }

    return "";
  }

  function goToNextStep() {
    const error = validateCurrentStep();
    if (error) {
      setFormError(error);
      return;
    }
    setStep((current) => Math.min(current + 1, stepTitles.length - 1));
    setFormError("");
  }

  function handlePhotoSelection(event: ChangeEvent<HTMLInputElement>) {
    const incomingFiles = Array.from(event.target.files ?? []);
    if (incomingFiles.length === 0) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const validFiles: File[] = [];

    for (const file of incomingFiles) {
      if (!allowedTypes.includes(file.type)) {
        setFormError("Les photographies doivent être au format JPG, PNG ou WebP.");
        continue;
      }
      if (file.size > 4 * 1024 * 1024) {
        setFormError(`${file.name} dépasse la limite de 4 Mo par image.`);
        continue;
      }
      validFiles.push(file);
    }

    setPhotos((current) => [...current, ...validFiles].slice(0, 5));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removePhoto(index: number) {
    setPhotos((current) => current.filter((_, photoIndex) => photoIndex !== index));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !quoteData.firstName.trim() ||
      !quoteData.lastName.trim() ||
      !quoteData.email.trim() ||
      !quoteData.phone.trim()
    ) {
      setFormError("Indiquez votre nom, votre adresse e-mail et votre téléphone.");
      return;
    }

    if (!quoteData.consent) {
      setFormError("Vous devez autoriser l’utilisation de ces informations pour traiter votre demande.");
      return;
    }

    setSubmissionStatus("sending");
    setFormError("");

    const formData = new FormData();
    quoteData.services.forEach((service) => formData.append("services", service));
    formData.append("urgency", quoteData.urgency);
    formData.append("propertyType", quoteData.propertyType);
    formData.append("details", quoteData.details);
    formData.append("address", quoteData.address);
    formData.append("postcode", quoteData.postcode);
    formData.append("preferredDate", quoteData.preferredDate);
    formData.append("preferredTime", quoteData.preferredTime);
    formData.append("firstName", quoteData.firstName);
    formData.append("lastName", quoteData.lastName);
    formData.append("email", quoteData.email);
    formData.append("phone", quoteData.phone);
    formData.append("companyWebsite", quoteData.companyWebsite);
    photos.forEach((photo) => formData.append("photos", photo));

    try {
      const response = await fetch("/api/quote", { method: "POST", body: formData });
      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        confirmationSent?: boolean;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "La demande n’a pas pu être envoyée. Veuillez réessayer.");
      }

      setConfirmationSent(result.confirmationSent !== false);
      setSubmissionStatus("success");
    } catch (error) {
      setSubmissionStatus("error");
      setFormError(error instanceof Error ? error.message : "Une erreur est survenue pendant l’envoi.");
    }
  }

  if (submissionStatus === "success") {
    return (
      <div className="quote-success">
        <span className="success-icon"><CheckIcon /></span>
        <p className="eyebrow">Demande reçue</p>
        <h3>Votre demande a bien été transmise.</h3>
        <p>Les informations envoyées permettront d’examiner votre besoin avant de vous recontacter.</p>
        {!confirmationSent ? (
          <p className="confirmation-warning">La demande a été transmise, mais l’e-mail de confirmation n’a pas pu être envoyé.</p>
        ) : null}
        <button
          type="button"
          className="text-button"
          onClick={() => {
            setQuoteData(initialQuoteData);
            setPhotos([]);
            setStep(0);
            setSubmissionStatus("idle");
          }}
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form className="quote-workflow" onSubmit={handleSubmit}>
      <div className="quote-progress">
        <div className="progress-track">
          <span style={{ width: `${((step + 1) / stepTitles.length) * 100}%` }} />
        </div>
        <div className="progress-copy">
          <span>Étape {step + 1} / {stepTitles.length}</span>
          <strong>{stepTitles[step]}</strong>
        </div>
      </div>

      {step === 0 ? (
        <div className="quote-step">
          <div className="step-heading">
            <p className="eyebrow">01 — Intervention</p>
            <h3>Que faut-il prendre en charge ?</h3>
            <p>Plusieurs choix sont possibles.</p>
          </div>

          <div className="service-options">
            {quoteServices.map((service) => {
              const selected = quoteData.services.includes(service);
              return (
                <button
                  key={service}
                  type="button"
                  className={`select-card ${selected ? "is-selected" : ""}`}
                  onClick={() => toggleService(service)}
                  aria-pressed={selected}
                >
                  <span>{service}</span>
                  <i>{selected ? "✓" : "+"}</i>
                </button>
              );
            })}
          </div>

          <fieldset className="inline-fieldset">
            <legend>Délai souhaité</legend>
            {[
              "Urgent",
              "Sous quelques jours",
              "Projet planifié",
            ].map((urgency) => (
              <label key={urgency} className={quoteData.urgency === urgency ? "is-selected" : ""}>
                <input
                  type="radio"
                  name="urgency"
                  value={urgency}
                  checked={quoteData.urgency === urgency}
                  onChange={() => updateField("urgency", urgency)}
                />
                <span>{urgency}</span>
              </label>
            ))}
          </fieldset>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="quote-step">
          <div className="step-heading">
            <p className="eyebrow">02 — Contexte</p>
            <h3>Précisez la situation.</h3>
            <p>Quelques détails peuvent aider à préparer l’échange.</p>
          </div>

          <fieldset className="property-grid">
            <legend>Type de propriété</legend>
            {propertyTypes.map((type) => (
              <label key={type} className={quoteData.propertyType === type ? "is-selected" : ""}>
                <input
                  type="radio"
                  name="propertyType"
                  value={type}
                  checked={quoteData.propertyType === type}
                  onChange={() => updateField("propertyType", type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </fieldset>

          <label className="field field-wide">
            <span>Description complémentaire <small>facultatif</small></span>
            <textarea
              rows={6}
              value={quoteData.details}
              onChange={(event) => updateField("details", event.target.value)}
              placeholder="Décrivez le problème, les symptômes observés ou l’équipement concerné."
            />
          </label>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="quote-step">
          <div className="step-heading">
            <p className="eyebrow">03 — Organisation</p>
            <h3>Où et quand intervenir ?</h3>
            <p>La date demandée reste à confirmer.</p>
          </div>

          <div className="field-grid">
            <label className="field field-wide">
              <span>Adresse de l’intervention</span>
              <input
                type="text"
                autoComplete="street-address"
                value={quoteData.address}
                onChange={(event) => updateField("address", event.target.value)}
                placeholder="Numéro et rue"
              />
            </label>

            <label className="field">
              <span>Code postal</span>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                value={quoteData.postcode}
                onChange={(event) => updateField("postcode", event.target.value)}
                placeholder="91300"
              />
            </label>

            <label className="field">
              <span>Date souhaitée</span>
              <input
                type="date"
                value={quoteData.preferredDate}
                onChange={(event) => updateField("preferredDate", event.target.value)}
              />
            </label>
          </div>

          <fieldset className="inline-fieldset">
            <legend>Moment souhaité</legend>
            {preferredTimes.map((time) => (
              <label key={time} className={quoteData.preferredTime === time ? "is-selected" : ""}>
                <input
                  type="radio"
                  name="preferredTime"
                  value={time}
                  checked={quoteData.preferredTime === time}
                  onChange={() => updateField("preferredTime", time)}
                />
                <span>{time}</span>
              </label>
            ))}
          </fieldset>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="quote-step">
          <div className="step-heading">
            <p className="eyebrow">04 — Contact</p>
            <h3>Comment vous recontacter ?</h3>
            <p>Les photos sont facultatives mais peuvent aider au premier diagnostic.</p>
          </div>

          <input
            className="honeypot"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            type="text"
            value={quoteData.companyWebsite}
            onChange={(event) => updateField("companyWebsite", event.target.value)}
          />

          <div className="field-grid">
            <label className="field">
              <span>Prénom</span>
              <input type="text" autoComplete="given-name" value={quoteData.firstName} onChange={(event) => updateField("firstName", event.target.value)} />
            </label>
            <label className="field">
              <span>Nom</span>
              <input type="text" autoComplete="family-name" value={quoteData.lastName} onChange={(event) => updateField("lastName", event.target.value)} />
            </label>
            <label className="field">
              <span>Adresse e-mail</span>
              <input type="email" autoComplete="email" value={quoteData.email} onChange={(event) => updateField("email", event.target.value)} />
            </label>
            <label className="field">
              <span>Téléphone</span>
              <input type="tel" autoComplete="tel" value={quoteData.phone} onChange={(event) => updateField("phone", event.target.value)} />
            </label>
          </div>

          <div className="photo-upload">
            <div>
              <strong>Photographies</strong>
              <span>Jusqu’à 5 images, 4 Mo par image</span>
            </div>
            <input
              ref={fileInputRef}
              id="quote-photos"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handlePhotoSelection}
            />
            <label htmlFor="quote-photos">Ajouter des photos</label>
          </div>

          {photos.length > 0 ? (
            <div className="photo-list">
              {photos.map((photo, index) => (
                <div key={`${photo.name}-${index}`}>
                  <span>{photo.name}</span>
                  <button type="button" onClick={() => removePhoto(index)}>Supprimer</button>
                </div>
              ))}
              <small>{(selectedPhotoSize / (1024 * 1024)).toFixed(1)} Mo au total</small>
            </div>
          ) : null}

          <label className="consent-row">
            <input
              type="checkbox"
              checked={quoteData.consent}
              onChange={(event) => updateField("consent", event.target.checked)}
            />
            <span>J’autorise l’utilisation de ces informations uniquement pour traiter ma demande.</span>
          </label>
        </div>
      ) : null}

      {formError ? <p className="form-error" role="alert">{formError}</p> : null}

      <div className="quote-actions">
        {step > 0 ? (
          <button type="button" className="button-secondary" onClick={() => { setStep((current) => current - 1); setFormError(""); }}>
            Retour
          </button>
        ) : <span />}

        {step < stepTitles.length - 1 ? (
          <button type="button" className="button-primary" onClick={goToNextStep}>
            Continuer <ArrowIcon />
          </button>
        ) : (
          <button type="submit" className="button-primary" disabled={submissionStatus === "sending"}>
            {submissionStatus === "sending" ? "Envoi en cours…" : "Envoyer la demande"}
            {submissionStatus !== "sending" ? <ArrowIcon /> : null}
          </button>
        )}
      </div>
    </form>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero" id="accueil">
          <div className="hero-grid-overlay" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow">Plomberie · Dépannage · Installation</p>
            <h1>
              Une intervention
              <span>qui va droit</span>
              au problème.
            </h1>
            <p className="hero-intro">
              Fuites, sanitaires, débouchage, chauffe-eau et raccordements :
              une prise en charge claire, du premier échange à la remise en service.
            </p>
            <div className="hero-actions">
              <a className="button-primary" href="#devis">Demander un devis <ArrowIcon /></a>
              <a className="button-ghost" href={`tel:${PHONE_LINK}`}>{PHONE_DISPLAY}</a>
            </div>
            <div className="rating-lockup">
              <strong>4,9</strong>
              <div>
                <span>★★★★★</span>
                <p>195 avis Google</p>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-number">GP / 01</div>
            <Image
              src="/girard-plomberie/attente-machine-a-laver.jpg"
              alt="Raccordement de plomberie réalisé par Girard Plomberie"
              width={1400}
              height={1043}
              priority
            />
            <div className="hero-caption">
              <span>Installation</span>
              <strong>Arrivée d’eau & évacuation</strong>
            </div>
          </div>

          <aside className="hero-contact-panel">
            <span>Contact direct</span>
            <a href={`tel:${PHONE_LINK}`}>{PHONE_DISPLAY}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </aside>
        </section>

        <section className="proof-strip" aria-label="Points de confiance">
          <div><span>01</span><strong>Prix annoncé avant intervention</strong></div>
          <div><span>02</span><strong>Explications claires</strong></div>
          <div><span>03</span><strong>Travail propre et soigné</strong></div>
          <div><span>04</span><strong>Réactivité régulièrement saluée</strong></div>
        </section>

        <section className="services-section" id="services">
          <div className="section-rail">
            <p className="eyebrow">01 — Services</p>
            <span>Installation</span>
            <span>Dépannage</span>
          </div>

          <div className="section-content">
            <div className="section-heading split-heading">
              <h2>Des services organisés par besoin.</h2>
              <p>
                Les prestations similaires sont regroupées pour permettre de repérer rapidement le type d’intervention concerné.
              </p>
            </div>

            <div className="service-ledger">
              {serviceGroups.map((group) => (
                <article key={group.index} className="service-row">
                  <span className="service-index">{group.index}</span>
                  <div className="service-title">
                    <h3>{group.title}</h3>
                    <p>{group.summary}</p>
                  </div>
                  <ul>
                    {group.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="method-section">
          <div className="method-copy">
            <p className="eyebrow">02 — Façon de travailler</p>
            <h2>Comprendre avant de remplacer.</h2>
            <p>
              Les avis clients reviennent sur la pédagogie, l’intégrité et les prix annoncés à l’avance. L’objectif est de rechercher la cause, d’expliquer les options et de réaliser une intervention propre.
            </p>
            <a className="text-link" href="#avis">Lire les avis clients <ArrowIcon /></a>
          </div>

          <div className="method-steps">
            <article><span>01</span><h3>Échange</h3><p>Le besoin, les symptômes et le contexte sont précisés.</p></article>
            <article><span>02</span><h3>Diagnostic</h3><p>La cause et les options possibles sont expliquées.</p></article>
            <article><span>03</span><h3>Intervention</h3><p>La solution retenue est mise en œuvre avec soin.</p></article>
            <article><span>04</span><h3>Vérification</h3><p>Le fonctionnement et la propreté de la zone sont contrôlés.</p></article>
          </div>
        </section>

        <section className="gallery-section" id="realisations">
          <div className="section-rail dark-rail">
            <p className="eyebrow">03 — Réalisations</p>
            <span>Travaux visibles</span>
          </div>

          <div className="gallery-content">
            <div className="section-heading gallery-heading">
              <h2>Des interventions concrètes.</h2>
              <p>Trois exemples photographiés : remplacement de ballon, adaptation sanitaire et création de raccordement.</p>
            </div>

            <div className="gallery-grid">
              {gallery.map((item, index) => (
                <figure key={item.src} className={`gallery-card gallery-card-${index + 1}`}>
                  <Image src={item.src} alt={item.alt} width={1400} height={1100} />
                  <figcaption>
                    <span>0{index + 1}</span>
                    <div><strong>{item.title}</strong><p>{item.note}</p></div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="reviews-section" id="avis">
          <div className="reviews-intro">
            <p className="eyebrow">04 — Avis clients</p>
            <h2>Une réputation bâtie sur la clarté et le soin.</h2>
            <div className="reviews-score">
              <strong>4,9</strong>
              <div><span>★★★★★</span><p>195 avis Google</p></div>
            </div>
          </div>

          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <article key={review.name} className="review-card">
                <div className="review-top"><span>0{index + 1}</span><strong>★★★★★</strong></div>
                <blockquote>“{review.text}”</blockquote>
                <footer><strong>{review.name}</strong><span>{review.date}</span></footer>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section">
          <div className="contact-block">
            <p className="eyebrow">05 — Contact</p>
            <h2>Expliquez le problème. Les prochaines étapes deviennent plus simples.</h2>
            <div className="contact-actions">
              <a href={`tel:${PHONE_LINK}`}><span>Téléphone</span><strong>{PHONE_DISPLAY}</strong></a>
              <a href={`mailto:${EMAIL}`}><span>E-mail</span><strong>{EMAIL}</strong></a>
            </div>
          </div>

          <div className="location-card">
            <span>Adresse indiquée</span>
            <strong>1–10 Avenue de France<br />91300</strong>
            <p>Le périmètre d’intervention exact et les horaires sont à confirmer avec l’entreprise.</p>
          </div>
        </section>

        <section className="quote-section" id="devis">
          <div className="quote-intro">
            <p className="eyebrow">06 — Demande de devis</p>
            <h2>Préparez votre demande en quelques étapes.</h2>
            <p>
              Sélectionnez le besoin, précisez le contexte et ajoutez des photos lorsqu’elles peuvent aider à comprendre la situation.
            </p>
            <div className="quote-contact-note">
              <span>Besoin d’appeler directement ?</span>
              <a href={`tel:${PHONE_LINK}`}>{PHONE_DISPLAY}</a>
            </div>
          </div>
          <QuoteWorkflow />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
