import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListings from "@/app/actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  } else {
    const listings = await getFavoriteListings();
    return (
      <ClientOnly>
        {listings.length > 0 ? (
          <FavoritesClient listings={listings} currentUser={currentUser} />
        ) : (
          <EmptyState
            title="No favorites found"
            subtitle="Looks like you have no favorite listings."
          />
        )}
      </ClientOnly>
    );
  }
};
export default ListingPage;
