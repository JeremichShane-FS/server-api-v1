import ActorForm from "../forms/actor/ActorForm";
import TVShowForm from "../forms/tvshow/TVShowForm";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Dashboard</h1>
      <div className="dashboard__forms">
        <TVShowForm />
        <ActorForm />
      </div>
    </div>
  );
};
export default Dashboard;
