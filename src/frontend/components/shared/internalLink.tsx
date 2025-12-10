import { CSSProperties, ReactNode } from "react";
import { Link } from "react-router";
import { useSSRContext } from "../hooks/useSSRContext";

export const InternalLink = ({
  href,
  children,
  linkStyle,
}: {
  href: string;
  children: ReactNode;
  linkStyle?: CSSProperties;
}) => {
  const { clearSSRData } = useSSRContext();

  const handleClick = () => {
    // Clear SSR data when navigating to ensure the app
    // behaves like an SPA and fetches fresh data
    clearSSRData();
  };

  return (
    <Link to={href} onClick={handleClick} style={linkStyle}>
      {children}
    </Link>
  );
};
