import { Link } from "react-router";

export default function HomePage() {
  return (
    <div className="container text-center">
      <h2>Home</h2>

      <div className="d-flex flex-column align-items-center gap-2 mt-4">
        <Link className="btn btn-primary" to="/my/todolistpage">
          ไปหน้า Todo List
        </Link>
      </div>
    </div>
  );
}
