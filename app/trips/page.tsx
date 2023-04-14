import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ userId: currentUser?.id });

  return (
    <ClientOnly>
      {currentUser ? (
        reservations.length === 0 ? (
          <EmptyState
            title="No trips found"
            subtitle="Looks like you have no trips booked yet."
          />
        ) : (
          <TripsClient reservations={reservations} currentUser={currentUser} />
        )
      ) : (
        <EmptyState title="Unauthorized" subtitle="Please login" />
      )}
    </ClientOnly>
  );
};

export default TripsPage;
