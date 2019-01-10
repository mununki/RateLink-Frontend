import ChartsHeader from "../../components/charts/ChartsHeader";
import Charts from "../../components/charts/Charts";

export default () => (
  <div className="padding-global-top">
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <ChartsHeader />
          <Charts />
        </div>
      </div>
    </div>
  </div>
);
