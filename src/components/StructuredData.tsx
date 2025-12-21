import { Helmet } from "react-helmet";

interface StructuredDataProps {
  type?: "Organization" | "LocalBusiness";
}

const StructuredData = ({ type = "LocalBusiness" }: StructuredDataProps) => {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": type,
    "name": "SURYA ARCHITECTS & INTERIOR DESIGNERS ",
    "description": "Architecture | Interior Designer | Construction",
    "url": "https://lovable.dev/projects/4c5db8d0-0f37-448f-8170-7e4e52b3fc65",
    "logo": "https://lovable.dev/projects/4c5db8d0-0f37-448f-8170-7e4e52b3fc65/favicon.svg",
    "image": "https://lovable.dev/opengraph-image-p98pqg.png",
    "sameAs": [
      "https://www.instagram.com/surya_architects_interiors?igsh=ZzlqYm55MTVid29r"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bangalore",
      "addressCountry": "IN"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "3"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
