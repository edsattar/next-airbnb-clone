import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import ReservationClient from "./ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ authorId: currentUser?.id });

  return (
    <ClientOnly>
      {currentUser ? (
        reservations.length === 0 ? (
          <EmptyState
            title="No reservations found"
            subtitle="Looks like you have no reservations on your properties."
          />
        ) : (
          <ReservationClient reservations={reservations} currentUser={currentUser} />
        )
      ) : (
        <EmptyState title="Unauthorized" subtitle="Please login" />
      )}
    </ClientOnly>
  );
};
export default ReservationsPage;