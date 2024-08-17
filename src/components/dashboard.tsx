import UserScheduler from "./userScheduler";

const Dashboard = () => {
  return (
    <section>
      <div className="text-3xl text-blue-500 my-6">Your scheduler</div>
      <UserScheduler />
    </section>
  );
};

export default Dashboard;
