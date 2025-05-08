'use client';
import React from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Saving..." : "Save"}
      </button>
    );
}