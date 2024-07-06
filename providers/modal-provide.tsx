'use client';

import { StoreModal } from "@/components/modals/store-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    },[]);


    // eger server side'ysam mounted olmaz null doner -- bu sekilde hata gider server ve client cakismasi
    if(!isMounted){
        return null;
    }

    return (
        <>
            <StoreModal />
        </>
    );
};