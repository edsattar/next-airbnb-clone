"use client";

import useRentModal from "@/app/hooks/useRentModal";

import Modal from "./Modal";


const RentModal = () => {
  const rentModal = useRentModal();


  return (
    <Modal
      // disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="Rent"
      actionLabel="Continue"
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      // body={bodyContent}
      // footer={footerContent}
    />
  );
};

export default RentModal;
