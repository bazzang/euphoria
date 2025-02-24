import { Helmet } from "react-helmet-async";

function SEO({ title, description, image }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description || "소중한 순간을 유포리아와 함께하세요."} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || "Euphoria"} />
      <meta property="og:image" content={image || "https://euphoria-psi.vercel.app/wd_thumb.png"} />
      <meta property="og:image:width" content="260" />
      <meta property="og:image:height" content="260" />
      <meta property="og:description" content={description || "소중한 순간을 함께하세요."}  />
      <meta property="og:locale" content="ko_KR" />
    </Helmet>
  );
}

export default SEO;