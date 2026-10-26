import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex min-h-screen items-center justify-center px-4">
    <div className="text-center">
      <h1 className="mb-3 text-4xl font-bold">Page not found</h1>
      <p className="mb-6 text-lg text-muted-foreground">This page does not exist.</p>
      <Link to="/" className="text-primary underline underline-offset-4">
        Back to the home page
      </Link>
    </div>
  </div>
);

export default NotFound;
