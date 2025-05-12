import CampaignForm from "@/components/campaign-form/campaign-form";
import { getCampaigns } from "@/lib/services/campaign.db";

export default async function CreateCampaignsPage() {

  const campaigns = await getCampaigns();

  //console.log(campaigns);

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h3 className="fw-bold text-center mb-3">Create A Campaign</h3>
        <CampaignForm />

      </div>
    </div>
  );
}