'use client';
import React, { useState, useEffect } from "react";
import { Dialog } from 'primereact/dialog';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@/lib/store/store';
import { closeModal } from "@/lib/store/features/modalSlice";
import { ModalContentMapper } from "./modalContentMapper";


export default function DialogModal() {
  const dispatch = useDispatch();
  const { isOpen, title, contentType, contentProps } = useSelector((state: RootState) => state.modal);

  console.log(contentType);
  console.log(contentProps);

  function handleHide() {
    dispatch(closeModal());
  }

  const headerStyle = {
    padding: '1rem' // Adjust this value as needed
};

  const dialogHeader = (
    <div style={headerStyle}>
        {title}
    </div>
);

  return (
    <div className="card flex justify-content-center">
      <Dialog 
        header={dialogHeader} 
        visible={isOpen} 
        onHide={handleHide}
        style={{ width: '50vw' }} 
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
      >
        <div className="p-3">
          {contentType && <ModalContentMapper contentType={contentType} contentProps={contentProps} />}
        </div>
      </Dialog>
    </div>
  );
}