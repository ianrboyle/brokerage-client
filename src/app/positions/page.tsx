import { getPositions } from "../../server-utils/get-positions";
import { Position } from "../../lib/models/position.model";
import { UploadCsvComponent } from "../../components/UploadCsvComponent";
import { PositionsTable } from "../../components/PositionsTable";

const PositionsPage = async () => {
  const positionsResult = await getPositions();

  const positions = positionsResult.result as Position[];
  if (positions != null)
    return (
      <div>
        <UploadCsvComponent />
        <PositionsTable positions={positions} />
      </div>
    );
  return null;
};

export default PositionsPage;
