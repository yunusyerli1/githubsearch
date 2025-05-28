// components/modal/ModalContentMapper.tsx
'use client';

import CampaignForm from '../campaign-form/campaign-form';

type ModalContentType = 'CampaignForm' | 'ConfirmationDialog' | 'OtherComponent';

interface ModalContentProps {
  contentType: ModalContentType;
  contentProps: any;
}

const modalComponents = {
  CampaignForm,
  // Add other modal content components here
};

export function ModalContentMapper({ contentType, contentProps }: ModalContentProps) {
  const Component = modalComponents[contentType as keyof typeof modalComponents];
  
  if (!Component) {
    console.error(`Modal component type "${contentType}" not found`);
    return null;
  }

  return <Component {...contentProps} />;
}