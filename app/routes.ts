import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("services", "routes/services.tsx"),
  route("portfolio", "routes/portfolio.tsx"),
  route("pricing", "routes/pricing.tsx"),
  route("signup", "routes/signup.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("contact", "routes/contact.tsx"),
] satisfies RouteConfig;
