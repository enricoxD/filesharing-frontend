import {useEffect} from 'react';
import {UserType} from "@/utils/baseTypes";
import {api} from "@/utils/api";
import {useStickyState} from "@/hooks/useStickyState";

export const useCurrentUser = (): UserType | null => {
  const [user, setUser] = useStickyState<UserType | null>('current-user', null);

  useEffect(() => {
    api.get('user/current-user')
      .then((response) => {
        const user = response.data.data
        setUser(user)
        localStorage.setItem("current-user", JSON.stringify(user))
      })
  }, []);

  return user;
};