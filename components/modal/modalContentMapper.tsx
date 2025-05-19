// components/modal/ModalContentMapper.tsx
'use client';

import CampaignForm from '../campaign-form/campaign-form';

type ModalContentType = 'CampaignForm' | 'ConfirmationDialog' | 'OtherComponent';

const modalComponents = {
  CampaignForm,
  // Add other modal content components here
};

export function ModalContentMapper({ contentType, contentProps }: {
  contentType: string;
  contentProps: any;
}) {
  const Component = modalComponents[contentType as keyof typeof modalComponents];
  
  if (!Component) {
    console.error(`Modal component type "${contentType}" not found`);
    return null;
  }

  return <Component {...contentProps} />;
}