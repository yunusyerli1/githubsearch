'use server';

export async function createCampaign(previousState: any, formData: FormData): Promise<any> {
  const title = formData.get("title");
  const description = formData.get("description");

 

  console.log("previousState",title);
    console.log("title",title);
    console.log("description",description);


return { message: "Campaign created successfully!" };
}
