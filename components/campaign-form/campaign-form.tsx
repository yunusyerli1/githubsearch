'use client';

import { useActionState } from "react";
import SubmitButton from "../submitButton";
import classes from './campaign-form.module.scss';
import { createCampaign, updateCampaign } from "@/lib/actions/campaign.actions";
import { ICampaign } from "@/lib/models/ICampaign";
import { useDispatch } from "react-redux";
import { closeModal } from "@/lib/store/features/modalSlice";
import { useEffect } from "react";

interface CampaignFormProps {
    campaign?: ICampaign;
}

export default function CampaignForm({ campaign }: CampaignFormProps) {
    const dispatch = useDispatch();
    let action = campaign ? updateCampaign : createCampaign;
    
    const [state, formAction] = useActionState(action, campaign ? campaign : { message: null });

    useEffect(() => {
        if (state.message) {
            dispatch(closeModal());
        }
    }, [state.message, dispatch]);

    return (

        <form action={formAction}>
            {state.message && <p className="alert alert-success">{state.message}</p>}
            <div className={`fira-sans-condensed fw-bold border-bottom mt-4 mb-3 ${classes['text-gold']}`}>TITLE</div>
            <div className="row">
                <div className="col-12">
                    <div className="form-floating">
                        <input 
                            type="text" 
                            id="title" 
                            className="form-control" 
                            name="title" 
                            defaultValue={campaign?.title || ''}
                        />
                        <label htmlFor="title">Title</label>
                    </div>
                </div>
            </div>
            <div className={`fira-sans-condensed fw-bold border-bottom mt-4 mb-3 ${classes['text-gold']}`}>DESCRIPTION</div>
            <div className="row ">
                <div className="col-12">
                    <div className="form-floating">
                        <textarea 
                            name="description" 
                            className="form-control pb-3" 
                            placeholder="Leave a comment here"
                            id="description" 
                            style={{ height: "100px" }}
                            defaultValue={campaign?.description || ''}
                        ></textarea>
                        <label htmlFor="description">Your thoughts...</label>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
                <SubmitButton />
            </div>

        </form>



    );
}
