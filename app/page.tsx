import { Table } from "@/components/table/table";
import { useTable } from "@/lib/hooks/useTable";
import { ICampaign } from "@/lib/models/ICampaign";
import { getCampaigns } from "@/lib/services/campaign.db";

// This is a Server Component that fetches data
async function getTableData() {
  const campaignsData = await getCampaigns() as ICampaign[];
  console.log("campaignsData:", campaignsData);
  return useTable(campaignsData);
}

export default async function HomePage() {
  const tableContext = await getTableData();

  return (
    <div className="mt-5">
      <div className="card p-4 shadow-lg">
        <h3 className="fw-bold text-center mb-3">Campaigns</h3>
        <div className="scroll" style={{overflow: 'auto', maxHeight: '620px'}}>

          <Table config={tableContext} />
        </div>
      </div>
    </div>
  );
}