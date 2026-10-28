import { useNavigate } from "react-router-dom";
import { useOutlets } from "../context/OutletContext";
import { useOutletDialogs } from "../hooks/useOutletDialogs";
import { useDashboardOverview } from "../hooks/useDashboardOverview";
import DashboardHeading from "../components/dashboard/DashboardHeading";
import DashboardSummary from "../components/dashboard/DashboardSummary";
import VisitActivityChart from "../components/dashboard/VisitActivityChart";
import OutletBreakdown from "../components/dashboard/OutletBreakdown";
import RecentOutlets from "../components/dashboard/RecentOutlets";
import MapPreview from "../components/dashboard/MapPreview";
import RecentCheckins from "../components/dashboard/RecentCheckins";

const Dashboard = () => {
  const { outlets } = useOutlets();
  const navigate = useNavigate();
  const dialog = useOutletDialogs();
  const { counts, recent, recentVisits, chartData } =
    useDashboardOverview(outlets);

  return (
    <div className="page-content mx-auto max-w-[1740px] px-[38px] pt-[37px] pb-[48px]">
      <DashboardHeading onAdd={dialog.create} />
      <DashboardSummary
        total={outlets.length}
        counts={counts}
        recentVisits={recentVisits}
      />
      <div className="dashboard-middle mb-5 grid grid-cols-[minmax(0,1.8fr)_minmax(265px,1fr)] gap-[19px]">
        <VisitActivityChart data={chartData} />
        <OutletBreakdown total={outlets.length} counts={counts} />
      </div>
      <RecentOutlets
        outlets={recent}
        onView={dialog.view}
        onEdit={dialog.edit}
        onDelete={dialog.remove}
        onAdd={dialog.create}
      />
      <div className="dashboard-bottom grid grid-cols-[minmax(0,1.6fr)_minmax(300px,1fr)] gap-[19px]">
        <MapPreview outlets={outlets} onSelect={dialog.view} />
        <RecentCheckins
          outlets={recent}
          onSelect={dialog.view}
          onViewAll={() => navigate("/outlets")}
        />
      </div>
      {dialog.dialogs}
    </div>
  );
};

export default Dashboard;
