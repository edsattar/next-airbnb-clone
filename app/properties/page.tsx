import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  } else {
    const listings = await getListings({ userId: currentUser.id });
    return (
      <ClientOnly>
        {listings.length > 0 ? (
          <PropertiesClient listings={listings} currentUser={currentUser} />
        ) : (
          <EmptyState
            title="No properties found"
            subtitle="Looks like you have no listed properties."
          />
        )}
      </ClientOnly>
    );
  }
};
export default PropertiesPage;
