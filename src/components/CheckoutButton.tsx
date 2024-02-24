import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {
  UserFormData,
} from "@/form/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disable: boolean;
  isLoading: boolean;
};

const CheckoutButton = ({ onCheckout, disable, isLoading }: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();
  const { pathname } = useLocation();
  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();
  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };
  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className="bg-orange-500 flex-1">
        Login to checkout
      </Button>
    );
  }

  if (isAuthLoading || !currentUser || isLoading) return <LoadingButton />;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disable} className="bg-orange-500 flex-1">
          Go to check out
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          currentUser={currentUser}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          title="Confirm Delivery Details"
          btnText="Continue to payment"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
