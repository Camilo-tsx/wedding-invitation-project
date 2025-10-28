import { InvitationPage } from "@/features/event/invitation/components/InvitationPage";
import {
  BOOLEANS_DEFAULT_INVITATION_VALUES,
  DEFAULT_INVITATION_VALUES,
} from "@/features/event/invitation/defaultInvitationValues";

const DesignPage = () => {
  return (
    <InvitationPage
      eventDate="2025-09-20T17:00:00"
      wifeName="Leticia"
      husbandName="Camilo"
      kidsAllowed={BOOLEANS_DEFAULT_INVITATION_VALUES.kidsAllowed}
      menuOptions={BOOLEANS_DEFAULT_INVITATION_VALUES.specialMenu}
      values={DEFAULT_INVITATION_VALUES}
      eventId={null}
    />
  );
};

export default DesignPage;
