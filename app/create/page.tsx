import CampaignForm from "@/components/campaign-form/campaign-form";

export default function CreateCampaignsPage() {

  

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h3 className="fw-bold text-center mb-3">Create A Campaign</h3>
        <CampaignForm />

      </div>
    </div>
  );
}