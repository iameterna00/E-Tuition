import { useEffect } from "react";

const AdComponent = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsbygoogle error", e);
    }
  }, []);

  return (
    <ins className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-1397824505506969"
      data-ad-slot="1004149389"
      data-ad-format="auto"
      data-full-width-responsive="true">
    </ins>
  );
};

export default AdComponent;
