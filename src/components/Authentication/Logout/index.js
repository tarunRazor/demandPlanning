import { UserPool } from "@/UserPool";

const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
    }
    setCurrentUser(null);
    localStorage.removeItem("userGroups");
    setLoginStatus(false);
  }

